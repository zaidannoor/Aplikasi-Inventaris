import React, { useState, useCallback, useEffect } from "react";
import { getDistributionHistory } from "../../utils/apis";
import Swal from "sweetalert2";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";
import moment from "moment";

function RiwayatDistribusiPage() {
  const [load, setLoad] = useState(true);
  const [history, setHistory] = useState(null); // array of object type

  const getAllHistory = useCallback(() => {
    getDistributionHistory().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setHistory(() => {
          return data;
        });
        console.log(data);
        setLoad(false)
      }
    });
  }, [getDistributionHistory]);

  useEffect(() => {
    getAllHistory();
  }, [getAllHistory]);


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
    <section className="riwayat-distribusi-page p-3">
      <h1 className="text-center">Riwayat Distribusi</h1>

      <div className="distribusi-list card p-4">
        <table className="table border border-black text-center">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Barang</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Tujuan</th>
              <th scope="col">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i = 0) => (
              <tr key={++i}>
                <th scope="row">{++i}</th>
                <td>{h.name_item}</td>
                <td>{h.qty}</td>
                <td>{h.work_unit}</td>
                <td>{moment(h.createdAt).format('DD-MM-YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RiwayatDistribusiPage;
