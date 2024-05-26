import repository from "../repositories/tickets.repositories.js";
import TicketDTO from "../dto/ticket.dto.js";

class TicketsService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new TicketDTO(data);
    const response = await this.repository.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  readOne = async (id) => await this.repository.readOne(id);
  update = async (id, data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new TicketsService();
export default service;
