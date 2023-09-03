import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { putAccessToken } from "./utils/apis";
import loading from "./images/loading.gif";

// pages
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ManajemenAkunPage from "./pages/sarpras/ManajemenAkunPage";
import ManajemenKategoriPage from "./pages/sarpras/ManajemenKategoriPage";
import ManajemenBarangPage from "./pages/sarpras/ManajemenBarangPage";
import ManajemenJurusanPage from "./pages/sarpras/ManajemenJurusanPage";
import PengadaanBarangPage from "./pages/sarpras/PengadaanBarangPage";
import PendistribusianBarangPage from "./pages/sarpras/PendistribusianBarangPage";
import RiwayatPengadaanPage from "./pages/sarpras/RiwayatPengadaanPage";
import TotalInventarisPage from "./pages/sarpras/TotalInventarisPage";
import ManajemenRuaganPage from "./pages/jurusan/ManajemenRuaganPage";
import DistribusiJurusanPage from "./pages/jurusan/DistribusiJurusanPage";
import ManajemenKondisiBarangPage from "./pages/jurusan/ManajemenKondisiBarangPage";
import InventarisJurusanPage from "./pages/jurusan/InventarisJurusanPage";
import NotFoundPage from "./pages/NotFoundPage";

// component
import Navigation from "./components/navigation/Navigation";
import Sidebar from "./components/navigation/Sidebar";

function App() {
  const [authedUser, setAuthedUser] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );
  const [initializing, setInitializing] = useState(false);
  const [hiddenBar, setHiddenBar] = useState(false);
  const [hideAdminList, setHideAdminList] = useState(false);
  const [hideAdminRole, setHideAdminRole] = useState(false);
  const navigate = useNavigate();

  async function onLoginSuccess({ accessToken, user, workUnit }) {
    setInitializing(true);
    putAccessToken(accessToken);
    setAuthedUser(() => {
      return { user, workUnit };
    });
    localStorage.setItem("auth", JSON.stringify({ user, workUnit }));
    setInitializing(false);
  }

  const onLogout = () => {
    setAuthedUser(() => {
      return null;
    });
    localStorage.clear();
    navigate("/");
  };

  const toggleHiddenBar = () => {
    setHiddenBar(!hiddenBar);
  };

  const toggleHideAdminList = () => {
    setHideAdminList(!hideAdminList);
  };

  const toggleHideAdminRole = () => {
    setHideAdminRole(!hideAdminRole);
  };

  if (initializing) {
    return (
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src={loading}
        alt="loading"
      />
    );
  }

  return (
    <div className="App d-flex">
      {authedUser ? (
        <aside>
          <Sidebar auth={authedUser} hidden={hiddenBar} toggleHidden={toggleHiddenBar} />
        </aside>
      ) : (
        ""
      )}

      <div className="content">
        {authedUser ? (
          <header>
            <Navigation
              auth={authedUser}
              hidden={hiddenBar}
              toggleHidden={toggleHiddenBar}
              logout={onLogout}
            />
          </header>
        ) : (
          ""
        )}

        <main style={{ backgroundColor: authedUser ? "#f4f8f9" : "#3ddc97" }}>
          {authedUser ? (
            authedUser.user == "admin sarana prasarana" ? (
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/home" element={<DashboardPage />} />
                <Route
                  path="/manajemen_akun"
                  element={
                    <ManajemenAkunPage
                      hideAdminList={hideAdminList}
                      toggleHideAdminList={toggleHideAdminList}
                      hideAdminRole={hideAdminRole}
                      toggleHideAdminRole={toggleHideAdminRole}
                    />
                  }
                />
                <Route
                  path="/manajemen_kategori"
                  element={<ManajemenKategoriPage />}
                />
                <Route
                  path="/manajemen_barang"
                  element={<ManajemenBarangPage />}
                />
                <Route
                  path="/manajemen_jurusan"
                  element={<ManajemenJurusanPage />}
                />
                <Route
                  path="/pengadaan_barang"
                  element={<PengadaanBarangPage />}
                />
                <Route
                  path="/pendistribusian_barang"
                  element={<PendistribusianBarangPage />}
                />
                <Route
                  path="/riwayat_pengadaan"
                  element={<RiwayatPengadaanPage />}
                />
                <Route
                  path="/total_inventaris"
                  element={<TotalInventarisPage />}
                />
                <Route
                  path="/manajemen_ruangan"
                  element={<ManajemenRuaganPage />}
                />
                <Route
                  path="/manajemen_kondisi_barang"
                  element={<ManajemenKondisiBarangPage />}
                />
                <Route
                  path="/inventaris_jurusan"
                  element={<InventarisJurusanPage />}
                />
                <Route path="*" element={<NotFoundPage logout={onLogout} />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/home" element={<DashboardPage />} />
                <Route
                  path="/manajemen_ruangan"
                  element={<ManajemenRuaganPage />}
                />
                <Route
                  path="/manajemen_kondisi_barang"
                  element={<ManajemenKondisiBarangPage />}
                />
                <Route
                  path="/inventaris_jurusan"
                  element={<InventarisJurusanPage />}
                />
                <Route
                  path="/distribusi_jurusan"
                  element={<DistribusiJurusanPage />}
                />
                <Route path="*" element={<NotFoundPage logout={onLogout} />} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route
                path="/"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route
                path="/login"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>
        <footer>Aplikasi Inventaris 2023</footer>
      </div>
    </div>
  );
}

export default App;
