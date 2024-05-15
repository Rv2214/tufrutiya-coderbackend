import repository from "../repositories/users.repositories.js";
import UserDTO from "../dto/user.dto.js";
import { sendEmail } from "../utils/sendEmail.utils.js";
import { createHash } from "../utils/hash.utils.js" 

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new UserDTO(data);
    const response = await repository.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await repository.read({ filter, options });
  readOne = async (id) => await repository.readOne(id);
  readByEmail = async (email) => await repository.readByEmail(email);
  update = async (id, data) => await repository.update(id, data);
  destroy = async (id) => await repository.destroy(id);
  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
  async updateRole(uid, newRole) {
    try {
      const user = await this.repository.readOne(uid);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.role = newRole;
      const updatedUser = await this.repository.update(uid, {
        role: newRole,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
async updatePassword(user, newPassword) {
  try {
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
/*     user.verified = true, 
    user.password = newPassword; */
    const hashedPassword = createHash(newPassword)
    // Actualiza los datos del usuario, incluyendo la contraseña hasheada
    const updatePassword = await repository.update(user._id, { 
      verified: true, 
      password: hashedPassword 
    });

    console.log("updatePassword", updatePassword);
    return updatePassword;
  } catch (error) {
    throw error;
  }
}
}

const service = new UsersService();
export default service;
