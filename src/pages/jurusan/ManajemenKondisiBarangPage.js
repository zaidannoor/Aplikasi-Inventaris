import React, { useCallback, useState, useEffect } from "react";
import { getRooms, getItemByRoom, changeItemStatus } from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

import Swal from "sweetalert2";
import moment from "moment";

function ManajemenKondisiBarangPage() {
  const [load, setLoad] = useState(false);
  const [rooms, setRoom] = useState(null); // array of object type
  const [items, setItem] = useState(null); // array of object type
  const [selectedRoom, setSelectedRoom] = useState("1");

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
      }
    });
  }, [getRooms]);

  const getAllItemByRoom = useCallback(
    (code = selectedRoom) => {
      getItemByRoom({ code_room: code }).then(({ data, error }) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        } else {
          setItem(() => {
            return data;
          });
          console.log(data);
        }
      });
    },
    [getRooms]
  );

  const onRoomChange = (e) => {
    setSelectedRoom(() => {
      return e.target.value;
    });
    getAllItemByRoom(e.target.value);
  };

  async function onUpdate(e) {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          1: "Baik",
          2: "Buruk",
        });
      }, 1000);
    });

    const { value: status } = await Swal.fire({
      title: "Pilih Kondisi Barang",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Pilih Salah Satu!";
        }
      },
    });

    if (status) {
      const id = e.target.id;
      console.log(status)
      console.log(id);

      const { error, feedback } = await changeItemStatus({
        id,
        status,
      });
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
        getAllItemByRoom();
      }
    }
  }

  useEffect(() => {
    getAllRoom();
    getAllItemByRoom();
  }, [getAllRoom, getAllItemByRoom]);

  if (!(rooms && items)) {
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
    <section className="manajemen-kondisi-barang-page p-3">
      <h1 className="text-center">Manajemen Kondisi Barang</h1>

      <div className="barang-list card mt-3 p-3">
        <h2 className="p-3">List Ruangan</h2>
        <div className="mx-3 p-3">
          <select className="form-select" onChange={onRoomChange}>
            <option value="" hidden>
              Pilih Ruangan
            </option>
            {rooms.map((r, i = 0) => (
              <option key={++i} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div className="kategori-table d-flex justify-content-evenly mt-2">
          {items.length > 0 ? (
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
                {items.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.codeInvent}</th>
                    <td>{item.nameItem}</td>
                    <td>{item.condition}</td>
                    <td>
                      <button id={item.id} onClick={onUpdate} className="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>Belum ada barang pada ruangan ini</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManajemenKondisiBarangPage;
