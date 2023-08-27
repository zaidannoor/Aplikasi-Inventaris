import React, { useState, useCallback, useEffect } from "react";
import { procurementHistory } from "../../utils/apis";
import loading from "../../images/loading.gif";
import moment from "moment/moment";


function RiwayatPengadaanPage() {
  const [initializing, setInitializing] = useState(true);
  const [history, setHistory] = useState(null);

  const getAllHistory = useCallback(() => {
    procurementHistory().then(({ data, error }) => {
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

        setInitializing(false);
      }
    });
  }, [procurementHistory]);

  useEffect(() => {
    getAllHistory();
  }, [getAllHistory]);

  if (initializing) {
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
    <section className="riwayat-pengadaan-page p-3">
      <h1 className="text-center">Riwayat Pengadaan</h1>

      <div className="pengadaan-list card p-4">
        <table className="table border border-black text-center">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Barang</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">tanggal</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i = 0) => (
              <tr key={h.id}>
                <th scope="row">{++i}</th>
                <td>{h.name_item}</td>
                <td>{h.quantity}</td>
                <td>{h.description}</td>
                <td>{moment(h.added_date).format("DD-MM-YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RiwayatPengadaanPage;
