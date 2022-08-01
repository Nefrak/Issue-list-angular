let express = require("express")
let cors = require('cors')
let db = require("./sqlitedb.js")

let app = express()
app.use(cors());

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8000 
app.listen(HTTP_PORT, () => {
   console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/issue", (req, res, next) => {
   let sql = "select * from issue"
   let params = []
   db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows)
     });
});

app.get("/api/issue/:id", (req, res, next) => {
   let sql = "select * from issue where id = ?"
   let params = [req.params.id]
   db.get(sql, params, (err, row) => {
      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json(row)
   });
});

app.post("/api/login/", (req, res, next) => {
   let data = {
      username : req.body.username,
      password: req.body.password,
   }
   let sql = "select * from user where username = ? and password = ?"
   let params = [data.username, data.password]
   db.get(sql, params, (err, row) => {
      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json(row)
   });
});

app.post("/api/issue/", (req, res, next) => {
   let errors=[]
   if (!req.body.title){
      errors.push("No title specified");
   }
   let data = {
      title : req.body.title,
      state: req.body.state,
      comments: req.body.comments,
      issueNumber : req.body.issueNumber,
      stateDate: req.body.stateDate,
   }
   let sql = 'INSERT INTO issue (title, state, comments, issueNumber, stateDate) VALUES (?,?,?,?,?)'
   let params =[data.title, data.state, data.comments, data.issueNumber, data.stateDate]
   db.run(sql, params, (err, result) => {
      if (err){
         res.status(400).json({"error": err.message})
         return;
      }
      data.id = this.lastID;
      res.json(data);
   });
})

app.use(function(req, res){
   res.status(404);
});