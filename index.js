const mysql = require('mysql');
const express=require('express');
const bodyParser=require('body-parser');

const app = express();
const PORT=3000;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'book_manager',
    charset: 'utf8_general_ci'
});
connection.connect(function (err){
    if(err){
        throw err.stack;
    }else{
        console.log(`connect database successfully`)
    }
});


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./src/views');



//Tao route hien thi list san pham
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render("index", {books: result});
    });
})


// Tao route create san pham
app.get('/books/create',(req, res)=>{
    res.render('create')
})
app.post('/books/create',(req, res)=>{
    const{name,price,status,author}=req.body;

    console.log(req.body);
    const sqlInsert='INSERT INTO books(name,price,status,author)VALUE ?'
    const value = [
        [name,price,status,author]
    ];
    connection.query(sqlInsert,[value],function (err,result) {
        if(err) throw err;
        res.end('BAN DA THEM SAN PHAM THANH CONG!');
    });
});


// Bước 2: Thêm router và logic xử lý.
//     Tạo router xử lý request:
//     URL: /books/{id}/delete
// Method: GET
// id: tham số nhận đầu vào là gía trị id sách cần xoá, giá trị này lấy ra từ params của request

app.get("/books/:id/delete", (req, res) => {
    const idBook = req.params.id;
    const sql = "DELETE FROM books WHERE id = " + idBook;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect('/books')
    });
})



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:3000/books`)
});





