
import express from "express";
import mysql from "mysql";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"!Q2w#E4r",
  database:"book_app"
});

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.get("/", (req, res)=>{
  res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
  const q = "SELECT * FROM books"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `score`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.score,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `score` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.score,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been Updated successfully");
  });
});


app.listen(8800, ()=>{
  console.log("Connected to Backend!");
})

