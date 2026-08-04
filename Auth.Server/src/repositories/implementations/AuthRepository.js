const { User } = require('../../models/User');

class AuthRepository {
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  async emailExists(email) {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}

module.exports = { AuthRepository };
