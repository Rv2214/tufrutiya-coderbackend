import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import { user } from "../data/mongo/manager.mongo.js";
//import isValidPass from "./isValidPass.mid.js";
const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await user.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let newUser = await user.create(data);
          return done(null, newUser);
        } else {
          return done(null, false, {
            message: "Already exists",
            statusCode: 400,
          });
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
        const one = await user.readByEmail(email);
        if (one && verifyHash(password, one.password)) {
          /*           req.session.email = email;
          req.session.role = one.role;  */
          const token = createToken({ email, role: one.role });
          req.token = token;
          console.log(token);
          console.log(one);
          return done(null, one);
        } else {
          return done(null, false, { message: "Bad auth from passport cb" });
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
        console.log(profile);
        let gUser = await user.readByEmail(profile.id);
        if (gUser) {
          req.session.email = gUser.email;
          req.session.role = gUser.role;
          return done(null, gUser);
        } else {
          gUser = {
            email: profile.id,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          gUser = await user.create(gUser);
          req.session.email = profile.email;
          req.session.role = user.role;
          return done(null, gUser);
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
        const one = await user.readByEmail(payload.email);
        if (one) {
          one.password = null;
          return done(null, one);
        } else {
          return done(null, false, info);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
