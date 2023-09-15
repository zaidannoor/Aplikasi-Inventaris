import React, { useCallback, useEffect, useState } from "react";
import { getInventories } from "../../utils/apis";
import loading from "../../images/loading.gif";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import LaporanTotal from "../../components/download/LaporanTotal";
import Swal from "sweetalert2";

function TotalInventarisPage() {
  const [initializing, setInitializing] = useState(true);
  const [inventories, setInventories] = useState(true);

  const getAllInventories = useCallback(() => {
    getInventories().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setInventories(() => {
          return data;
        });
        console.log(data);
        setInitializing(false);
      }
    });
  }, [getInventories]);

  useEffect(() => {
    getAllInventories();
  }, [getAllInventories]);

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
    <section className="total-inventaris-page p-3">
      <h1 className="text-center">Total Inventaris</h1>

      <div className="inventaris-list card p-4">
        {inventories.length > 0 ? (
          <>
            <div className="d-flex justify-content-end mb-3">
              <PDFDownloadLink
                document={<LaporanTotal items={inventories} />}
                fileName="Laporan Total Inventaris"
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
                  <th scope="col">Kode Kategori</th>
                  <th scope="col">Kode Barang</th>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((invent, i = 0) => (
                  <tr key={++i}>
                    <th scope="row">{++i}</th>
                    <td>{invent.code_type}</td>
                    <td>{invent.code}</td>
                    <td>{invent.name}</td>
                    <td>{invent.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h3>Belum ada inventaris</h3>
        )}
      </div>
    </section>
  );
}

export default TotalInventarisPage;
