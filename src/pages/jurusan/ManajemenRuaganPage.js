import React from "react";

function ManajemenRuaganPage() {
  return (
    <section className="manajemen-ruangan-page p-3">
      <h1 className="text-center">Manajemen Ruangan</h1>

      <div className="ruangan-list card mt-3">
        <h2 className="p-3">List Ruangan $Jurusan</h2>
        <div className="ruangan-table d-flex justify-content-evenly">
          <div className="mx-2">
            <table className="table border border-black text-center">
              <thead>
                <tr>
                  <th scope="col">No Ruangan</th>
                  <th scope="col">Nama Ruangan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">001</th>
                  <td>Kelas A</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">002</th>
                  <td>Kelas B</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">003</th>
                  <td>Kelas C</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mx-2">
          <table className="table border border-black text-center">
              <thead>
                <tr>
                  <th scope="col">No Ruangan</th>
                  <th scope="col">Nama Ruangan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">001</th>
                  <td>Kelas A</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">002</th>
                  <td>Kelas B</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">003</th>
                  <td>Kelas C</td>
                  <td>
                    <button
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="tambah-ruangan card mt-4 p-3">
        <h2>Tambah Jurusan Baru</h2>
        <form className="p-3">
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Kode Ruangan"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Ruangan"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary px-3">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ManajemenRuaganPage;
