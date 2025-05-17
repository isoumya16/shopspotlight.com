import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../css/categorylist.css';

const Categorylist = () => {
  const [categories, setcategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getcategorylist();
    }, []);

    const getcategorylist = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/categorylist/`).then((response) => {
            setcategories(response.data.message);
        })
    };

    const handlecategorydelete = (id) => {
      axios.delete(`${process.env.REACT_APP_API_URL}/categories/deletecategory/${id}`).then((response) => {
          getcategorylist();
      })
  };

  const handlecategoryedit = (id) => {
      navigate('/admin/editcategory/' + id);
  };

  return (
    <>
     <table border={1} width="100%">
                <tr>
                    <th>Id</th>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Category Image</th>
                    <th>Action</th>
                </tr>
                {categories && categories.map((category) => (
                    <tr>
                        <td>{category.category_id}</td>
                        <td>{category.category_name}</td>
                        <td>{category.category_description}</td>
                        <td> <img src={category.category_image} height="50px" width="50px" alt="" /></td>
                        <td>
                            {/* <input type="button" value="Delete" onClick={() => handleproductdelete(product.id)} />
                            <input type="button" value="Edit" onClick={() => handleproductedit(product.id)} /> */}
    
                            <li onClick={() => handlecategoryedit(category.category_id)}>
                                <AiOutlineEdit />
                            </li>
                            <li onClick={() => handlecategorydelete(category.category_id)}>
                                <AiOutlineDelete />
                            </li>
                        </td>
                    </tr>
                )
                )}
            </table>

            <button className='add' onClick={()=>{navigate('/admin/addcategory')}}>+</button>
            </>
  )
}

export default Categorylist;