const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = (passport) =>{
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      db.query(
        { sql: "SELECT * FROM store WHERE useremail = ?" },
        [email],
        (error, result) => {
          if (result.length == 0) {
            return done(null, false, {
              message: "That email is not registered",
            });
          } else {
            bcrypt.compare(password, result[0].userpwd, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, result[0]);
              } else {
                return done(null, false, { message: "Incorrect password" });
              }
            });
          }
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser((id, done) => {
    db.query(
      { sql: "SELECT * FROM store WHERE userid = ?" },
      [id],
      (errors, result) => {
        done(null, result[0]);
      }
    );
  });
};
