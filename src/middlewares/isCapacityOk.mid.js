import products from "../data/fs/products.fs.js"

export default (req, res, next) =>{
    try {
        const { pid, quantity } = req.params;
        const product = products.readOne(pid);
        if(product.stock >= quantity){
            return next() 
        } else{
            const error = new Error("there arem't capacity")
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
}