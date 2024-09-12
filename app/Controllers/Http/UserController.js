// app/Controllers/Http/UserController.js
const User = require('../../Models/user.model')

class UserController {
  // Fetch all users
  async index({ response }) {
    try {
      const users = await User.find().exec()
      return response.json(users)
    } catch (error) {
      return response.status(500).json({ message: 'Error fetching users', error })
    }
  }

  // Create a new user
  async store({ request, response }) {
    const { email, username, password, firstName, lastName } = request.only(['email', 'username', 'password', 'firstName', 'lastName'])

    try {
      const newUser = new User({
        email,
        username,
        password,
        firstName,
        lastName,
      })

      await newUser.save()
      return response.status(201).json(newUser)
    } catch (error) {
      return response.status(400).json({ message: 'Error creating user', error })
    }
  }

  // Fetch a single user by ID
  async show({ params, response }) {
    try {
      const user = await User.findById(params.id).exec()
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }
      return response.json(user)
    } catch (error) {
      return response.status(500).json({ message: 'Error fetching user', error })
    }
  }

  // Update a user by ID
  async update({ params, request, response }) {
    const { email, username, password, firstName, lastName } = request.only(['email', 'username', 'password', 'firstName', 'lastName'])

    try {
      const updatedUser = await User.findByIdAndUpdate(
        params.id,
        { email, username, password, firstName, lastName },
        { new: true }
      ).exec()

      if (!updatedUser) {
        return response.status(404).json({ message: 'User not found' })
      }
      return response.json(updatedUser)
    } catch (error) {
      return response.status(400).json({ message: 'Error updating user', error })
    }
  }

  // Delete a user by ID
  async destroy({ params, response }) {
    try {
      const deletedUser = await User.findByIdAndDelete(params.id).exec()
      if (!deletedUser) {
        return response.status(404).json({ message: 'User not found' })
      }
      return response.json({ message: 'User deleted successfully' })
    } catch (error) {
      return response.status(500).json({ message: 'Error deleting user', error })
    }
  }
}

module.exports = UserController
