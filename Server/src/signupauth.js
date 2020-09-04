const Promise = require("bluebird");
const mysql = require("mysql");
const { resolve, reject } = require("bluebird");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);


const DB_CONFIG = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "project",

};
let authenticateUser = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();


    let sql = "SELECT email,password  FROM register WHERE email=? AND password=?";
    const results = await connection.queryAsync(sql, [
        input.email,
        input.password

    ]);


    await connection.endAsync();
    return results;
    // if (results.length === 1) {
    //     throw new Error("Invalid Credentials");
    // }
};

module.exports = { authenticateUser };