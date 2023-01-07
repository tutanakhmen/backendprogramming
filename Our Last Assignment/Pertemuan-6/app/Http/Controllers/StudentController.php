<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;


class StudentController extends Controller
{
    # method index - get all resources
    public function index()
    {
        # menggunakan model Student untuk select data
        $students = Student::all();

        if ($students->count() == 0) {
            $data = [
                'message' => 'Data student is empty'
            ];
            return response()->json($data, 404);
        } else {
            $data = [
                'message' => 'Get all students',
                'data' => $students,
            ];
            return response()->json($data, 200);
        }
    }

    # menambahkan resource student
    # membuat method store
    public function store(Request $request)
    {
        // Receive request data from body
        $nama = $request->nama;
        $nim = $request->nim;
        $email = $request->email;
        $jurusan = $request->jurusan;

        if ($nama && $nim && $email && $jurusan) {
            // Insert data to database -> students
            $student = Student::create([
                "nama" => $nama,
                "nim" => $nim,
                "email" => $email,
                "jurusan" => $jurusan
            ]);

            $data = [
                "message" => "Student data successfully created",
                "data" => $student
            ];

            return response()->json($data, 201);
        } else {
            $errorMessages = [];

            $nama ?? array_push($errorMessages, "Nama has not been filled");
            $nim ?? array_push($errorMessages, "NIM has not been filled");
            $email ?? array_push($errorMessages, "Email has not been filled");
            $jurusan ?? array_push($errorMessages, "Jurusan has not been filled");

            $data = [
                "Add data student failed" => $errorMessages
            ];

            return response()->json($data, 404);
        }
    }

    // Menampilkan data students dengan id
    // Membuat method show
    public function show($id)
    {
        $data = Student::find($id);

        if (!is_numeric($id)) {
            $errorMessage = [
                'message' => "id you entered '$id' is not a number"
            ];
            return response()->json($errorMessage, 404);
        } else if ($data == null) {
            $errorMessage = [
                'message' => "data with id $id doesn't exist"
            ];
            return response()->json($errorMessage, 404);
        }
        return response()->json($data, 200);
    }

    #mengubah resource student
    #membuat method update
    public function update(Request $request, $id)
    {
        // Receive request data from body
        $nama = $request->nama;
        $nim = $request->nim;
        $email = $request->email;
        $jurusan = $request->jurusan;

        // Update student data
        $student = Student::find($id);

        if ($student) {
            $student->update([
                'nama' => ($nama != null) ? $nama : $student->nama,
                'nim' => ($nim != null) ? $nim : $student->nim,
                'email' => ($email != null) ? $email : $student->email,
                'jurusan' => ($jurusan != null) ? $jurusan : $student->jurusan,
            ]);

            $data = [
                "message" => "Student with id $id has succesfully updated",
                "data" => $student
            ];
            return response()->json($data, 200);
        } else {
            $errorMessage = [
                "message" => "update data failed, data with id $id doesn't exist"
            ];
            return response()->json($errorMessage, 404);
        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if ($student) {
            $student->delete();
            $data = [
                "message" => "Student with id $id has succesfully deleted",
                "data" => $student
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "message" => "delete data failed, data with id $id doesn't exist"
            ];
            return response()->json($data, 404);
        }
    }
}
