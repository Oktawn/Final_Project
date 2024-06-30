const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const query = require("../db/queries/users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await query.getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await query.checkUser({ email, password });
      if (user.status) {
        return done(null, user);
      } else {
        return done(null, false, { message: user.message });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await query.getUserByGoogleId(profile.id);
        if (!user) {
          const email = profile.emails[0].value;
          const avatarUrl =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null;
          user = await query.addUserGoogle(
            profile.id,
            profile.displayName,
            email,
            avatarUrl
          );
        } else {
          const avatarUrl =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null;
          if (avatarUrl && user.avatar_url !== avatarUrl) {
            user = await query.updateUserAvatar(user.user_id, avatarUrl);
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
