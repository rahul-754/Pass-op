import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('http://localhost:4002/passwords');
      setPasswordArray(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyText = (text) => {
    toast('🦄 Coppied😎', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4002/submit', formData);
      if (response.status === 201) {
        toast('Password saved successfully!', { type: 'success' });
        setPasswordArray([...passwordArray, formData]);
        setFormData({ site: "", username: "", password: "" });
        fetchPasswords();  // Fetch the updated passwords list after adding a new one
      } else {
        toast('Error submitting form', { type: 'error' });
      }
    } catch (error) {
      toast('Error submitting form', { type: 'error' });
    }
  };

  const deletePassword = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4002/passwords/${id}`);
      console.log(response.data)
      if (response.status === 200) {
        toast('Password deleted successfully!', { type: 'success' });
        fetchPasswords(); // Fetch the updated passwords list after deleting one
      } else {
        toast('Error deleting password', { type: 'error' });
      }
    } catch (error) {
      toast('Error deleting password', { type: 'error' });
    }
  };

  const editPassword = async(id) => {
    // Implement edit functionality
    console.log('Editing password with ID:', id); // Add this line to debug
    const response = await axios.get(`http://localhost:4002/passwords/${id}`);
    const passwordData = response.data;
    setFormData({ site: response.data.site, username: response.data.username, password: response.data.password });
    deletePassword(id)
}

  return (
    <div className="mx-auto mycontainer">
      <h1 className="text-2xl font-bold text-center">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </h1>
      <p className="text-green-900 text-lg text-center">
        Your Own Password Manager
      </p>
      <div className="text-black flex flex-col p-4 gap-6 text-center">
        <form onSubmit={handleSubmit}>
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            placeholder="Enter website name"
            value={formData.site}
            onChange={handleChange}
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-7">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter user name"
              value={formData.username}
              onChange={handleChange}
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <span
                className="absolute right-[-11px] top-[-14px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  className="p-5 w-16 h-16"
                  src={showPassword ? "icons/invisible.png" : "icons/eye.png"}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </form>
        <div className="passwords">
          <h1>Your Passwords</h1>
          <table className="table-auto w-full">
            <thead className="bg-green-800 text-white">
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="flex flex-row justify-center gap-4">{item.site}
                    <div className="size- cursor-pointer">
                      <button onClick={() => copyText(item.site)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                        ></lord-icon>
                      </button>
                    </div>
                  </td>
                  <td className="gap-4 my-2">{item.username}
                    <button onClick={() => copyText(item.username)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover"
                      ></lord-icon>
                    </button>
                  </td>
                  <td>{item.password}
                    <button onClick={() => copyText(item.password)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover"
                      ></lord-icon>
                    </button>
                  </td>
                  <td>
                    <div className="">
                      <button className="cursor-pointer" onClick={() => editPassword(item._id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/vzolctzz.json"
                          trigger="hover"
                        ></lord-icon>
                      </button>
                      <button className="cursor-pointer" onClick={() => deletePassword(item._id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                        ></lord-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Manager;
