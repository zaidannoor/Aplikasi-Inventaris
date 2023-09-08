import React, { useCallback, useState, useEffect } from "react";
import { getUnassignedRoom, getRooms } from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

import Swal from "sweetalert2";
import moment from "moment";

function DistribusiJurusanPage() {
  const [load, setLoad] = useState(false);
  const [rooms, setRoom] = useState(null); // array of object type
  const [unassignedItem, setUnassignedItem] = useState(null);

  const getAllUnassignedItem = useCallback(() => {
    getUnassignedRoom().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setUnassignedItem(() => {
          return data;
        });
        console.log(data)
      }
    });
  }, [getUnassignedRoom]);

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
        console.log(data)
      }
    });
  }, [getUnassignedRoom]);

  useEffect(() => {
    getAllUnassignedItem();
    getAllRoom()
  }, [getAllUnassignedItem, getAllRoom]);

  if (!(rooms && unassignedItem)) {
    return (
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src={loading}
        alt="loading"
        width={200}
      />
    );
  }

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
    <section className="distribusi-jurusan-page p-3">
      <div className="barang-list card p-3">
        <h2>Barang yang belum masuk ke Ruangan</h2>
        <div className="">
          <table className="table border border-black text-center mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tahun</th>
                <th scope="col">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {unassignedItem.map((item, i = 0) => (
                <tr key={++i}>
                  <th scope="row">{++i}</th>
                  <td>{item.name}</td>
                  <td>{moment(item.date).format('YYYY')}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="distribusi-barang card p-3 mt-4">
        <h2>Distribusi Barang ke Ruangan</h2>
        <form className="p-3">
          <div className="row">
            <div className="col">
              <select className="form-select">
                <option value="" hidden>
                  Pilih Barang
                </option>
                {
                  unassignedItem.map((item, i=0) => (
                    <option key={++i} value={item.id}>{item.name} - {moment(item.date).format('YYYY')}</option>
                  ))
                }
              </select>
            </div>
            <div className="col">
              <select className="form-select">
                <option value="" hidden>
                  Pilih Ruangan
                </option>
                {
                  rooms.map((r, i=0) => (
                    <option key={++i} value={r.code}>{r.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Jumlah"
              />
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-primary px-3">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DistribusiJurusanPage;
