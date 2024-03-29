// import database
const db = require("../config/database");
// membuat class Patient
class Patient {
  // buat fungsi
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients";
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
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {});
    });

    // Melakukan query berdasarkan id 
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mengupdate data student
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
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
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Method search
  static search(name) {
    //return promise
    return new Promise((resolve, reject) => {
      //membuat query
      const sql = "SELECT * FROM patients WHERE name LIKE ?";

      // Menjalankan query 
      db.query(sql, `%${name}%`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  // Method findByStatus
  static findByStatus(status) {
    // return promise
    return new Promise((resolve, reject) => {
      // Membuat query
      const sql = "SELECT * FROM patients WHERE status = ?";

      // Menjalankan query
      db.query(sql, status, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

}

// export class Patient
module.exports = Patient;