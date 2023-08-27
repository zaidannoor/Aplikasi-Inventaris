import React, { useState, useCallback, useEffect } from "react";
import { getTypes, addType, updateType } from "../../utils/apis";
import State from "../../hooks/State";
import Swal from "sweetalert2";
import loading from "../../images/loading.gif";

function ManajemenKategoriPage() {
  const [initializing, setInitializing] = useState(true);
  const [types, setTypes] = useState(null);
  const [dataTable1, setTable1] = useState(null);
  const [name, onNameChange] = State("");
  const [code, onCodeChange] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setInitializing(true);

    const { error, feedback } = await addType({ code, name });
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
      getAllTypes()
    }
    setInitializing(false);
  }

  const getAllTypes = useCallback(() => {
    getTypes().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setTypes(() => {
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
  }, [getTypes]);

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
      console.log(code);
      const { error, feedback } = await updateType({
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
        getAllTypes();
      }
    }
  }

  useEffect(() => {
    getAllTypes();
  }, [getAllTypes]);

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
    <section className="manajemen-kategori-page p-3">
      <h1 className="text-center">Manajemen Kategori</h1>

      <div className="kategori-list card mt-3">
        <h2 className="p-3">List Kategori</h2>
        <div className="kategori-table d-flex justify-content-evenly">
          <div className="">
            <table className="table border border-black text-center">
              <thead>
                <tr>
                  <th scope="col">Kode Barang</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTable1.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.code}</th>
                    <td>{t.name}</td>
                    <td>
                      <button
                        id={t.id}
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
                  <th scope="col">Kode Barang</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {types.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.code}</th>
                    <td>{t.name}</td>
                    <td>
                      <button
                        id={t.id}
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

      <div className="tambah-kategori card p-3 mt-4">
        <h2>Tambah Kategori Baru</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-md-5">
              <input
                type="number"
                className="form-control"
                placeholder="Kode"
                value={code}
                onChange={onCodeChange}
              />
            </div>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Kategori" value={name} onChange={onNameChange} />
            </div>

            <div className="col">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ManajemenKategoriPage;
