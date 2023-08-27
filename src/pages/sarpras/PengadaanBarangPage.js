import React, { useState, useCallback, useEffect } from "react";
import { getTypes, getItems, procurement } from "../../utils/apis";
import State from "../../hooks/State";
import moment from "moment/moment";
import loading from "../../images/loading.gif";
import Swal from "sweetalert2";

function PengadaanBarangPage() {
  const [load, setLoad] = useState(false);

  const [quantity, onQuantityChange] = State("");
  const [types, setTypes] = useState(null);
  const [items, setItems] = useState(null);

  const [kategori, setKategori] = useState("1");
  const [tanggal, setTanggal] = useState();
  const [description, onDescChange] = State("");
  const [id_name_item, onItemChange] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoad(true);
    const { error, feedback } = await procurement({
      id_name_item,
      quantity,
      added_date: tanggal,
      description,
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
        setTypes(() => {
          return data;
        });

        setLoad(false);

      }
    });
  }, [getTypes]);

  const getAllItems = useCallback(
    (id = kategori) => {
      getItems({ id_type: id }).then(({ data, error }) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        } else {
          setItems(() => {
            return data;
          });

        }
      });
    },
    [getTypes]
  );

  const onKategoriChange = (e) => {
    setKategori(e.target.value);
    getAllItems(e.target.value);
  };

  const onTanggalChange = (e) => {
    setTanggal(e.target.value);
  };

  useEffect(() => {
    getAllTypes();
    getAllItems();
  }, [getAllTypes, getAllItems]);

  if (!(items && types)) {
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
    <section className="pengadaan-barang-page p-3">
      <h1 className="text-center">Pengadaan Barang</h1>
      <div className="card p-3 mt-3">
        <h2 className="text-center">Formulir Pengadaan Barang</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <select className="form-select" onChange={onKategoriChange}>
                <option value={null} hidden>
                  Pilih Kategori
                </option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code} - {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="jumlah barang"
                value={quantity}
                onChange={onQuantityChange}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <select className="form-select" onChange={onItemChange}>
                <option value={null} hidden>
                  Pilih Barang
                </option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.code} - {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <input
                type="date"
                className="form-control"
                placeholder="Tanggal"
                onChange={onTanggalChange}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <textarea
                type="text"
                className="form-control"
                placeholder="Keterangan"
                onChange={onDescChange}
              />
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

export default PengadaanBarangPage;
