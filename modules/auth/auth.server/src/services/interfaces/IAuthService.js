class IAuthService {
  async login(request) {
    throw new Error('Method "login" must be implemented');
  }

  async register(request) {
    throw new Error('Method "register" must be implemented');
  }

  async getUserProfile(userId) {
    throw new Error('Method "getUserProfile" must be implemented');
  }

  async changePassword(userId, currentPassword, newPassword) {
    throw new Error('Method "changePassword" must be implemented');
  }

  async forgotPassword(email) {
    throw new Error('Method "forgotPassword" must be implemented');
  }

  async resetPassword(token, newPassword) {
    throw new Error('Method "resetPassword" must be implemented');
  }
}

module.exports = { IAuthService };
