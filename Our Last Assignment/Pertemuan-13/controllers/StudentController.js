// import Model Student
const Student = require("../models/Student.js");

class StudentController {
    // menambahkan keyword async
    async index(req, res) {
        // memanggil method static all dengan async await.
        const students = await Student.all();

        // data array lebih dari 0
        if (students.length > 0) {
            const data = {
                message: "Menampilkkan semua students",
                data: students,
            };

            return res.status(200).json(data);
        }

        //else {
        const data = {
            massage: "Students is empty",
        };

        return res.status(200).json(data);
        //}
    }

    async store(req, res) {
        //validasi sederhana
        // menghandle jika salah satu data tidak dikirim

        // destructing object req.body
        const {
            nama,
            nim,
            email,
            jurusan
        } = req.body;

        //jika undifined kirim response error
        if (!nama || !nim || !email || !jurusan) {
            const data = {
                message: "Semua data harus dikirim",
                data: isNaN(nim),
            };
            return res.status(422).json(data);
        }

        if (isNaN(nim)) {
            const data = {
                message: "Gagal menambahkan data students, nim harus berupa angka",
                data: isNaN(nim),
            };
            return res.status(422).json(data);
        }

        //else
        const student = await Student.create(req.body);
        // memanggil method create dari Model Student

        const data = {
            message: "Menambahkan data student",
            data: student,
        };
        return res.status(201).json(data);
    }

    async update(req, res) {
        const {
            id
        } = req.params;
        const {
            nama,
            nim,
            email,
            jurusan
        } = req.body;
        // cari id student yang akan di update
        const student = await Student.find(id);

        if (student) {
            if (!nama || !nim || !email || !jurusan) {
                const data = {
                    message: "Gagal mengedit data student ,semua data harus dikirim",
                    data: isNaN(nim),
                };
                return res.status(422).json(data);
            }

            if (isNaN(nim)) {
                const data = {
                    message: "Gagal menambahkan data students, nim harus berupa angka",
                    data: isNaN(nim),
                };
                return res.status(422).json(data);
            }

            // melakukan update data 

            const student = await Student.update(id, req.body);
            const data = {
                message: "Berhasil Mengedit data students ",
                data: student,
            };
            return res.status(200).json(data);
        }
        // } else {

        const data = {
            message: "Student not found",
        };
        return res.status(404).json(data);
    }


    async destroy(req, res) {
        const {
            id
        } = req.params;
        const student = await Student.find(id);

        if (student) {
            await Student.delete(id);
            const data = {
                message: "Menghapus data students",
            };

            res.status(200).json(data);
        } else {
            const data = {
                message: "Student not found",
            };

            res.status(404).json(data);
        }
    }

    async show(req, res) {
        const {
            id
        } = req.params;
        const student = await Student.find(id);

        if (student) {
            const data = {
                message: "Menampilkan data students",
                data: student,
            };

            res.status(200).json(data);
        } else {
            const data = {
                message: "Student not found",
            };

            res.status(404).json(data);
        }
    }



}
// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;