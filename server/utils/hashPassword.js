const bcrypt = require("bcrypt");

const hashPassword = async (Ipassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(Ipassword, salt);
  return hashedPass; // Add this line to return the hashed password
};

module.exports = { hashPassword };
