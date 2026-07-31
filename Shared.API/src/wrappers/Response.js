class Response {
  static success(data, messages) {
    return {
      success: true,
      data,
      messages: messages || ['Operation completed successfully.'],
      statusCode: 200,
    };
  }

  static fail(message, errors, statusCode = 400) {
    return {
      success: false,
      data: undefined,
      messages: [message],
      errors: errors || [],
      statusCode,
    };
  }
}

module.exports = { Response };