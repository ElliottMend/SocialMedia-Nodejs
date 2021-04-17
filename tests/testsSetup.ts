import { pool } from "../connection";
import path from "path";
import { exec } from "child_process";
import { secrets } from "../app";
module.exports = async () => {
  const sqlPath = path.join(process.cwd() + "/postgres/a");
  exec(
    `pg_restore --host 'localhost' --port '5400' --username ${secrets.USER}\
    --no-password --dbname ${secrets.TEST_DATABASE} --verbose --schema\
    'public' ${sqlPath}`
  );
};
