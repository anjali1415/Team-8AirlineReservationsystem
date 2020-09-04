const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // unblocking cors policy
app.use(express.json()); // this will help to read the data coming in body :: TEXT to JSON

const dbadduser = require("./insertDb");
const signupauthe = require("./signupauth");
const Bookingdb = require("./bookinginsertDb");
const changepas = require("./changepass");
const { json } = require("express");
const readbkdet = require("./readbooking");

app.post("/", (req, res) => {
    res.json({ message: "success postnew" });

})
app.post("/adduser", async (req, res) => {
    try {
        const input = req.body; // before doing this // app.use(express.json());

        await dbadduser.addUser(input);
        res.json({ message: "success post" });
    } catch (err) {
        res.json({ message: "failure post" });
    }
});
//login authentication
app.post("/auth-user", async (req, res) => {
    try {
        const input = req.body;

        const result1 = await signupauthe.authenticateUser(input);
        res.json(result1);
        //res.json({ opr: true });
    } catch (err) {
        //res.json({ opr: false });
        res.json({ message: "error" });
    }
});
// Booking Insert into database 
app.post("/bookdetails", async (req, res) => {
    try {
        const input = req.body;

        //await Bookingdb(input);
        await Bookingdb.addbooking(input);
        res.json({ opr: true });



    } catch (err) {
        res.json({ opr: false });
    }
});

// change pass

app.post("/changepass", async (req, res) => {
    try {
        const input = req.body;
        await changepas.changepassword(input);
        res.json({ opr: true });
    } catch (err) {
        res.json({ opr: false });
    }
});
// read booking details

app.get("/readticket", async (req, res) => {
    try {
        const results = await readbkdet.readAllUser();

        res.json(results);
    } catch (err) {
        const json = { message: "Failure" };
        res.json(json);
    }
});


// app.get("/getBokkingDetails", (req, res) => {
//     let id = req.id;
//     let data =
//         res.json(data);
// })

// started teh server.

app.listen(3600);