import React, { useEffect, useState } from 'react';
import './list.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Modal = ({ show, onClose, onConfirm }) => {
  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content" style={{ width: "30%" }}>
        <p>Are you sure you want to delete?</p>
        <div className='modal-option'>
          <button style={{ padding: '0.3rem' }} onClick={onConfirm}>Yes</button>
          <button style={{ padding: '0.3rem' }} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default function ContactList() {
  const navigate = useNavigate();
  const [url, updateUrl] = useState('http://localhost:9009/total/contact');
  const [getData, updateGetData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteUrl, updateDeleteUrl] = useState('http://localhost:9009/contact/delete');
  const [deleteContact, updatedeleteContact] = useState('');
  const [search, updateSearch] = useState('');
  const [listApi, updateListApi] = useState(true)

  function callApi() {
    if (listApi === true) {
      axios.get(url)
        .then(response => {
          if (response.data.is_success === true) {
            updateGetData(response.data.data);
            updateListApi(false)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  function handleUpdate(e, id) {
    e.preventDefault();
    navigate('/contact/update/' + id, { state: { userId: id } });
  }

  function handleDelete(e, id) {
    e.preventDefault();
    setShowModal(true);
    setSelectedUserId(id);
  }

  const handleConfirmDelete = () => {
    axios.post(deleteUrl, { 'id': selectedUserId })
      .then(response => {
        if (response.data.is_success === true) {
          updatedeleteContact(response.data.data);
          window.location.reload();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };



  function doSearch() {
    if (search && search.length) {

      axios.post('http://localhost:9009/contact/search', { 'search': search })
        .then(response => {
          console.log(response.data, 'response is')
          if (response.data.is_success === true) {
            updateGetData(response.data.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    else {
      updateListApi(true)
    }
  }

  useEffect(() => {
    // Call the API for searching
    doSearch();
  }, [search]);

  useEffect(() => {
    // Update table data when getData changes
    if (listApi === true) {
      callApi();
    }
  }, [getData, listApi]);
  return (
    <>
      <div className='container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Contact List</h2>
        <Link className="linkuser" style={{ textDecoration: 'none' }} to="/contact/add">
          Add Contact <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="input-group" style={{ display: 'flex', marginLeft: "60px", justifyContent: 'center', alignItems: 'center', width: '20%' }}>
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fa fa-search" style={{ marginTop: '4px', marginBottom: '4px' }}></i></span>
        </div>

        <input type="text" className="form-control field" onChange={(e) => updateSearch(e.target.value)} placeholder="Search..." />
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email Address</th>
              <th>Contact No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getData && getData.map((value, key) => (
              <tr key={key}>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>
                  <i className="fa fa-edit" style={{ fontSize: "24px", marginRight: "10px" }} onClick={(e) => handleUpdate(e, value._id)}></i>
                  <i className="fa fa-trash" style={{ fontSize: "24px", color: "red" }} onClick={(e) => handleDelete(e, value._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      <Modal
        show={showModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>

  );
}
