import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import "./add.css";
import img from "./icon.jpeg";
import { Link, useNavigate } from 'react-router-dom';

const ContactAdd = () => {
  const navigate = useNavigate()
  const [url, updateUrl] = useState('http://localhost:9009/contact/add');
  const [userAdd, updateUserAdd] = useState('');
  const [apiCall, updateApiCall] = useState(false)



  function callApi() {
    if (apiCall == true) {
    let user_data = { 'name': userAdd.name, 'email': userAdd.email, 'phone': userAdd.phone };

    axios.post(url, user_data)
      .then(response => {
        console.log('response is ', response);
        if (response.data.is_success === true) {
          localStorage.setItem('id', response.data.id);
          updateApiCall(false);
          setTimeout(() => {

            navigate('/list')
          }, 2000);
        }else{
          updateApiCall(true)
        }
      })
      .catch(error => {
        console.error('Error:', error); // Handle any errors
      });
    }
  }

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email Address is required';
    }
    if (!values.phone) {
      errors.phone = 'Phone Number is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '' },
    validate,
    onSubmit: (values) => {
      console.log(values);
      updateUserAdd(values);
      updateApiCall(true)
    }
  });
  useEffect(() => {
    callApi();
  }, [apiCall]); 

  const handleClick=()=>{
    navigate('/list')
  }

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={img} alt="User Logo" />
      </div>
      <div className="text-center mt-4 name">
        ADD USER
      </div>
      <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="text" name="name" onChange={formik.handleChange} placeholder="Username" />
        </div>
        <p>{formik.errors.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-envelope"></span>
          <input type="email" name="email" onChange={formik.handleChange} placeholder="Email" />
        </div>
        <p>{formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-phone"></span>
          <input type="text" name="phone" onChange={formik.handleChange} placeholder="Phone Number" />
        </div>
        <p>{formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}</p>
        <button className="btn mt-3" type="submit">ADD</button>
        <button className="btn mt-3" onClick={handleClick}>BACK</button>

      </form>
    </div>
  );
}

export default ContactAdd;
