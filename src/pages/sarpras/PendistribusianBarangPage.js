import React, { useCallback, useState, useEffect } from "react";
import {
  getUnassignedItem,
  addItemToWorkUnit,
  getWorkunits,
} from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";
import Swal from "sweetalert2";

function PendistribusianBarangPage() {
  const [load, setLoad] = useState(false);
  const [unassignedItem, setUnassignedItem] = useState(null);
  const [workunits, setWorkunits] = useState(null);

  const [id_name_item, setIdItem] = State("");
  const [id_work_unit, setUnit] = State("");
  const [quantity, setQuantity] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoad(true);

    const { error, feedback } = await addItemToWorkUnit({
      id_name_item,
      id_work_unit,
      quantity,
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
      getAllUnassignedItem()
    }
    setLoad(false);
  }

  const getAllWorkunits = useCallback(() => {
    getWorkunits().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setWorkunits(() => {
          return data;
        });

      }
    });
  }, [getWorkunits]);

  const getAllUnassignedItem = useCallback(() => {
    getUnassignedItem().then(({ data, error }) => {
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
      }
    });
  }, [getUnassignedItem]);

  useEffect(() => {
    getAllUnassignedItem();
    getAllWorkunits();
  }, [getAllUnassignedItem, getAllWorkunits]);

  if (!(unassignedItem && workunits)) {
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
    <section className="pendistribusian-barang-page p-3">
      <h1 className="text-center">Pendistribusian Barang</h1>

      <div className="barang-list card p-3">
        <h2>Barang yang belum masuk ke jurusan</h2>
        <div className="">
          <table className="table border border-black text-center mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {unassignedItem.map((item, i = 0) => (
                <tr key={++i}>
                  <th scope="row">{++i}</th>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="distribusi-barang card p-3 mt-4">
        <h2>Distribusi Barang ke Unit Kerja</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <select className="form-select" onChange={setIdItem}>
                <option value="" hidden>
                  Pilih Barang
                </option>
                {unassignedItem.map((u) => (
                  <option key={u.code} value={u.id_name_item}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-select" onChange={setUnit}>
                <option value="" hidden>
                  Pilih Unit Kerja
                </option>
                {workunits.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Jumlah"
                value={quantity}
                onChange={setQuantity}
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

export default PendistribusianBarangPage;
