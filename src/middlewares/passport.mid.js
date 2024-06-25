import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import repository from "../repositories/users.repositories.js";
import errors from "../utils/errors/errors.js";

const { SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        if (!one) {
          let data = req.body;
          let user = await repository.create(data);
          return done(null, user);
        } else {
          return done(null, false, errors.alreadyExist);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await repository.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          const token = createToken({ _id: user._id, role: user.role, email });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, errors.badauth);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await repository.readOne(payload._id);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          const info = { message: "Usuario no encontrado" };
          return done(null, false, info);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
