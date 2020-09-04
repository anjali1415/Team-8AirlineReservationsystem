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

let addUser = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql =
        "INSERT INTO register (Name,email,password,cpassword,PhoneNo) VALUES (?, ?, ?, ?,?)";
    await connection.queryAsync(sql, [

        input.Name,
        input.Email,
        input.password,
        input.cpassword,
        input.phoneno,
    ]);

    await connection.endAsync();
};


module.exports = { addUser };