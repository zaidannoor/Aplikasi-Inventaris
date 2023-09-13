import React, { useCallback, useState, useEffect } from "react";
import { getWorkunitInvent } from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

import Swal from "sweetalert2";
import moment from "moment";

function InventarisJurusanPage() {
  const [load, setLoad] = useState(true);
  const [items, setItem] = useState(null); // array of object type

  const getAllItem = useCallback(() => {
    getWorkunitInvent().then(({ data, error }) => {
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
        setLoad(false)
      }
    });
  }, [getWorkunitInvent]);

  useEffect(() => {
    getAllItem();
  }, [getAllItem]);

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
    <section className="inventaris-jurusan-page">
      <h1 className="text-center">Inventaris Jurusan</h1>
      <div className="inventaris-jurusan-list card mt-3 p-3">
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
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={++i}>
                  <th scope="row">{++i}</th>
                  <td>{item.name}</td>
                  <td>{item.baik}</td>
                  <td>{item.buruk}</td>
                  <td>{item.total}</td>
                  <td>{moment(item.date).format("YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InventarisJurusanPage;
