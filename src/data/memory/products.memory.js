import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductManager {
  #products = [];

  constructor() {}

  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.#products.push(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      if (this.#products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.#products.find((each) => each.id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(eid, data) {
    try {
      const one = this.readOne(eid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.#products = this.#products.filter((each) => each.id !== id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

// Datos de prueba para crear un nuevo producto
/* const testData = {
  title: "Manzana",
  photo: "url_de_la_foto",
  price: 1.99,
  stock: 100,
};


const productManager = new ProductManager();


productManager.create(testData)
  .then((newProduct) => {
    console.log("Producto creado exitosamente:", newProduct);
  })
  .catch((error) => {
    console.error("Error al crear el producto:", error);
  });*/

const products = new ProductManager(); 

export default products;
