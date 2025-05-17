import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [productname, setproductname] = useState('');
    const [productcategory, setproductcategory] = useState('');
    const [productsubcategory, setproductsubcategory] = useState('');
    const [productdescription, setproductdescription] = useState('');
    const [productprice, setproductprice] = useState('');
    const [productqty, setproductqty] = useState('');
    const [productimage, setproductimage] = useState({ preview: '', data: '' });
    const [formname, setformname] = useState('');
    const [buttonname, setbuttonname] = useState('');
    const [formerror, setformerror] = useState('');
    const [categories, setcategories] = useState([]);
    const [subcategories, setsubcategories] = useState([]);

    console.log(location.pathname.split('/'));

    useEffect(() => {
        if (location.pathname.split('/')[2] == "addproduct") {
            setformname('Add New Product');
            setbuttonname('Add Product');
        }

        if (location.pathname.split('/')[2] == "editproduct") {
            setformname('Update Product Form');
            setbuttonname('Update Product');

            fetch('http://localhost:5000/products/singleproductlist/' + params.id).then(response => response.json()).then(response => {
                console.log(response.message[0]);
                setproductname(response.message[0].product_name);
                setproductcategory(response.message[0].category_id);
                setproductsubcategory(response.message[0].subcategory_id);
                setproductdescription(response.message[0].product_description);
                setproductprice(response.message[0].product_price);
                setproductqty(response.message[0].product_qty);
                setproductimage({ preview: response.message[0].product_image, data: response.message[0].product_image });
            });
        }

        getcategories();
        getsubcategories();
    }, [])

    const getcategories = () => {

        axios.get('http://localhost:5000/categories/categorylist/').then((response) => {
            console.log(response.data.message);

            setcategories(response.data.message);
        });
    };

    const getsubcategories = () => {
        axios.get('http://localhost:5000/subcategories/subcategorylist/').then((response) => {
            console.log(response.data.message);

            setsubcategories(response.data.message);
        });
    };

    const handleproductname = (event) => {
        setproductname(event.target.value)
    }
    const handleproductcategory = (event) => {
        const selectedCategory = event.target.value;
        setproductcategory(selectedCategory);

        if (selectedCategory) {
            axios.get('http://localhost:5000/subcategories/subcategoryforcategory/' + selectedCategory).then(response => 
                setsubcategories(response.data.message)
            )
        }

    }

    const handleproductsubcategory = (event) => {
        setproductsubcategory(event.target.value)
    }

    const handleproductdescription = (event) => {
        setproductdescription(event.target.value)
    }

    const handleproductqty = (event) => {
        setproductqty(event.target.value)
    }

    const handleproductprice = (event) => {
        setproductprice(event.target.value)
    }
    const handlefilechange = (event) => {
        // setimg(event.target.files[0]);

        // const img = {
        //     preview: URL.createObjectURL(event.target.files[0]),
        //     data: event.target.files[0],
        // }
        // setimage(img);

        const file = event.target.files[0];

        if (file) {
            const img = {
                preview: URL.createObjectURL(file),
                data: file
            }

            setproductimage(img);
        }


    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        // setformerror(''); // Clear any previous errors

        const formData = new FormData();
        formData.append('product_name', productname);
        formData.append('category_id', productcategory);
        formData.append('subcategory_id', productsubcategory);
        formData.append('product_description', productdescription);
        formData.append('product_price', productprice);
        formData.append('product_qty', productqty);
        formData.append('productImage', productimage.data);

        console.log(formData);

        if (productname == "") {
            setformerror("Name is required! Please enter product name.");
        } else if (productcategory == "") {
            setformerror("Category is required! Please enter product category.");
        } else if (productsubcategory == "") {
            setformerror("Sub Category is required! Please enter product sub category.");
        } else if (productdescription == "") {
            setformerror("Description required! Please enter product description.");
        } else if (productprice == "") {
            setformerror("Price is required! Please enter product price.");
        } else if (location.pathname.split('/admin/')[1] == "editproduct") {
            try {
                const response = await fetch('http://localhost:5000/products/updateproduct/' + params.id, {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    navigate('/admin/productlist');
                }
            } catch (error) {
                console.error("Error updating product:", error);
                setformerror('An error occurred while updating. Please try again.');
            }
        } else if (location.pathname.split('/admin/')[1] == 'addproduct') {
            try {
                const response = await fetch('http://localhost:5000/products/addproduct/', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data) {
                    //   alert('Product added successfully');

                    navigate('/admin/productlist');

                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while uploading the product');
            }
        }

    }
    return (
        <>
            <div id="form-top-container">
                <div id="form-container">
                    <div class="header-form">{formname}</div>
                    <form class="form">
                        <div className='formerror'>{formerror}</div>

                        <div class="input-box">
                            <label for="title">Product Name</label>
                            <input type="text" placeholder="Product Name" value={productname} onChange={handleproductname} />
                        </div>
                        <div class="input-box">
                            <select name="category_id" value={productcategory} onChange={handleproductcategory} required>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="input-box">
                            <select name="subcategory_id" value={productsubcategory} onChange={handleproductsubcategory} required>
                                <option value="">Select Subcategory</option>
                                {subcategories.map(sub => (
                                    <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_description}</option>
                                ))}
                            </select>
                        </div>
                        <div class="input-box">
                            <label for="description">Product Description</label>
                            <textarea type="text" placeholder="Product Description" value={productdescription} onChange={handleproductdescription} />
                        </div>
                        <div class="input-box">
                            <label for="price">Product Quantity</label>
                            <input type="text" placeholder="Product Quantity" value={productqty} onChange={handleproductqty} />
                        </div>
                        <div class="input-box">
                            <label for="price">Product Price</label>
                            <input type="text" placeholder="Product Price" value={productprice} onChange={handleproductprice} />
                        </div>
                        <div class="input-box">
                            <label for="image">Upload File</label>
                            <input type="file" onChange={handlefilechange} />
                            {productimage.preview && <img src={productimage.preview} width='100' height='100' alt='Preview' />}
                        </div>

                        <input type='submit' value={buttonname} onClick={handlesubmit} />
                    </form>
                </div>
            </div >
        </>
    )
}

export default AddProduct;