const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database: ""
})

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, data) => {
    if (err) return res.json(err)
    else return res.json(data)
  })
})

app.get("/api", (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"] })
})

// port listening on 5000
app.listen(5000, () => {console.log("Server started on port 5000") })