import React, { useContext, useState } from "react";
import "./loginsignup.css";
import axios from "axios";
import { useUserContext } from "../../context/userContext";

const LoginSignup = ({setShowLogin, setUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const {setCurrentUser} = useUserContext()

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,{
        email: formData.email,
        password: formData.password,
      })

      if (response.data.token) {
        const user = {
            _id:response.data._id,
            email:response.data.email,
            token:response.data.token
        }
        setCurrentUser(user)
        setUser(user)
        setShowLogin(false)
        alert("Login success", user)
      }
      
    } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,{
            name:formData.name,
            email: formData.email,
            password: formData.password,
          })

          if (response.data.token) {
            const user = {
                _id:response.data._id,
                email:response.data.email,
                token:response.data.token
            }
            setCurrentUser(user)
            setUser(user)
            setShowLogin(false)
            alert("User Registered Successfully")
          }

    }
  };
  return (
    <div className="container" >
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" className="link" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
