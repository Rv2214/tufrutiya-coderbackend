import { Command } from "commander";

const args = new Command();

args.option("-p <port>", "port");
// - si es solo una letra
//-- si es mas de una
args.option("--env <env>", "environment", "prod");

args.parse();
export default args.opts();
