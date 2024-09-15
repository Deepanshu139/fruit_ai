import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaFacebookF, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform your login validation or API call here
    if (email === 'admin@gmail.com' && password === '123') {


      localStorage.setItem('isLoggedIn', 'true');

      // Navigate to home page after successful login
      navigate('/home');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (

    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h5>Use email admin@gmail.com and  password = 123</h5> <br></br>
        <h2>Login</h2>
        <p>
          By signing in you are agreeing to our{' '}
          <a href="#">Term and privacy policy</a>
        </p>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="login-button">Login</button>

        <p>or connect with</p>
        <div className="social-login">
          <a href="#" className="social-icon facebook"><FaFacebookF /></a>
          <a href="#" className="social-icon instagram"><FaInstagram /></a>
          <a href="#" className="social-icon pinterest"><FaPinterestP /></a>
          <a href="#" className="social-icon linkedin"><FaLinkedinIn /></a>
        </div>
      </form>
    </div>
  );
};

export default Login;
