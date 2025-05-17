import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddSubcategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [formname, setformname] = useState('');
    const [buttonname, setbuttonname] = useState('');
    const [formerror, setformerror] = useState('');
    const [productcategory, setproductcategory] = useState('');
    const [productsubcategoryimage, setproductsubcategoryimage] = useState({ preview: '', data: '' });
    const [productsubcategorydescription, setproductsubcategorydescription] = useState('');
    const [categories, setcategories] = useState([]);

    console.log(location.pathname.split('/'));   

    useEffect(() => {
        if (location.pathname.split('/')[2] == "addsubcategory") {
            setformname('Add New Sub Category');
            setbuttonname('Add Sub Category');
        }

        if (location.pathname.split('/')[2] == "editsubcategory") {
            setformname('Update Sub Category Form');
            setbuttonname('Update Sub Category');

            fetch('http://localhost:5000/subcategories/singlesubcategorylist/' + params.id).then(response => response.json()).then(response => {
                console.log(response.message[0]);
                setproductcategory(response.message[0].category_id);
                setproductsubcategorydescription(response.message[0].subcategory_description);
                setproductsubcategoryimage({ preview: response.message[0].subcategory_image, data: response.message[0].subcategory_image });
            });
        }

        getcategories();

    }, []);

    const getcategories = () => {

        axios.get('http://localhost:5000/categories/categorylist/').then((response) => {
            setcategories(response.data.message);
        })
    };

    const handleproductcategory = (event) => {
        setproductcategory(event.target.value)
    }
    const handleproductsubcategorydescription = (event) => {
        setproductsubcategorydescription(event.target.value)
    }

    const handlefilechange = (event) => {

        const file = event.target.files[0];

        if (file) {
            const img = {
                preview: URL.createObjectURL(file),
                data: file
            }

            setproductsubcategoryimage(img);
        }

    }

    const handlesubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('category_id', productcategory);
        formData.append('subcategory_description', productsubcategorydescription);
        formData.append('productImage', productsubcategoryimage.data);

        if (productcategory == "") {
            setformerror("Category is required! Please enter product category.");
        } else if (productsubcategorydescription == "") {
            setformerror("Sub Category Description is required! Please enter product subcategory description.");
        } else if (location.pathname.split('/')[2] == "editsubcategory") {
            try {
                const response = await fetch('http://localhost:5000/subcategories/updatesubcategory/' + params.id, {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    navigate('/admin/subcategorylist');
                }
            } catch (error) {
                console.error("Error updating sub category:", error);
                setformerror('An error occurred while updating. Please try again.');
            }
        } else if (location.pathname.split('/')[2] == 'addsubcategory') {
            try {
                const response = await fetch('http://localhost:5000/subcategories/addsubcategory/', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data) {
                    //   alert('Sub Category added successfully');

                    navigate('/admin/subcategorylist');

                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while uploading the subcategory');
            }
        }

    }

    return (

        <div id="form-top-container">
            <div id="form-container">
                <div class="header-form">{formname} </div>
                <form class="form">
                    <div className='formerror'>{formerror}</div>

                    <select name="category_id" value={productcategory} onChange={handleproductcategory} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                        ))}
                    </select>

                    <div class="input-box">
                        <label for="subcategory_description"> Sub Category Description</label>
                        <textarea type="text" placeholder="Sub Category Description" value={productsubcategorydescription} onChange={handleproductsubcategorydescription} />
                    </div>
                    <div class="input-box">
                        <label for="image">Upload File</label>
                        <input type="file" onChange={handlefilechange} />
                        {productsubcategoryimage.preview && <img src={productsubcategoryimage.preview} width='100' height='100' alt='Preview' />}
                    </div>
                    <input type='submit' value={buttonname} onClick={handlesubmit} />
                </form>

            </div>


        </div >
    );
};

export default AddSubcategory;
