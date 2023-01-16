// TODO 3: Import data students dari folder data/students.js
// code here
const students = require("../data/students.js");

// Membuat Class StudentController
class StudentController {
  // TODO 4: Tampilkan data students
  // code here
  index(req, res) {
    const data = {
      message: "Menampilkkan semua students",
      data: [students],
    };

    res.json(data);
  }

  // TODO 5: Tambahkan data students
  // code here
  store(req, res) {
    const { nama } = req.body;
    students.push(nama);

    const data = {
      message: `Menambahkan data student: ${nama}`,
      data: [students],
    };

    res.json(data);
  }

  // TODO 6: Update data students
  // code here
  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;
    students[id] = nama;

    const data = {
      message: `Mengedit student id ${id}, nama ${nama}`,
      data: [students],
    };

    res.json(data);
  }

  // TODO 7: Hapus data students
  // code here
  destroy(req, res) {
    const { id } = req.params;
    students.splice(id, 1);

    const data = {
      message: `Menghapus student id ${id}`,
      data: [students],
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
