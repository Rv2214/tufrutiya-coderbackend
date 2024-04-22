import { faker } from "@faker-js/faker";
import repository from "../../repositories/users.repositories.js";
import winston from "../../utils/logger/winston.utils.js";



export default function usersMock() {
  return {
    name: faker.person.firstName(),
    email:
      faker.person.firstName() +
      faker.person.lastName() +
      faker.number.hex(64) +
      "@coder.com",
    password: "hola1234",
  };
}


async function createMocks() {
    const data = usersMock();
    await repository.create(data);
    winston.INFO("USER CREATED!");
}
createMocks();
