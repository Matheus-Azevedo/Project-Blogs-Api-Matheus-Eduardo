const statusCode = {
  BAD_REQUEST: 400,
  REQUEST_OK: 200,
};

const findStatus = (type) => statusCode[type] || 500;

module.exports = {
  statusCode,
  findStatus,
};
