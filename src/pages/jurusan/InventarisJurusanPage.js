import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWorkunitInvent } from "../../utils/apis";
import loading from "../../images/loading.gif";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import TableData from "../../components/download/TableData";

import Swal from "sweetalert2";
import moment from "moment";

function InventarisJurusanPage() {
  const [load, setLoad] = useState(true);
  const [place, setPlace] = useState("Jurusan");
  const [title, setTitle] = useState(
    JSON.parse(localStorage.getItem("auth")).workUnit
  );
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
        setLoad(false);
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
        <div className="kategori-table mt-2">
          {items.length > 0 ? (
            <>
              <div className="d-flex justify-content-end mb-3">
                <PDFDownloadLink
                  document={<TableData items={items} place={place} title={title} />}
                  fileName={"Laporan Jurusan " + title}
                >
                  {({ loading }) =>
                    loading ? (
                      <button className="btn btn-warning">
                        Loading Document
                      </button>
                    ) : (
                      <button className="btn btn-primary">Download PDF</button>
                    )
                  }
                </PDFDownloadLink>
              </div>
              <table className="table border border-black text-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Baik</th>
                    <th scope="col">Rusak</th>
                    <th scope="col">Total</th>
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
            </>
          ) : (
            <h3>Belum ada barang pada Jurusan ini</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default InventarisJurusanPage;
