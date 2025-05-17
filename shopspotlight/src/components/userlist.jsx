import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/userlist.css';

const Userlist = () => {
  const [usersdata, setusersdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getuserslist();
  }, []);

  const getuserslist = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/userlist/`).then((response) => {
      setusersdata(response.data.message);
    })
  };

  const handleuserdelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteuser/${id}`).then((response)=>{
        getuserslist();
    })
};

const handleuseredit = (id) => {
    navigate('/admin/edituser/'+id);
};

  return (
    <table border={1} width="100%">
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>User Access</th>
        <th>Email</th>
        <th>Mobile No.</th>
        <th>User Image</th>
        <th>Action</th>
      </tr>
      {usersdata && usersdata.map((user) => (
        <tr>
          <td>{user.user_id}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.useraccess}</td>
          <td>{user.email}</td>
          <td>{user.mobileno}</td>
          <td><img src={user.user_image} height="50px" width="50px" alt="" /></td>
          <td>
            <input type="button" value="Delete" onClick={() => handleuserdelete(user.user_id)} />
            <input type="button" value="Edit" onClick={() => handleuseredit(user.user_id)} />
          </td>
        </tr>
      )
      )}
    </table>
  )
}

export default Userlist;