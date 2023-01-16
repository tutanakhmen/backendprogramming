// TODO 3: Import data students dari folder data/students.js
const Student = require("../models/Student");

// Membuat Class StudentController
class StudentController {
  // TODO 4: Tampilkan data students
  // index(req, res) {
  //   // memanggil method static all
  //   Student.all(function (students) {
  //     const data = {
  //       message: "Menampilkkan semua students",
  //       data: students,
  //     };

  //     res.json(data);
  //   });
  // }

  // menambahkan keyword async untuk memberitahu proses asyncronus
  async index(req, res) {
    // memanggil method static all dengan async await
    const students = await Student.all();

    const data = {
      message: "Menampilkkan semua students",
      data: students,
    };

    res.json(data);
  }

  // TODO 5: Tambahkan data students
  async store(req, res) {
    const { nama, nim, email, jurusan } = req.body;
    await Student.create({ nama, nim, email, jurusan });

    const data = {
      message: `Menambahkan data student: ${nama}`,
      data: [nama, nim, email, jurusan],
    };

    res.json(data);
  }

  // TODO 6: Update data students
  async update(req, res) {
    const { id } = req.params;
    const { nama, nim, email, jurusan } = req.body;
    await Student.update(id, { nama, nim, email, jurusan });

    const data = {
      message: `Mengedit student id ${id}`,
      data: [nama, nim, email, jurusan],
    };

    res.json(data);
  }

  // TODO 7: Hapus data students
  async destroy(req, res) {
    const { id } = req.params;
    await Student.delete(id);

    const data = {
      message: `Menghapus student id ${id}`,
    };

    res.json(data);
  }

  // Melihat detail students
  async show(req, res) {
    const { id } = req.params;
    const students = await Student.find(id);

    const data = {
      message: `Menampilkan data student id ${id}`,
      data: students,
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
