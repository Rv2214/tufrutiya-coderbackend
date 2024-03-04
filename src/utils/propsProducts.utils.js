function propsProductsUtils(data) {
  const { title, price, stock } = data;
  if (!title || !price || !stock) {
    const error = new Error ("title, price & stock required");
    error.statusCode = 404;
    throw error; 
  }
}


export default propsProductsUtils;
