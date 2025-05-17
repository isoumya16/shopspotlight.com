import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [formname, setformname] = useState('');
    const [buttonname, setbuttonname] = useState('');
    const [formerror, setformerror] = useState('');
    const [categoryname, setcategoryname] = useState('');
    const [categorydescription, setcategorydescription] = useState('');
    const [categoryimage, setcategoryimage] = useState({ preview: '', data: '' });

    useEffect(() => {
        if (location.pathname.split('/')[2] == "addcategory") {
            setformname('Add New Category');
            setbuttonname('Add Category');
        }

        if (location.pathname.split('/')[2] == "editcategory") {
            setformname('Update Category Form');
            setbuttonname('Update Category');

            fetch('http://localhost:5000/categories/singlecategorylist/' + params.id).then(response => response.json()).then(response => {
                console.log(response.message[0]);
                setcategoryname(response.message[0].category_name);
                setcategorydescription(response.message[0].category_description);
                setcategoryimage({ preview: response.message[0].category_image, data: response.message[0].category_image });
            });
        }
    }, [])

    const handleproductcategoryname = (event) => {
        setcategoryname(event.target.value)
    }
    const handleproductcategorydescription = (event) => {
        setcategorydescription(event.target.value)
    }

    const handlefilechange = (event) => {

        const file = event.target.files[0];

        if (file) {
            const img = {
                preview: URL.createObjectURL(file),
                data: file
            }

            setcategoryimage(img);
        }

    }

    const handlesubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('category_name', categoryname);
        formData.append('category_description', categorydescription);
        formData.append('productImage', categoryimage.data);

        if (categoryname == "") {
            setformerror("Category Name is required! Please enter product category name.");
        } else if (categorydescription == "") {
            setformerror("Category Description is required! Please enter product category description.");
        } else if (location.pathname.split('/')[2] == "editcategory") {
            try {
                const response = await fetch('http://localhost:5000/categories/updatecategory/' + params.id, {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    navigate('/admin/categorylist');
                }
            } catch (error) {
                console.error("Error updating category:", error);
                setformerror('An error occurred while updating. Please try again.');
            }
        } else if (location.pathname.split('/')[2] == 'addcategory') {
            try {
                const response = await fetch('http://localhost:5000/categories/addcategory/', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data) {
                    //   alert('Category added successfully');

                    navigate('/admin/categorylist');

                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while uploading the product');
            }
        }

    }

    return (

        <div id="form-top-container">
            <div id="form-container">
                <div class="header-form">{formname} </div>
                <form class="form">
                    <div className='formerror'>{formerror}</div>

                    <div class="input-box">
                        <label for="category_name">Category Name</label>
                        <input type="text" placeholder="Category Name" value={categoryname} onChange={handleproductcategoryname} />
                    </div>

                    <div class="input-box">
                        <label for="category_description">Category Description</label>
                        <textarea type="text" placeholder="Category Description" value={categorydescription} onChange={handleproductcategorydescription} />
                    </div>
                    <div class="input-box">
                        <label for="image">Upload File</label>
                        <input type="file" onChange={handlefilechange} />
                        {categoryimage.preview && <img src={categoryimage.preview} width='100' height='100' alt='Preview' />}
                    </div>
                    <input type='submit' value={buttonname} onClick={handlesubmit} />
                </form>

            </div>


        </div >
    );
};

export default AddCategory;
