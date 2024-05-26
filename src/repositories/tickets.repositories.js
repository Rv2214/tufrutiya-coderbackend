import TicketDTO from "../dto/ticket.dto.js";
import dao from "../data/index.factory.js";

const { tickets } = dao;

class TicketsRep {
  constructor() {
    this.model = tickets;
  }
  create = async (data) => {
    data = new TicketDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new TicketsRep();
export default repository;
