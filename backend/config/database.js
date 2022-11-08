import mysql from "mysql2";

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'rspurt56',
    database: 'dummy'
});

export default db;