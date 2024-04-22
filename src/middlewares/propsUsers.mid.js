function propsUsers(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} name & email required`,
    });
  } else {
    return next();
  }
}

export default propsUsers;
