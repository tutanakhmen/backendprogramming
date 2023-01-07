<?php

# membuat class Animal
class Animal
{
    # property animals
    private $animals = [];
    # method constructor - mengisi data awal
    # parameter: data hewan (array)
    public function __construct($data)
    {
        foreach ($data as $animal) {
            array_push($this->animals, $animal);
        }
    }
    # method index - menampilkan data animals
    public function index()
    {
        # gunakan foreach untuk menampilkan data animals (array)
        foreach ($this->animals as $animal) {
            echo $animal;
            echo "<br>";
        }
    }

    # method store - menambahkan hewan baru
    # parameter: hewan baru
    public function store($data)
    {
        array_push($this->animals, $data);
        # gunakan method array_push untuk menambahkan data baru  
    }

    # method update - mengupdate hewan
    # parameter: index dan hewan baru
    public function update($index, $data)
    {
        array_splice($this->animals, $index, 1, $data);
    }

    # method delete - menghapus hewan
    # parameter: index
    public function destroy($index)
    {
        array_splice($this->animals, $index, 1);
        # gunakan method unset atau array_splice untuk menghapus data array
    }
}

# membuat object
# kirimkan data hewan (array) ke constructor
$animal = new Animal(["- ayam", "- ikan"]);

echo "Index - Menampilkan seluruh hewan <br>";
$animal->index();
echo "<br>";

echo "Store - Menambahkan hewan baru <br>";
$animal->store('- burung');
$animal->index();
echo "<br>";

echo "Update - Mengupdate hewan <br>";
$animal->update(0, '- Kucing Anggora');
$animal->index();
echo "<br>";

echo "Destroy - Menghapus hewan <br>";
$animal->destroy(1);
$animal->index();
echo "<br>";

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    # data animals
    private $animals = ['Kucing', 'Ayam', 'Ikan'];

    # method index - menampilkan data animals
    public function index()
    {
        
        foreach ($this->animals as $animal) {
            echo $animal;
            echo "<br>";
        }
    }

    # method store - menambahkan hewan baru
    # parameter: hewan baru
    public function store(Request $request)
    {
        # gunakan method array_push untuk menambahkan data baru
        array_push($this->animals, $request->animal);
        echo "Berhasil menambahkan data $request->animal";
        echo "<br>";
        echo "<br>";
        echo "Data animals saat ini: ";
        echo "<br>";
        $this->index();
    }

    # method update - mengupdate hewan
    # parameter: index dan hewan baru
    public function update($id, Request $request)
    {
        echo "Mengubah data " . $this->animals[$id] .  " menjadi $request->animal";
        array_splice($this->animals, $id, 1, $request->animal);
        echo "<br>";
        echo "<br>";
        echo "Data animals saat ini: ";
        echo "<br>";
        $this->index();
    }

    # method delete - menghapus hewan
    # parameter: index
    public function destroy(Request $request, $id)
    {
        echo "Menghapus data " . $this->animals[$id];
        # gunakan method unset atau array_splice untuk menghapus data array
        array_splice($this->animals, $id, 1);
        echo "<br>";
        echo "<br>";
        echo "Data animals saat ini: ";
        echo "<br>";
        $this->index();
    }
}