const bcrypt = require("bcryptjs");
const AdminBro = require("admin-bro");

const after = async (response) => {
  if (response.record && response.record.errors) {
    response.record.errors.password = response.record.errors.encryptedPassword;
  }

  return response;
};

const before = async (request) => {
  if (request.method === "post" || request.method === "get") {
    const { password, ...rest } = request.payload;

    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      return {
        ...request,
        payload: {
          ...rest,
          encryptedPassword,
        },
      };
    }

    console.log(request.payload);
    return request;
  }
};

module.exports = { before, after };
