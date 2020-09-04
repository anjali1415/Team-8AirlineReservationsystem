const Promise = require("bluebird");
const mysql = require("mysql");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_CONFIG = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "project",

};

let readAllUser = async () => {
    const connection = mysql.createConnection(DB_CONFIG);

    await connection.connectAsync();

    let sql = "SELECT * FROM booking";
    const results = await connection.queryAsync(sql);

    await connection.endAsync();

    return results;
};

module.exports = { readAllUser };