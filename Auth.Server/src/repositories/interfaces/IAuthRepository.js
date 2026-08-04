class IAuthRepository {
  async findByEmail(email) {
    throw new Error('Method "findByEmail" must be implemented');
  }

  async findById(id) {
    throw new Error('Method "findById" must be implemented');
  }

  async create(userData) {
    throw new Error('Method "create" must be implemented');
  }

  async update(id, updateData) {
    throw new Error('Method "update" must be implemented');
  }

  async delete(id) {
    throw new Error('Method "delete" must be implemented');
  }

  async emailExists(email) {
    throw new Error('Method "emailExists" must be implemented');
  }
}

module.exports = { IAuthRepository };
