import React from "react";

function InventarisJurusanPage() {
  return (
    <section className="inventaris-jurusan-page">
      <h1 className="text-center">Inventaris Jurusan</h1>
      <div className="inventaris-jurusan-list card mt-3 p-3">
        <h2 className="p-3">List Ruangan</h2>
        <div className="mx-3 p-3">
          <select className="form-select" placeholder="pilih Ruangan">
            <option value="1">Pilih Ruangan</option>
            <option value="1">Ruangan 1</option>
            <option value="1">Ruangan 2</option>
          </select>
        </div>
        <div className="kategori-table d-flex justify-content-evenly mt-2">
          <table className="table border border-black text-center">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Baik</th>
                <th scope="col">Rusak</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Tahun</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Meja</td>
                <td>10</td>
                <td>3</td>
                <td>13</td>
                <td>2012</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Kursi</td>
                <td>10</td>
                <td>3</td>
                <td>13</td>
                <td>2012</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Almari</td>
                <td>2</td>
                <td>0</td>
                <td>2</td>
                <td>2012</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Lampu</td>
                <td>2</td>
                <td>0</td>
                <td>2</td>
                <td>2012</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InventarisJurusanPage;
