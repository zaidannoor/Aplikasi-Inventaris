import React, { useCallback, useEffect, useState } from "react";
import { getInventories } from "../../utils/apis";
import loading from "../../images/loading.gif";

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

        setInitializing(false);
        console.log(data);
        console.log(inventories);
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
      </div>
    </section>
  );
}

export default TotalInventarisPage;
