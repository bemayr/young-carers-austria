const environment = process.env.NODE_ENV;
const isProduction = environment === "production";
const baseUrl = environment === isProduction ? 'https://www.young-carers-austria.at' : 'http://localhost:8080';

module.exports = {
  environment,
  isProduction,
  baseUrl
};
