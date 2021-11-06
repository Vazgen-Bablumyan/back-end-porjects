import express from "express";
import mysql from "mysql";


// const APP_PORT = process.env.APP_PORT ?? 3011;

let {HOST, USER, PASSWORD, DATABASE, APP_PORT} = process.env;

const db = mysql.createConnection({
    host:HOST,
    user:USER,
    password:PASSWORD,
    database : DATABASE

});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("mysql connected..")
})

const app = express();
app.use(express.json());

// Create
app.post("/adduser", (req, res) => {
    let  {name, gender, dob} = req.body;  
    let sql = `INSERT INTO users (name,gender,dob) VALUES ('${name}','${gender}',${dob})`;
    
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(req.body);
    })
})

//Read
app.get("/getallusers", (req, res) => {
    let sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Update
app.put("/updateuser/:id", (req, res) => {
    let  {name, gender, dob} = req.body; 
    let {id} = req.params;
    let sql = `UPDATE users SET name='${name}',gender='${gender}',dob='${dob}' WHERE id=${id}`;
   
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send(req.body);
    })
})

//Delete
app.delete("/user/:id", (req, res) => {
    let {id} = req.params;
    let sql = `DELETE FROM users WHERE id=${id}`;

    db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(req.body);
    })
})

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`)
})