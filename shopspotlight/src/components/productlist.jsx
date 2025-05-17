import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Productlist = () => {
    const [productsdata, setproductsdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getproductslist();
    }, []);

    const getproductslist = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/productlist/`).then((response) => {
            setproductsdata(response.data.message);
        })
    };

    const handleproductdelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/products/deleteproduct/${id}`).then((response) => {
            getproductslist();
        })
    };

    const handleproductedit = (id) => {
        navigate('/admin/editproduct/' + id);
    };

    return (
        <>
            <table border={1} width="100%">
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Category Name</th>
                    <th>Sub Category Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                    <th>Action</th>
                </tr>
                {productsdata && productsdata.map((product) => (
                    <tr>
                        <td>{product.product_id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.category_name}</td>
                        <td>{product.subcategory_description}</td>
                        <td>{product.product_description}</td>
                        <td>{product.product_price}</td>
                        <td><img src={product.product_image} height="50px" width="50px" alt="" /></td>
                        <td>
                            {/* <input type="button" value="Delete" onClick={() => handleproductdelete(product.id)} />
                        <input type="button" value="Edit" onClick={() => handleproductedit(product.id)} /> */}

                            <li onClick={() => handleproductedit(product.product_id)}>
                                <AiOutlineEdit />
                            </li>
                            <li onClick={() => handleproductdelete(product.product_id)}>
                                <AiOutlineDelete />
                            </li>
                        </td>
                    </tr>
                )
                )}
            </table>


            <button className='add' onClick={() => { navigate('/admin/addproduct') }}>+</button>

        </>
    )
}

export default Productlist;