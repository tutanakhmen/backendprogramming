// import database
const db = require("../config/database");

// membuat class student
class Student {
  //   // solusiton with callback
  //   static all(callback) {
  //     const query = "SELECT * FROM students";
  //     /**
  //      * Melakukan query menggunakan method query
  //      * Menerima 2 params: query dan callback
  //      */
  //     db.query(query, (err, results) => {
  //       callback(results);
  //     });
  //   }

  // solusiton with promise + async await
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students";
      /**
       * Melakukan query menggunakan method query
       * Menerima 2 params: query dan callback
       */
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
  static create(data) {
    return new Promise((resolve, reject) => {
      const query = { sql: `INSERT INTO students SET ?`, values: data };

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // models update
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const query = { sql: `UPDATE students SET ? WHERE id = ?`, values: [data, id] };

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // models delete
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = { sql: `DELETE FROM students WHERE id = ?`, values: id };

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // models find
  static find(id) {
    return new Promise((resolve, reject) => {
      const query = { sql: `SELECT * FROM students WHERE id = ?`, values: id };
      /**
       * Melakukan query menggunakan method query
       * Menerima 2 params: query dan callback
       */
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Student
module.exports = Student;
