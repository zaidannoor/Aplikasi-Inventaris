import React, { useCallback, useState, useEffect } from "react";
import { getRooms } from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

import Swal from "sweetalert2";
import moment from "moment";

function ManajemenKondisiBarangPage() {
  const [load, setLoad] = useState(true);
  const [rooms, setRoom] = useState(null); // array of object type
  const [selectedRoom, setSelectedRoom] = State('');

  const getAllRoom = useCallback(() => {
    getRooms().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setRoom(() => {
          return data;
        });
        console.log(data);
        setLoad(false);
      }
    });
  }, [getRooms]);

  useEffect(() => {
    getAllRoom();
  }, [getAllRoom]);

  if (load) {
    return (
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src={loading}
        alt="loading"
        width={200}
      />
    );
  }

  return (
    <section className="manajemen-kondisi-barang-page p-3">
      <h1 className="text-center">Manajemen Kondisi Barang</h1>

      <div className="barang-list card mt-3 p-3">
        <h2 className="p-3">List Ruangan</h2>
        <div className="mx-3 p-3">
          <select className="form-select" onChange={setSelectedRoom}>
            <option value="" hidden>Pilih Ruangan</option>
            {rooms.map((r, i = 0) => (
              <option key={++i} value={r.code}>
                {r.name}
              </option>
            ))}
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
