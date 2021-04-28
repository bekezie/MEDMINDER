const crypto = require("crypto");

// this function will provide the helper functions to encrypt and decrypt our passwords.
const passwordUtils = function () {
  const pwUtils = {};

  //this function will generate an encrypted password for the user. it will generate a salt value to help randomize the hash value. We will be storing the hash value and the salt value in the database for login verification when they want to login.
  pwUtils.generatePassword = function (password) {
    let salt = crypto.randomBytes(32).toString("hex");
    let generatedHashValue = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    return { salt: salt, hash: generatedHashValue };
  };

  //this function will validate a password entered in through the login form. The inputs are a hash and salt value we have associated with the email they used in the login form. We will use the salt from the user database object to see if the login form password generates the same hash that's stored in the database.
  pwUtils.validatePassword = function (password, databaseHash, salt) {
    let loginFormHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    // we return the boolean that represents whether the login form password hash matches the password hasah in the database
    return loginFormHash == databaseHash;
  };
  return pwUtils;
};

module.exports = passwordUtils();
