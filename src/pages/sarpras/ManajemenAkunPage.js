import React, { useCallback, useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  getWorkunits,
  getUsers,
  addUser,
  resetPassword,
} from "../../utils/apis";
import loading from "../../images/loading.gif";
import State from "../../hooks/State";
import Swal from "sweetalert2";

function ManajemenAkunPage({ hideAdminList, toggleHideAdminList }) {
  const [load, setLoad] = useState(false);
  const [workunits, setWorkunits] = useState(null); // array of object type
  const [users, setUsers] = useState(null); // array of object type
  const [username, onUsernameChangeHandler] = State("");
  const [id_work_unit, onWorkUnitChange] = State("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoad(true);

    const { error, data } = await addUser({ username, id_work_unit });
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
        text: "Your Password is " + data.password,
      });
      getAllUsers();
    }
    setLoad(false);
  }

  async function onReset(event) {
    event.preventDefault();
    setLoad(true);
    const id = event.target.id
    const { error, data } = await resetPassword({ id });
    console.log(data)
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
        text: 'Your New Password is ' + data.password,
      });
      getAllUsers()
    }
    setLoad(false);
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
      }
    });
  }, [getWorkunits]);

  const getAllUsers = useCallback(() => {
    getUsers().then(({ data, error }) => {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else {
        setUsers(() => {
          return data;
        });
      }
    });
  }, [getWorkunits]);

  useEffect(() => {
    getAllWorkunits();
    getAllUsers();
  }, [getAllWorkunits, getAllUsers]);

  if (!(workunits && users)) {
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
    <section className="manajemen-akun-page p-3">
      <h1 className="text-center">Manajemen Akun Admin</h1>

      <div className="admin-list p-3 mt-3 card">
        <div className="d-flex justify-content-between">
          <h2>List Akun Admin</h2>
          <button className="btn">
            <FaAngleDown
              onClick={toggleHideAdminList}
              style={{ minWidth: "30px", minHeight: "30px" }}
            />
          </button>
        </div>

        <table className={hideAdminList ? "table d-none" : "table"}>
          <thead className="text-center">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Unit Kerja</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((u, i = 1) => (
              <tr key={++i}>
                <th scope="row">{++i}</th>
                <td>{u.username}</td>
                <td>{u.work_unit}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    id={u.uuid}
                    onClick={onReset}
                  >
                    Reset Password
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 card p-3">
        <h2>Tambah Admin Baru</h2>
        <form className="p-3" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Username admin"
                value={username}
                onChange={onUsernameChangeHandler}
              />
            </div>
            <div className="col">
              <select className="form-select" onChange={onWorkUnitChange}>
                <option value="">Pilih unit kerja</option>
                {workunits.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} - {w.name}
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

export default ManajemenAkunPage;
