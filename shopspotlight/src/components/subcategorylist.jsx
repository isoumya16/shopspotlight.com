import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Subcategorylist = () => {
  const [subcategories, setsubcategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getsubcategorylist();
    }, []);

    const getsubcategorylist = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/subcategories/subcategorylist/`).then((response) => {
            setsubcategories(response.data.message);
        })
    };

    const handlesubcategorydelete = (id) => {
      axios.delete(`${process.env.REACT_APP_API_URL}/subcategories/deletesubcategory/${id}`).then((response) => {
          getsubcategorylist();
      })
  };

  const handlesubcategoryedit = (id) => {
      navigate('/admin/editsubcategory/' + id);
  };

  return (
    <>
     <table border={1} width="100%">
                <tr>
                    <th>Sub Category Id</th>
                    <th>Category Name</th>
                    <th>Sub Category Description</th>
                    <th>Sub Category Image</th>
                    <th>Action</th>
                </tr>
                {subcategories && subcategories.map((subcategory) => (
                    <tr>
                        <td>{subcategory.subcategory_id}</td>
                        <td>{subcategory.category_name}</td>
                        <td>{subcategory.subcategory_description}</td>
                        <td><img src={subcategory.subcategory_image} height="50px" width="50px" alt="" /></td>
                        <td>
                            {/* <input type="button" value="Delete" onClick={() => handleproductdelete(product.id)} />
                            <input type="button" value="Edit" onClick={() => handleproductedit(product.id)} /> */}
    
                            <li onClick={() => handlesubcategoryedit(subcategory.subcategory_id)}>
                                <AiOutlineEdit />
                            </li>
                            <li onClick={() => handlesubcategorydelete(subcategory.subcategory_id)}>
                                <AiOutlineDelete />
                            </li>
                        </td>
                    </tr>
                )
                )}
            </table>

            <button className='add' onClick={()=>{navigate('/admin/addsubcategory')}}>+</button>

            </>
  )
}

export default Subcategorylist;