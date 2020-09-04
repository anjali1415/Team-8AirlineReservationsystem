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
let changepassword = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql = "UPDATE register SET password=? ,cpassword=? WHERE email=?"

    let res = await connection.queryAsync(sql, [

        input.password,
        input.cpassword,
        input.email,
    ]);
    console.log(res);
    await connection.endAsync();
};


module.exports = { changepassword };
