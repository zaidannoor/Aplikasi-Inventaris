import React, { useState, useCallback, useEffect } from "react";
import { getTypes, getItems, addItem, updateItem } from "../../utils/apis";
import Swal from "sweetalert2";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";

function ManajemenBarangPage() {
  const [kategori, setKategori] = useState(null);
  const [load, setLoad] = useState(false);
  const [item, setItem] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState("1");
  const [dataTable1, setTable1] = useState(null);
  const [code, onCodeChange] = State("");
  const [name, onNameChange] = State("");
  const [id_type, onIdTypeChange] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoad(true);

    const { error, feedback } = await addItem({ id_type, code, name });
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
      // getAllTypes()
    }
    setLoad(false);
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
        setKategori(() => {
          return data;
        });

      }
    });
  }, [getTypes]);

  const getAllItems = useCallback(
    (id = selectedKategori) => {
      getItems({ id_type: id }).then(({ data, error }) => {
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

          const total = data.length;

          const table1 = data.splice(0, Math.ceil(total / 2));
          setTable1(() => {
            return table1;
          });

        }
      });
    },
    [getTypes]
  );

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
      const { error, feedback } = await updateItem({
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
        getAllItems(selectedKategori);
      }
    }
  }

  useEffect(() => {
    getAllTypes();
    getAllItems(selectedKategori);
  }, [getAllTypes, getAllItems]);

  const onKategoriChange = (e) => {
    setSelectedKategori(() => {
      return e.target.value;
    });
    getAllItems(e.target.value);
  };

  if (!(kategori && item)) {
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
    <section className="manajemen-barang-page p-3">
      <h1 className="text-center">Manajemen Barang</h1>

      <div className="barang-list card mt-3 p-3">
        <h2 className="p-3">List Barang</h2>
        <div className="mx-3 p-3">
          <select
            className="form-select"
            onChange={onKategoriChange}
            placeholder="pilih kategori"
          >
            <option value="1">Pilih Kategori Barang</option>
            {kategori.map((k) => (
              <option key={k.id} value={k.id}>
                {k.code} - {k.name}
              </option>
            ))}
          </select>
        </div>

        <div className="kategori-table d-flex justify-content-evenly mt-2">
          <div className="">
            <table className="table border border-black text-center">
              <thead>
                <tr>
                  <th scope="col">Kode Barang</th>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTable1.map((d) => (
                  <tr key={d.code}>
                    <th scope="row">{d.code}</th>
                    <td>{d.name}</td>
                    <td>
                      <button id={d.id} onClick={onUpdate} className="btn btn-warning">
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
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {item.map((i) => (
                  <tr key={i.code}>
                    <th scope="row">{i.code}</th>
                    <td>{i.name}</td>
                    <td>
                      <button id={i.id} onClick={onUpdate} className="btn btn-warning">
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
        <h2>Tambah Barang Baru</h2>
        <form className="p-3" onSubmit={onSubmitHandler} autoComplete="off">
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Kode Barang"
                value={code}
                onChange={onCodeChange}
                autoComplete="off"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Barang"
                value={name}
                onChange={onNameChange}
                autoComplete="off"
              />
            </div>
            <div className="col">
              <select className="form-select" onChange={onIdTypeChange}>
                <option value="">Pilih Kategori</option>
                {kategori.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.code} - {k.name}
                  </option>
                ))}
              </select>
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

export default ManajemenBarangPage;
