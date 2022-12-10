const statusCode = {
  BAD_REQUEST: 400,
  REQUEST_OK: 200,
  REQUEST_CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
};

const findStatus = (type) => statusCode[type];

module.exports = {
  statusCode,
  findStatus,
};
