import React, { useCallback, useEffect, useState } from "react";
import { getWorkunits, addWorkUnit, updateWorkUnit } from "../../utils/apis";
import Swal from "sweetalert2";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

function ManajemenJurusanPage() {
  const [initializing, setInitializing] = useState(true);
  const [workunits, setWorkunits] = useState(null); // array of object type
  const [dataTable1, setTable1] = useState(null);
  const [newWorkUnitCode, onNewWorkUnitCodeChange] = State("");
  const [newWorkUnit, onNewWorkUnitChange] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setInitializing(true);

    const { error, feedback } = await addWorkUnit({
      code: newWorkUnitCode,
      name: newWorkUnit,
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
      getAllWorkunits();
    }
    setInitializing(false);
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
        const total = data.length;

        const table1 = data.splice(0, Math.ceil(total / 2));
        setTable1(() => {
          return table1;
        });

        setInitializing(false);

      }
    });
  }, [getWorkunits]);

  async function onUpdate(e) {
    const { value: formValues } = await Swal.fire({
      title: "Ubah Unit Kerja",
      html:
        '<input autocomplete="off" id="swal-input1" class="swal2-input" placeholder="Code">' +
        '<input autocomplete="off" id="swal-input2" class="swal2-input" placeholder="Unit Kerja">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const id = e.target.id;
      const code = formValues[0];
      const name = formValues[1];
      const { error, feedback } = await updateWorkUnit({
        id,
        code,
        name,
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
        getAllWorkunits();
      }
    }
  }

  useEffect(() => {
    getAllWorkunits();
  }, [getAllWorkunits]);

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
    <section className="manajemen-jurusan-page p-3">
      <h1 className="text-center">Manajemen Jurusan</h1>

      <div className="kategori-list card mt-3">
        <h2 className="p-3">List Jurusan dan Unit Kerja</h2>
        <div className="kategori-table d-flex justify-content-evenly">
          <div className="mx-2">
            <table className="table border border-black text-center">
              <thead>
                <tr>
                  <th scope="col">Kode Jurusan</th>
                  <th scope="col">Jurusan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTable1.map((d) => (
                  <tr key={d.id}>
                    <th scope="row">{d.code}</th>
                    <td>{d.name}</td>
                    <td>
                      <button
                        id={d.id}
                        onClick={onUpdate}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
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
                  <th scope="col">Kode Unit Kerja</th>
                  <th scope="col">Unit Kerja</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {workunits.map((w) => (
                  <tr key={w.id}>
                    <th scope="row">{w.code}</th>
                    <td>{w.name}</td>
                    <td>
                      <button
                        id={w.id}
                        onClick={onUpdate}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="tambah-jurusan card mt-4 p-3">
        <h2>Tambah Jurusan Baru</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Kode Unit Kerja"
                value={newWorkUnitCode}
                onChange={onNewWorkUnitCodeChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Unit Kerja"
                value={newWorkUnit}
                onChange={onNewWorkUnitChange}
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

export default ManajemenJurusanPage;
