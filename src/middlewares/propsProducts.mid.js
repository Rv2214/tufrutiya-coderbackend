import propsProductsUtils from "../utils/propsProducts.utils.js"

function propsProducts(req, res, next) {
/*   const { title, price, stock } = req.body;
  if (!title || !price || !stock) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} title, price & stock required`,
    });
  } else {
    return next();
  } */
  try {
    propsProductsUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsProducts;
