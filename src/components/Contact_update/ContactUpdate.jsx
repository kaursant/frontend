import "../Contact_add/add.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import img from "../Contact_add/icon.jpeg";

export default function ContactUpdate () {
    const navigate = useNavigate();

    const [updateUser, setUpdateUser] = useState({});

    const location = useLocation();
    const userId = location.state ? location.state.userId : null;

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone:''
        },
   
        onSubmit: (values) => {
            handleFormSubmit(values);
        },
    });

    const contactApi = () => {
        axios.post(`http://localhost:9009/contact/detail/${userId}`,{'id': userId})
            .then(response => {
                if (response.data.is_success === true) {
                    const contactData = response.data.data;
    
                    formik.setValues({
                        name: contactData.name || '',
                        email: contactData.email || '',
                        phone: contactData.phone || ''
                    });
                    setUpdateUser(contactData);
                } else {
    
                    console.error('Error:', response.data.error);
                  
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    

    useEffect(() => {
        contactApi();
    }, [userId]);

    const handleFormSubmit = (values) => {
        axios.post(`http://localhost:9009/contact/update/${userId}`, { 'id': userId, ...values })
            .then(response => {
                console.log(response.data);
                setUpdateUser({});
           
                setTimeout(() => {
                    navigate('/list');
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const handleClick=()=>{
        navigate('/list')
      }

  return (
     <div className="wrapper">
      <div className="logo">
        <img src={img} alt="User Logo" />
      </div>
      <div className="text-center mt-4 name">
        UPDATE USER
      </div>
      <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="text" name="name"  value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Username" />
        </div>

        <div className="form-field d-flex align-items-center">
          <span className="fas fa-envelope"></span>
          <input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur}  onChange={formik.handleChange} placeholder="Email" />
        </div>

        <div className="form-field d-flex align-items-center">
          <span className="fas fa-phone"></span>
          <input type="text" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Phone Number" />
        </div>

        <button className="btn mt-3" type="submit">UPDATE</button>
        <button className="btn mt-3" onClick={handleClick}>BACK</button>

      </form>
    </div>
  )
}
