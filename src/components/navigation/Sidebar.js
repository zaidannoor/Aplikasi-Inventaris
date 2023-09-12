import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Sidebar({ auth, hidden, toggleHidden }) {
  return (
    <section className="sidebar" style={{ height: "100%" }}>
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
          className="justify-content-end btn-side d-none"
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
        <hr></hr>
        <ul
          className="nav nav-pills flex-column mb-auto"
          style={{ marginTop: 15, visibility: hidden ? "hidden" : "visible" }}
        >
          {auth.user == "admin sarana prasarana" ? (
            <>
              <li className="nav-item mb-1">
                <Link to="/home" className="nav-link text-white">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_jurusan" className="nav-link text-white">
                  Manajemen Jurusan
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_akun" className="nav-link text-white">
                  Manajemen Akun
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_kategori" className="nav-link text-white">
                  Manajemen Kategori
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_barang" className="nav-link text-white">
                  Manajemen Barang
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/pengadaan_barang" className="nav-link text-white">
                  Pengadaan Barang
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/riwayat_pengadaan" className="nav-link text-white">
                  Riwayat Pengadaan
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="/pendistribusian_barang"
                  className="nav-link text-white"
                >
                  Pendistribusian Barang
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="/riwayat_distribusi"
                  className="nav-link text-white"
                >
                  Riwayat Distribusi
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/total_inventaris" className="nav-link text-white">
                  Total Inventaris
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mb-1">
                <Link to="/home" className="nav-link text-white">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_ruangan" className="nav-link text-white">
                  Manajemen Ruangan
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/distribusi_jurusan" className="nav-link text-white">
                  Distribusi Barang
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/manajemen_kondisi_barang" className="nav-link text-white">
                  Manajemen Kondisi Barang
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/inventaris_jurusan" className="nav-link text-white">
                  Inventaris Jurusan
                </Link>
              </li>
              
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
