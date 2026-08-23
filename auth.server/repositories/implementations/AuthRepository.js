const mongoose = require('mongoose');
const { User } = require('../../models/User');

class AuthRepository {
  async findByEmail(email) {
    return await User.findOne({ email }).exec();
  }

  async emailExists(email) {
    const count = await User.countDocuments({ email }).exec();
    return count > 0;
  }

  async findById(id) {
    return await User.findById(id).exec();
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
}

module.exports = { AuthRepository };
