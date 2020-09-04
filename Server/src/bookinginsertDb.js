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
let addbooking = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql =
        "INSERT INTO Booking (location,destination,departDate,returndate,adults,children,travelclass) VALUES ( ?, ?, ?,?,?,?,?)";
    await connection.queryAsync(sql, [


        input.fromCity,
        input.Tocity,
        input.departdate,
        input.returndate,
        input.adt,
        input.child,
        input.TravelClass
    ]);

    await connection.endAsync();
};


module.exports = { addbooking };
