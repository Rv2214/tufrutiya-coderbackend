import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { createHash } from "../utils/hash.utils.js";
import { verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import repository from "../repositories/users.repositories.js";
import errors from "../utils/errors/errors.js";

import UserDTO from "../dto/user.dto.js";

const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        console.log(one);
        if (!one) {
          let data = req.body;
          /* data.password = createHash(password);  */
          data = new UserDTO(data);
          let user = await repository.create(data);
          return done(null, user);
        } else {
          return done(null, false, errors.alreadyExist)
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
        console.log(user);
        const verify = verifyHash(password, user.password);
        console.log(user.password);
        console.log(password); 
        console.log(verify);
        if (user?.verified && verify ) {
          const token = createToken({ _id: user._id, role: user.role, email });
          req.token = token;
          console.log("token ", token);
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
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
/* passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await users.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
); */
//para extraer el tokken del objeto de requerimiento
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
        console.log(user);
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
