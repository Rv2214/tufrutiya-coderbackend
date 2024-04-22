import repository from "../repositories/users.repositories.js";
import UserDTO from "../dto/user.dto.js";
import sendEmail from "../utils/sendEmail.utils.js";

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
