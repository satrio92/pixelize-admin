const errorResponse = (status, message) => {
  return {
    status: status,
    message: message
  }
};

export { errorResponse }