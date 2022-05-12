// __HTTP STATUS__

// Success
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NO_CONTENT = 204;

// Client Error
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_CONFLIT = 409;
const HTTP_UNPROCESSABLE_ENTRY = 422;

// __ERROR MESSAGES__

const MSG_PRODUCT_NOTFOUND = { message: 'Product not found' };
const MSG_NAME_REQ = { message: '"name" is required' };
const MSG_NAME_LGTH = { message: '"name" length must be at least 5 characters long' };
const MSG_QNT_REQ = { message: '"quantity" is required' };
const MSG_QNT_MUSTBE_INT = { message: '"quantity" must be greater than or equal to 1' };
const MSG_PRODUCT_EXISTS = { message: 'Product already exists' };
const MSG_SALE_NOTFOUND = { message: 'Sale not found' };

module.exports = {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_ACCEPTED,
  HTTP_NOT_FOUND,
  HTTP_NO_CONTENT,
  HTTP_BAD_REQUEST,
  HTTP_CONFLIT,
  HTTP_UNPROCESSABLE_ENTRY,
  MSG_PRODUCT_NOTFOUND,
  MSG_NAME_REQ,
  MSG_NAME_LGTH,
  MSG_QNT_REQ,
  MSG_QNT_MUSTBE_INT,
  MSG_PRODUCT_EXISTS,
  MSG_SALE_NOTFOUND,
};
