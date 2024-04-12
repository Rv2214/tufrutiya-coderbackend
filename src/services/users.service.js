import repository from "../repositories/users.repositories.js";
import UserDTO from "../dto/user.dto.js";
import sendEmail from "../utils/sendEmail.utils.js";

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new UserDTO(data);
    const response = await this.repository.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  readOne = async (id) => await this.repository.readOne(id);
  readByEmail = async (email) => await this.repository.readByEmail(email);
  update = async (id, data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
  register = async (data) =>{
    try {
      await sendEmail(data)
    } catch (error) {
      throw error
    }
  }
}

const service = new UsersService();
export default service;
