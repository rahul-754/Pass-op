import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswordArray(passwords);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyText = (text) => {
    toast('🦄 Wow so easy!', {
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
  }

  const savePasswords = async() => {
    // const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }]; // Include UUID for password
    // if (form.site.length > 1 && form.username.length > 1) { // Don't check password length
    //   setPasswordArray(updatedPasswords);
    //   localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    // } else {
    //   alert("Size must be greater than one");
    // }


    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordArray),
    });

    setForm({ site: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const deletePassword = (id) =>{
    let newPasswordArray = passwordArray.filter(item=>{
      return item.id!=id;
    });
    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords",JSON.stringify(newPasswordArray));
    
    console.log("deleting password with id "+id);
  }
  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);

    let newPasswordArray = passwordArray.filter(item=>{
      return item.id!=id;
    });
    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords",JSON.stringify(newPasswordArray));
  
    
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password
      });
    } else {
      console.log("Password not found with id " + id);
    }
  };
  
  
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
        <input
          className="rounded-full border border-green-500 w-full p-4 py-1"
          placeholder="Enter website name"
          value={form.site}
          onChange={handleChange}
          type="text"
          name="site"
        />
        <div className="flex w-full justify-between gap-7">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            placeholder="Enter user name"
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
          />
          <div className="relative">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter password"
              value={form.password}
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
          onClick={savePasswords}
          className="bg-green-600 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Add Password
        </button>
        <div className="passwords">
          <h1>Your Passwords</h1>
          {passwordArray.length === 0 ? <div>No passwords to show</div> : (
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
                        <button className="cursor-pointer" onClick={()=>editPassword(item.id,form)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vzolctzz.json"
                            trigger="hover"
                          ></lord-icon>
                        </button>
                        <button className="cursor-pointer" onClick={()=>deletePassword(item.id)}>
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
          )}
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