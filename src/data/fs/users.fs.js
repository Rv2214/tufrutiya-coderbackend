import fs from "fs";
import crypto from "crypto";

class userManager {
  static #users = [];

  constructor(path) {
    this.path = path;
    //this.users = [];
    this.init();
  }

  init() {
    try {
      const file = fs.existsSync(this.path);
      if (!file) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      } else {
        const fileContent = fs.readFileSync(this.path, "utf-8");
        if (fileContent.trim() === "") {
          userManager.#users = [];
        } else {
          userManager.#users = JSON.parse(fileContent);
        }
      }
    } catch (error) {
      console.error("Error initializing usersManager:", error.message);
    }
  }

  async createUser(data) {
    try {
      if (!data.name || !data.email) {
        throw new Error("name & email required");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          email: data.email,
          photo: "sin imagen",
        };
        userManager.#users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(userManager.#users, null, 2)
        );
        console.log("create " + user.id);
        return true;
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (userManager.#users.length === 0) {
        throw new Error("No se encontraron usuarios");
      } else {
        return userManager.#users;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const userId = userManager.#users.find((each) => each.id === id);
      if (!userId) {
        throw new Error("no se encontro el usuario");
      } else {
        return userId;
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const index = userManager.#users.findIndex((user) => user.id === id);

      if (index === -1) {
        throw new Error("No se encontró el usuario con el ID proporcionado");
      }

      userManager.#users.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(userManager.#users, null, 2)
      );
      return {
        message: `Usuario borrado correctamente`,
        updatedUsers: userManager.#users,
      };
    } catch (error) {
      return error.message;
    }
  }

  async update(id, newData) {
    try {
      const index = userManager.#users.findIndex((user) => user.id === id);
      if (index === -1) {
        throw new Error("No se encontro el producto con el ID proporcionado");
      }

      const updatedUser = { ...userManager.#users[index], ...newData };
      userManager.#users[index] = updatedUser;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(userManager.#users, null, 2)
      );
      return updatedUser;
    } catch (error) {
      error.message;
    }
  }
}

const user = new userManager("./src/data/fs/files/users.json");

export default user;
