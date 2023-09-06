import React, { useCallback, useState, useEffect } from "react";
import { getRooms, addRoom } from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

import Swal from "sweetalert2";

function ManajemenRuaganPage() {
  
  const [load, setLoad] = useState(true);
  const [rooms, setRoom] = useState(null); // array of object type
  const [dataTable1, setTable1] = useState(null);
  const [name, setName] = State("");
  const [code, setCode] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoad(true);

    const { error, feedback } = await addRoom({ name });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: feedback,
      });
      getAllRoom();
    }
    setLoad(false);
  }

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

        const total = data.length;

        const table1 = data.splice(0, Math.ceil(total / 2));
        setTable1(() => {
          return table1;
        });

        setLoad(false);
        console.log(dataTable1);
        console.log(data);
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
    <section className="manajemen-ruangan-page p-3">
      <h1 className="text-center">Manajemen Ruangan</h1>

      <div className="ruangan-list card mt-3">
        <h2 className="p-3">
          List Ruangan {JSON.parse(localStorage.getItem("auth")).workUnit}
        </h2>
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
                {dataTable1.map((d, i = 0) => (
                  <tr key={++i}>
                    <th scope="row">{++i}</th>
                    <td>{d.name}</td>
                    <td>
                      <button className="btn btn-warning">Edit</button>
                    </td>
                  </tr>
                ))}
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
                {rooms.map((r, i = 0) => (
                  <tr key={++i}>
                    <th scope="row">{++i}</th>
                    <td>{r.name}</td>
                    <td>
                      <button className="btn btn-warning">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="tambah-ruangan card mt-4 p-3">
        <h2>Tambah Ruangan Baru</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kode Ruangan"
                value={code}
                onChange={setCode}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Ruangan"
                value={name}
                onChange={setName}
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
