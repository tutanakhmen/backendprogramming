// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
    /**
     * Membuat method static all.
     */
    static all() {
        // return Promise sebagai solusi Asynchronous
        return new Promise((resolve, reject) => {
            const sql = "SELECT * from students";
            /**
             * Melakukan query menggunakan method query.
             * Menerima 2 params: query dan callback
             */
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
    }

    static async create(data) {
        // Melakukan insert data ke database
        const id = await new Promise((resolve, reject) => {
            const sql = "INSERT INTO students SET ?";
            db.query(sql, data, (err, results) => {});
        });

        // Melakukan query berdasarkan id 
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM students WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM students WHERE id = ?";
            db.query(sql, id, (err, results) => {
                // destructing array
                const [student] = results;
                resolve(student);
            });
        });
    }

    // Mengupdate data student
    static async update(id, data) {
        await new Promise((resolve, reject) => {
            const sql = "UPDATE students SET ? WHERE id = ?";
            db.query(sql, [data, id], (err, results) => {
                resolve(results);
            });
        });

        // mencari data yang baru di update
        const student = await this.find(id);
        return student;
    }

    // menghapus data students dari databases
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM students WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }












}

// export class Student
module.exports = Student;