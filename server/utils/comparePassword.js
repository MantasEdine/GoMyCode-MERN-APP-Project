const bcrypt = require("bcrypt");

const comparePassword = async (Ipassword, password) => {
  const validate = await bcrypt.compare(Ipassword, password);
  return validate; // Return the result of the comparison
};

module.exports = { comparePassword };
