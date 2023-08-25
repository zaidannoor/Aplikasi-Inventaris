import React from 'react';
import PropTypes from 'prop-types';
import State from '../../hooks/State';

function LoginInput ({login}) {
  const [username, onUsernameChangeHandler] = State('');
  const [password, onPasswordChangeHandler] = State('');


  function onSubmitHandler(event) {
    event.preventDefault();

    login({
      username: username,
      password: password,
    });
  }

  return (
    <form className='note-input' onSubmit={onSubmitHandler}>
      <div className='login-row m-2'>
        <input className='form-control my-4 mx-auto shadow-none border-0 border-bottom border-dark rounded-0 rounded-top' type="text" placeholder='Username' value={username} onChange={onUsernameChangeHandler} />
        <input className='form-control my-4 mx-auto shadow-none border-0 border-bottom border-dark rounded-0 rounded-top' type="password" placeholder='Password' value={password} onChange={onPasswordChangeHandler} />
      </div>
      <button className='btn btn-primary m-2'>Masuk</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput;