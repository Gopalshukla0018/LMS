import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../model/user.model.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/user/auth/google/callback`,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
      
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user); 
          }

          
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            user.googleId = profile.id;
            user.photoUrl = user.photoUrl || profile.photos[0].value;
            await user.save();
            return done(null, user);
          }

        
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0].value,
            role: "student", // Naye user ko default 'student' role dein
          });

          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Passport ko session ke liye setup karna
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};