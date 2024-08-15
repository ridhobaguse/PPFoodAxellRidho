const bcrypt = require("bcryptjs");

function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

function comparePassword(plainPassword, hashedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

module.exports = { hashPassword, comparePassword };
