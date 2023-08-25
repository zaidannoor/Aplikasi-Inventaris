// React
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import loading from "../images/loading.gif";
import Swal from "sweetalert2";
// API
import { login } from "../utils/apis";

// Component
import LoginInput from "../components/signIn/LoginInput";

function LoginPage({ loginSuccess }) {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  async function onLogin({ username, password }) {
    setLoad(true);
    const { error, data } = await login({ username, password });
    setLoad(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    } else {
      await loginSuccess(data);
      navigate("/");
    }
  }

  if (load) {
    return (
      <img
        className="position-absolute top-50 start-50 translate-middle"
        src={loading}
        alt="loading"
      />
    );
  }

  return (
    <section className="login-section card shadow text-center">
      <h1 className="input-title text-center">Selamat Datang</h1>
      <LoginInput login={onLogin} />
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
