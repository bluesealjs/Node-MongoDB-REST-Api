const Reflection = require("./schema");

module.exports = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(operation, params) {
    return new Promise((resolve, reject) => {
      switch (operation) {
        case "create":
          Reflection.create(params, (error, doc) => {
            if (error) {
              reject(error);
            }
            resolve(doc);
          });
          break;

        case "findAll":
          Reflection.find((error, docs) => {
            if (error) {
              reject(error);
            }
            resolve(docs);
          });
          break;
        case "findById":
          Reflection.findOne(params, (error, doc) => {
            if (error) {
              reject(error);
            }
            resolve(doc);
          });
          break;
        case "update":
          Reflection.updateOne({ _id: params._id }, params, (error, doc) => {
            if (error) {
              console.log(error);
              reject(error);
            }
            resolve(doc);
          });
          break;
        case "delete":
          Reflection.deleteOne(params, (error, doc) => {
            if (error) {
              reject(error);
            }
            resolve(doc);
          });
          break;
        default:
          break;
      }
    });
  }
};
