const errors = {
  error: { statusCode: 400, message: "Server error" },
  message: (message) => ({ statusCode: 400, message }),
  passCallBack: (message, statusCode) => ({ statusCode, message }),
  badauth: { statusCode: 401, message: "Bad auth!" },
  alreadyExist: { statusCode: 401, message: "Already exists" },
  forbidden: { statusCode: 403, message: "Forbidden" },
  notFound: { statusCode: 404, message: "Not found docs!" },
  fatal: { statusCode: 500, message: "Server error" },
};

export default errors;
