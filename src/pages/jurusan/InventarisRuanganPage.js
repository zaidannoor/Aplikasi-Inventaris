import React, { useCallback, useState, useEffect } from "react";
import { getRooms, getTotalItemByRoom } from "../../utils/apis";
import loading from "../../images/loading.gif";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import TableData from "../../components/download/TableData";
import Swal from "sweetalert2";
import moment from "moment";

function InventarisRuanganPage() {
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState(null);
  const [place, setPlace] = useState("Ruangan");
  const [rooms, setRoom] = useState(null); // array of object type
  const [items, setItem] = useState(null); // array of object type
  const [selectedRoom, setSelectedRoom] = useState("0");

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
      }
    });
  }, [getRooms]);

  const getTotalItemRoom = useCallback(
    (code = selectedRoom) => {
      getTotalItemByRoom({ code_room: code }).then(({ data, error }) => {
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
        }
      });
    },
    [getRooms]
  );

  const onRoomChange = (e) => {
    setSelectedRoom(() => {
      return e.target.value;
    });

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setTitle(() => {
      return option;
    });

    getTotalItemRoom(e.target.value);
  };

  useEffect(() => {
    getAllRoom();
    getTotalItemRoom();
  }, [getAllRoom, getTotalItemRoom]);

  if (!(items && rooms)) {
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
    <section className="inventaris-ruangan-page">
      <h1 className="text-center">Inventaris Ruangan</h1>
      <div className="inventaris-jurusan-list card mt-3 p-3">
        <h2 className="p-3">List Ruangan</h2>
        <div className="mx-3 p-3">
          <select className="form-select" onChange={onRoomChange}>
            <option value="" hidden>
              Pilih Ruangan
            </option>
            {rooms.map((r, i = 0) => (
              <option key={++i} id={r.name} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="kategori-table mt-2">
          {items.length > 0 ? (
            <>
              <div className="d-flex justify-content-end mb-3">
                <PDFDownloadLink
                  document={
                    <TableData items={items} place={place} title={title} />
                  }
                  fileName={"Laporan Ruangan " + title}
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
            <h3>Belum ada barang pada ruangan ini</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default InventarisRuanganPage;
