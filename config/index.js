const mongoose = require("mongoose");
const config = require("./database");

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(config.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then((err, res) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
      });
    } else {
      mongoose
        .connect(config.database, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) {
            reject(err);
          }

          resolve(res);
        });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };
