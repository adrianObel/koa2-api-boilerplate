import common from "./env/common";
var env = process.env.NODE_ENV || "development";
var config = require("./env/" + env).default;
export default Object.assign({}, common, config);
