import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10));

const verifyHash = (req, db) => compareSync(req, db);

export { createHash, verifyHash };


/* const verifyHash = (req, db) => {
    const verify = compareSync(req, db)
    return verify
} */