// import Model Patient
const Patient = require("../models/Patient.js");
// buat class PatientController
class PatientController {
  // buat fungsi
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    // data array lebih dari 0
    if (patients.length > 0) {
      const data = {
        message: "Menampilkkan semua patients",
        data: patients,
      };

      return res.status(200).json(data);
    }

    //else {
    const data = {
      massage: "patients is empty",
    };

    return res.status(200).json(data);
    //}
  }

  async store(req, res) {
    /**
     * Validasi sederhana:
     * - Handle jika salah satu data tidak dikirim
     */

    // destructing object req.body
    const {
      name,
      phone,
      address,
      status,
      in_date_at,
      out_date_at
    } = req.body;

    // jika data undefined maka kirim response error
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }

    // Memanggil method create dari model Patient.
    const patient = await Patient.create(req.body);

    const data = {
      message: "Menambahkan data patient",
      data: patient,
    };

    return res.status(201).json(data);
  }

  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      phone,
      address,
      status,
      in_date_at,
      out_date_at
    } = req.body;
    // cari id patient yang akan di update
    const patient = await Patient.find(id);

    if (patient) {
      if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
        const data = {
          message: "Gagal mengedit data patient ,semua data harus dikirim",
        };
        return res.status(422).json(data);
      }
      // melakukan update data 

      const patient = await Patient.update(id, req.body);
      const data = {
        message: "Berhasil Mengedit data patients ",
        data: patient,
      };
      return res.status(200).json(data);
    }
    // } else {

    const data = {
      message: "Patient not found",
    };
    return res.status(404).json(data);
  }


  async destroy(req, res) {
    const {
      id
    } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: "Menghapus data patients",
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Patient not found",
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const {
      id
    } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: "Menampilkan data patients",
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Patient not found",
      };

      res.status(404).json(data);
    }
  }

  // Membuat method search
  async search(req, res) {
    const {
      name
    } = req.params;
    // Mencari data berdasarkan nama
    const patients = await Patient.search(name);

    // Menampilkan data
    if (patients.length > 0) {
      const data = {
        message: "Get searched resource",
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  };


  // Membuat method positive
  async positive(req, res) {
    // Mencari data berdasarkan status
    const patients = await Patient.findByStatus("positive");

    // Menampilkan data
    const data = {
      message: "Get positive resource",
      total: patients.length,
      data: patients,
    };
    res.status(200).json(data);
  };


  // Membuat method recovered
  async recovered(req, res) {
    // Mencari data berdasarkan status
    const patients = await Patient.findByStatus("recovered");

    // Menampilkan data
    const data = {
      message: "Get recovered resource",
      total: patients.length,
      data: patients,
    };
    res.status(200).json(data);
  };


  // Membuat method dead
  async dead(req, res) {
    // Mencari data berdasarkan status
    const patients = await Patient.findByStatus("dead");

    // Menampilkan data
    const data = {
      message: "Get dead resource",
      total: patients.length,
      data: patients,
    };
    res.status(200).json(data);
  };
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;