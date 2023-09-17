import React, { Component } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import logo from "../../images/logo.png";


function Sidebar({ auth, hidden, toggleHidden }) {
  return (
    <section className="sidebar" >
      <div
        className={
          hidden
            ? "d-flex flex-column p-3 text-dark hidden-none"
            : "d-flex flex-column p-3 text-dark"
        }
        style={{
          width: hidden ? "80px" : "230px",
          height: "100%",
          paddingTop: 60,
          backgroundColor: "#2fa97c",
        }}
      >
        
        <div
          onClick={toggleHidden}
          className="justify-content-end btn-side d-none mb-2"
        >
          {hidden ? (
            <button className="btn">
              <FaArrowRight
                style={{ minWidth: "30px", minHeight: "30px", color: "white" }}
              />
            </button>
          ) : (
            <button className="btn">
              <FaArrowLeft
                style={{ minWidth: "30px", minHeight: "30px", color: "white" }}
              />
            </button>
          )}
        </div>
        <img src={logo} className="logo" alt="SMK Muhamadiyah 3 Yogyakarta" />
        <hr></hr>
        <ul
          className="nav nav-pills flex-column mb-auto"
          style={{ marginTop: 15, visibility: hidden ? "hidden" : "visible" }}
        >
          {auth.user == "admin sarana prasarana" ? (
            <>
              <li className="nav-item mb-1">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_jurusan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Jurusan
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_akun"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Akun
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_kategori"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Kategori
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_barang"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Barang
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/pengadaan_barang"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Pengadaan Barang
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/riwayat_pengadaan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Riwayat Pengadaan
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/pendistribusian_barang"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Pendistribusian Barang
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/riwayat_distribusi"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Riwayat Distribusi
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/total_inventaris"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Total Inventaris
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mb-1">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_ruangan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Ruangan
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/distribusi_jurusan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Distribusi Barang
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/manajemen_kondisi_barang"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Manajemen Kondisi Barang
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/inventaris_ruangan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Inventaris Ruangan
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink
                  to="/inventaris_jurusan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-white active-link"
                      : "nav-link text-white"
                  }
                >
                  Inventaris Jurusan
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
