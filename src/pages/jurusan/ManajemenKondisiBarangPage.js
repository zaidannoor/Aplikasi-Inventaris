import React from "react";

function ManajemenKondisiBarangPage() {
  return (
    <section className="manajemen-kondisi-barang-page p-3">
      <h1 className="text-center">Manajemen Kondisi Barang</h1>

      <div className="barang-list card mt-3 p-3">
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
                <th scope="col">No inventaris</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Kondisi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">220.0700.Smkmuh3.12.001.001</th>
                <td>Meja</td>
                <td>Baik</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">220.0700.Smkmuh3.12.001.002</th>
                <td>Meja</td>
                <td>Baik</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">220.0700.Smkmuh3.12.001.003</th>
                <td>Meja</td>
                <td>Baik</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
              <tr>
                <th scope="row">220.0700.Smkmuh3.12.001.004</th>
                <td>Meja</td>
                <td>Baik</td>
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

export default ManajemenKondisiBarangPage;
