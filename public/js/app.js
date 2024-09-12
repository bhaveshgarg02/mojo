document.addEventListener('DOMContentLoaded', () => {
    const tokenForm = document.getElementById('tokenForm');
    const userInfoDiv = document.getElementById('userInfo');
    const gameList = document.getElementById('gameList');

    // Handle token submission
    tokenForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = document.getElementById('token').value;

        console.log("Sending token:", token); // Debugging token value

        try {
            // Fetch user info using the token
            const userInfoResponse = await fetch('http://127.0.0.1:3333/userinfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Token: token }) // Send token in JSON format
            });

            if (!userInfoResponse.ok) {
                console.error('Network response was not ok', userInfoResponse);
                throw new Error('Network response was not ok');
            }

            const userInfo = await userInfoResponse.json();

            // Check if the response has the required fields
            if (!userInfo.UserId || !userInfo.Currency || !userInfo.Balance || !userInfo.Username) {
                throw new Error('Invalid user info format');
            }

            // Display user information
            userInfoDiv.innerHTML = `
                <p>UserId: ${userInfo.UserId}</p>
                <p>Currency: ${userInfo.Currency}</p>
                <p>Balance: ${userInfo.Balance}</p>
                <p>Username: ${userInfo.Username}</p>
            `;

            // Fetch the list of games
            const gamesResponse = await fetch('http://127.0.0.1:3333/games', {
                method: 'GET',
            });

            if (!gamesResponse.ok) {
                console.error('Network response was not ok', gamesResponse);
                throw new Error('Network response was not ok');
            }

            const games = await gamesResponse.json();

            // Display the list of games
            gameList.innerHTML = '';
            games.forEach(game => {
                const li = document.createElement('li');
                li.textContent = `${game.name} (ID: ${game.gameId}, Product Family: ${game.productFamily})`;
                li.addEventListener('click', () => authenticateGame(token, game.gameId, game.productFamily));
                gameList.appendChild(li);
            });

        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching data, check console for more info.');
        }
    });

    // Authenticate game
    async function authenticateGame(token, gameId, productFamily) {
        try {
            const authResponse = await fetch('http://127.0.0.1:3333/authenticateGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Token: token, GameId: gameId, ProductFamily: productFamily })
            });

            if (!authResponse.ok) {
                console.error('Network response was not ok', authResponse);
                throw new Error('Network response was not ok');
            }

            const result = await authResponse.json();
            alert(`Game authenticated: ${result.message}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error authenticating game.');
        }
    }
});
