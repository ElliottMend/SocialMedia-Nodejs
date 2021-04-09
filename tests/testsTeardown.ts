import { pool } from "../connection";
const teardownTests = () => {
  pool.end();
};

module.exports = teardownTests;
