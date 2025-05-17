import React, { useEffect } from 'react';
import '../css/registration.css';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [useraccess, setuseraccess] = useState('User');
  const [image, setimage] = useState({ preview: '', data: '' });
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [formname, setformname] = useState('');
  const [buttonname, setbuttonname] = useState('');
  const [formerror, setformerror] = useState('');
  const nameexpression = /^[a-zA-Z]{2,15}$/;
  const mobilenoexpression = /^[0-9]{10}$/;
  const emailexpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordexpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  // let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password, title: title, cat: category, subcat: subcategory, description: description, price: price, img: img };

  console.log(location.pathname.split('/'));

  useEffect(() => {
    if (location.pathname.split('/')[1] == "registration") {
      setformname('Registration');
      setbuttonname('Registration');
    }

    if (location.pathname.split('/')[1] == "login") {
      setformname('Login');
      setbuttonname('Login');
      setfirstname('default');
      setlastname('default');
      setmobileno('1111111111');
    }

    if (location.pathname.split('/')[2] == "edituser") {
      setformname('Update User Form');
      setbuttonname('Update User');

      // axios.get('http://localhost:5000/users/singleuserlist/' + params.id).then((response) => {
      //   console.log(response.data.message[0]);

      //   setfirstname(response.data.message[0].firstname);
      //   setlastname(response.data.message[0].lastname);
      //   setmobileno(response.data.message[0].mobileno);
      //   setuseraccess(response.data.message[0].useraccess);
      //   setemail(response.data.message[0].email);
      //   setpassword(response.data.message[0].password);
      //   setimage({ preview: response.data.message[0].user_image, data: response.data.message[0].user_image });
      // })

      fetch(`${process.env.REACT_APP_API_URL}/users/singleuserlist/${params.id}`)
        .then(response => response.json())
        .then(response => {
          if (response && response.message && response.message.length > 0) {
            setfirstname(response.message[0].firstname);
            setlastname(response.message[0].lastname);
            setmobileno(response.message[0].mobileno);
            setuseraccess(response.message[0].useraccess);
            setemail(response.message[0].email);
            setpassword(response.message[0].password);
            setimage({ preview: response.message[0].user_image, data: response.message[0].user_image });
          } else {
            console.error("No user found or invalid response format:", response);
            setformerror("Unable to fetch user data.");
          }

        });
    }
  }, [])

  const handlefirstname = (event) => {
    setfirstname(event.target.value)
    // console.log(firstname);
  }

  const handlelastname = (event) => {
    setlastname(event.target.value)
    // console.log(lastname);
  }

  const handlemobileno = (event) => {
    setmobileno(event.target.value)
    // console.log(moblieno);
  }

  const handleuserrolechange = (event) => {
    setuseraccess(event.target.value);
  }

  const handleemail = (event) => {
    setemail(event.target.value)
    // console.log(email);
  }

  const handlepassword = (event) => {
    setpassword(event.target.value)
    // console.log(password);
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

      setimage(img);
    }

  }

  const handlesubmit = async (event) => {
    event.preventDefault();

    // let userData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password };
    // let productData = { title: title, cat: category, description: description, price: price, img: img };

    // let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password };

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('mobileno', mobileno);
    formData.append('useraccess', useraccess);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image.data);

    console.log(formData);

    if (firstname == "") {
      setformerror("First Name is required! Please enter your first name.");
    } else if (!firstname.match(nameexpression)) {
      setformerror("Invalid first name! First Name must contain only letters and be 2 to 15 characters long.");
    } else if (lastname == "") {
      setformerror("Last Name is required! Please enter your last name.");
    } else if (!lastname.match(nameexpression)) {
      setformerror("Invalid last name! Last Name must contain only letters and be 2 to 15 characters long.");
    } else if (mobileno == "") {
      setformerror("Mobile number is required! Please enter your mobile number.");
    } else if (!mobileno.match(mobilenoexpression)) {
      setformerror("Invalid mobile number! Mobile number must be exactly 10 digits.");
    } else if (email == "") {
      setformerror("Email is required! Please enter your email.");
    } else if (!email.match(emailexpression)) {
      setformerror("Invalid email format! Please enter a valid email, e.g., xyz123@gmail.com");
    } else if (password == "") {
      setformerror("Password is required! Please enter your password.");
    } else if (!password.match(passwordexpression)) {
      setformerror("Invalid password! Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
    } else if (location.pathname.split('/')[1] == 'registration') {
      //   axios.post('http://localhost:5000/users/registration/', formData).then((response) => {
      //     console.log(response)
      //     // navigate('/login');
      //   }
      // )

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/registration/`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data) {
          //   alert('User added successfully');

          navigate('/login');

        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the user');
      }
    } else if (location.pathname.split('/')[2] == "edituser") {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/updateuser/${params.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          navigate('/admin/userlist');
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setformerror('An error occurred while updating. Please try again.');
      }
    } else if (location.pathname.split('/')[1] == "login") {
      let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password };

      axios.post(`${process.env.REACT_APP_API_URL}/users/login/`, formData).then((response) => {
        // console.log(response.data.message);

        if (response.data.message == "Either password or email is wrong") {
          setformerror(response.data.message);
        } else {
          console.log(response.data.message);

          localStorage.setItem('user_id', response.data.message[0].user_id);
          localStorage.setItem('firstname', response.data.message[0].firstname);
          localStorage.setItem('email', response.data.message[0].email);
          localStorage.setItem('userrole', response.data.message[0].useraccess);
          localStorage.setItem('profilepic', response.data.message[0].user_image);

          navigate('/admin/userlist');

          const userrole = localStorage.getItem('userrole');

          if (userrole == "Admin") {
            navigate('/admin');
            // console.log("Admin");

          } else if (userrole == "Supplier") {
            navigate('/supplier');
            // console.log("Supplier");

          } else if (userrole == "User") {
            navigate('/user');
            // console.log("User");
          }
        }

      })
    }

  }

  return (
    <>
      <div id="form-top-container">
        <div id="form-container">
          <div class="header-form">{formname} </div>
          <form class="form">
            <div className='formerror'>{formerror}</div>
            {buttonname != "Login" && <>
              <div class="input-box">
                <label for="firstname">First Name </label>
                <input type="text" placeholder="First Name" value={firstname} onChange={handlefirstname} />
              </div>
              <div class="input-box">
                <label for="lastname">Last Name</label>
                <input type="text" placeholder="Last Name" value={lastname} onChange={handlelastname} />
              </div>
              {buttonname == "Update User" && (
                <div className="input-box">
                  <select value={useraccess} onChange={handleuserrolechange}>
                    <option value="Admin">Admin</option>
                    <option value="Supplier">Supplier</option>
                    <option value="User">User</option>
                  </select>
                </div>
              )}
              <div class="input-box">
                <label for="mobileno">Mobile No</label>
                <input type="text" placeholder="Mobile No" value={mobileno} onChange={handlemobileno} />
              </div>
            </>}
            <div class="input-box">
              <label for="email">Email </label>
              <input type="text" placeholder="Email" value={email} onChange={handleemail} />
            </div>
            <div class="input-box">
              <label for="password">Password</label>
              <input type="text" placeholder="Password" value={password} onChange={handlepassword} />
            </div>

            {buttonname != "Login" && <>
              <div class="input-box">
                <label for="image">Upload File</label>
                <input type="file" onChange={handlefilechange} />
                {image.preview && <img src={image.preview} width='100' height='100' alt='Preview' />}
              </div>
            </>}
            <input type="submit" value={buttonname} onClick={handlesubmit} />
          </form>
        </div>
      </div>
    </>
  )
}

export default Registration;

// import React, { useEffect } from 'react';
// import '../css/registration.css';
// import { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// const Registration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();
//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');
//   const [mobileno, setmobileno] = useState('');
//   const [useraccess, setuseraccess] = useState('User');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [title, settitle] = useState('');
//   const [category, setcategory] = useState('');
//   const [subcategory, setsubcategory] = useState('');
//   const [description, setdescription] = useState('');
//   const [price, setprice] = useState('');
//   const [image, setimage] = useState({ preview: '', data: '' });
//   const [formname, setformname] = useState('');
//   const [buttonname, setbuttonname] = useState('');
//   const [formerror, setformerror] = useState('');
//   const nameexpression = /^[a-zA-Z]{2,15}$/;
//   const mobilenoexpression = /^[0-9]{10}$/;
//   const emailexpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const passwordexpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//   useEffect(() => {
//     if (location.pathname.split('/')[1] === "registration") {
//       setformname('Registration');
//       setbuttonname('Registration');
//     }

//     if (location.pathname.split('/')[1] === "login") {
//       setformname('Login');
//       setbuttonname('Login');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//     }

//     if (location.pathname.split('/')[1] === "edituser") {
//       setformname('Update User Form');
//       setbuttonname('Update User');

//       fetch(`http://localhost:5000/users/singleuserlist/${params.id}`)
//         .then(response => response.json())
//         .then(data => {
//           setfirstname(data.message[0].firstname);
//           setlastname(data.message[0].lastname);
//           setmobileno(data.message[0].mobileno);
//           setuseraccess(data.message[0].user_access);
//           setemail(data.message[0].email);
//           setpassword(data.message[0].password);
//         });
//     }

//     if (location.pathname.split('/')[1] === "addproduct") {
//       setformname('Add New Product');
//       setbuttonname('Add Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');
//     }

//     if (location.pathname.split('/')[1] === "editproduct") {
//       setformname('Update Product Form');
//       setbuttonname('Update Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');

//       fetch(`http://localhost:5000/products/singleproductlist/${params.id}`)
//         .then(response => response.json())
//         .then(data => {
//           settitle(data.message[0].title);
//           setcategory(data.message[0].cat);
//           setsubcategory(data.message[0].subcat);
//           setdescription(data.message[0].description);
//           setprice(data.message[0].price);
//           setimage(data.message[0].img);
//         });
//     }
//   }, []);

//   const handlefirstname = (event) => {
//     setfirstname(event.target.value)
//     // console.log(firstname);
//   }

//   const handlelastname = (event) => {
//     setlastname(event.target.value)
//     // console.log(lastname);
//   }

//   const handlemobileno = (event) => {
//     setmobileno(event.target.value)
//     // console.log(moblieno);
//   }

//   const handleuserrolechange = (event) => {
//     setuseraccess(event.target.value);
//   }

//   const handleemail = (event) => {
//     setemail(event.target.value)
//     // console.log(email);
//   }

//   const handlepassword = (event) => {
//     setpassword(event.target.value)
//     // console.log(password);
//   }

//   const handletitle = (event) => {
//     settitle(event.target.value)
//   }
//   const handlecategory = (event) => {
//     setcategory(event.target.value)
//   }

//   const handlesubcategory = (event) => {
//     setsubcategory(event.target.value)
//   }

//   const handledescription = (event) => {
//     setdescription(event.target.value)
//   }
//   const handleprice = (event) => {
//     setprice(event.target.value)
//   }
//   const handlefilechange = (event) => {
//     // setimg(event.target.files[0]);

//     const img = {
//       preview: URL.createObjectURL(event.target.files[0]),
//       data: event.target.files[0],
//     }
//     setimage(img);
//   }

//   const handlesubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('firstname', firstname);
//     formData.append('lastname', lastname);
//     formData.append('mobileno', mobileno);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('subcategory', subcategory);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('image', image.data);

//     if (firstname === "") {
//       setformerror("First Name is required! Please enter your first name.");
//     } else if (!firstname.match(nameexpression)) {
//       setformerror("Invalid first name! First Name must contain only letters and be 2 to 15 characters long.");
//     } else if (lastname === "") {
//       setformerror("Last Name is required! Please enter your last name.");
//     } else if (!lastname.match(nameexpression)) {
//       setformerror("Invalid last name! Last Name must contain only letters and be 2 to 15 characters long.");
//     } else if (mobileno === "") {
//       setformerror("Mobile number is required! Please enter your mobile number.");
//     } else if (!mobileno.match(mobilenoexpression)) {
//       setformerror("Invalid mobile number! Mobile number must be exactly 10 digits.");
//     } else if (email === "") {
//       setformerror("Email is required! Please enter your email.");
//     } else if (!email.match(emailexpression)) {
//       setformerror("Invalid email format! Please enter a valid email, e.g., xyz123@gmail.com");
//     } else if (password === "") {
//       setformerror("Password is required! Please enter your password.");
//     } else if (!password.match(passwordexpression)) {
//       setformerror("Invalid password! Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
//     } else {
//       let url = '';
//       let method = '';

//       if (location.pathname.split('/')[1] === 'registration') {
//         url = 'http://localhost:5000/users/registration/';
//         method = 'POST';
//       } else if (location.pathname.split('/')[1] === 'edituser') {
//         url = `http://localhost:5000/users/updateuser/${params.id}`;
//         method = 'PUT';
//       } else if (location.pathname.split('/')[1] === 'editproduct') {
//         url = `http://localhost:5000/products/updateproduct/${params.id}`;
//         method = 'PUT';
//       } else if (location.pathname.split('/')[1] === 'login') {
//         url = 'http://localhost:5000/users/login/';
//         method = 'POST';
//       } else if (location.pathname.split('/')[1] === 'addproduct') {
//         url = 'http://localhost:5000/products/addproduct/';
//         method = 'POST';
//       }

//       await fetch(url, {
//         method,
//         body: formData,
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (location.pathname.split('/')[1] === 'login') {
//             if (data.message === "Either password or email is wrong") {
//               setformerror(data.message);
//             } else {
//               localStorage.setItem('userid', data.message.id);
//               localStorage.setItem('firstname', data.message.firstname);
//               localStorage.setItem('email', data.message.email);
//               localStorage.setItem('userrole', data.message.user_access);

//               const userrole = localStorage.getItem('userrole');

//               if (userrole === "Admin") navigate('/admindashboard');
//               else if (userrole === "Supplier") navigate('/supplierdashboard');
//               else if (userrole === "User") navigate('/userdashboard');
//             }
//           } else {
//             navigate(location.pathname.split('/')[1] === 'addproduct' || location.pathname.split('/')[1] === 'editproduct' ? '/products' : '/login');
//           }
//         })
//         .catch(error => setformerror('Failed to submit the form. Please try again.'));
//     }
//   }

//   return (
//     <>
//       <div id="form-top-container">
//         <div id="form-container">
//           <div className="header-form">{formname} </div>
//           <form className="form">
//             <div className='formerror'>{formerror}</div>
//             {buttonname !== "Login" && buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="firstname">First Name </label>
//                 <input type="text" placeholder="First Name" value={firstname} onChange={handlefirstname} />
//               </div>
//               <div class="input-box">
//                 <label for="lastname">Last Name</label>
//                 <input type="text" placeholder="Last Name" value={lastname} onChange={handlelastname} />
//               </div>
//               <div class="input-box">
//                 <label for="mobileno">Mobile No</label>
//                 <input type="text" placeholder="Mobile No" value={mobileno} onChange={handlemobileno} />
//               </div>
//             </>}

//             {buttonname === "Update User" && (
//               <div className="input-box">
//                 <select value={useraccess} onChange={handleuserrolechange}>
//                   <option value="Admin">Admin</option>
//                   <option value="Supplier">Supplier</option>
//                   <option value="User">User</option>
//                 </select>
//               </div>
//             )}

//             {buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="email">Email </label>
//                 <input type="text" placeholder="Email" value={email} onChange={handleemail} />
//               </div>
//               <div class="input-box">
//                 <label for="password">Password</label>
//                 <input type="text" placeholder="Password" value={password} onChange={handlepassword} />
//               </div>
//             </>}

//             {buttonname !== "Registration" && buttonname !== "Login" && buttonname !== "Update User" && <>
//               <div class="input-box">
//                 <label for="title">Title</label>
//                 <input type="text" placeholder="Title" value={title} onChange={handletitle} />
//               </div>
//               <div class="input-box">
//                 <label for="category">Category</label>
//                 <select value={category} onChange={handlecategory}>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="subcategory">Sub Category</label>
//                 <select value={subcategory} onChange={handlesubcategory}>
//                   <option value="All Products">All Products</option>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="description">Description</label>
//                 <input type="text" placeholder="Description" value={description} onChange={handledescription} />
//               </div>
//               <div class="input-box">
//                 <label for="price">Price</label>
//                 <input type="text" placeholder="Price" value={price} onChange={handleprice} />
//               </div>
//               <div class="input-box">
//                 <label for="img">Upload File</label>
//                 <input type="file" name="file" onChange={handlefilechange} />
//                 {image.preview && <img src={image.preview} width='100' height='100' />}
//               </div>
//             </>}
//             <input type="submit" value={buttonname} onClick={handlesubmit} />
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Registration;


// import React, { useEffect } from 'react';
// import '../css/registration.css';
// import { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const Registration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();
//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');
//   const [mobileno, setmobileno] = useState('');
//   const [useraccess, setuseraccess] = useState('User');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [title, settitle] = useState('');
//   const [category, setcategory] = useState('');
//   const [subcategory, setsubcategory] = useState('');
//   const [description, setdescription] = useState('');
//   const [price, setprice] = useState('');
//   const [image, setimage] = useState({ preview: '', data: '' });
//   const [formname, setformname] = useState('');
//   const [buttonname, setbuttonname] = useState('');
//   const [formerror, setformerror] = useState('');
//   const nameexpression = /^[a-zA-Z]{2,15}$/;
//   const mobilenoexpression = /^[0-9]{10}$/;
//   const emailexpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const passwordexpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//   // let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password, title: title, cat: category, subcat: subcategory, description: description, price: price, img: img };

//   useEffect(() => {
//     if (location.pathname.split('/')[1] === "registration") {
//       setformname('Registration');
//       setbuttonname('Registration');
//     }

//     if (location.pathname.split('/')[1] === "login") {
//       setformname('Login');
//       setbuttonname('Login');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//     }

//     if (location.pathname.split('/')[1] === "edituser") {
//       setformname('Update User Form');
//       setbuttonname('Update User');

//       axios.get('http://localhost:5000/users/singleuserlist/' + params.id).then((response) => {
//         console.log(response.data.message);

//         setfirstname(response.data.message[0].firstname);
//         setlastname(response.data.message[0].lastname);
//         setmobileno(response.data.message[0].mobileno);
//         setuseraccess(response.data.message[0].user_access);
//         setemail(response.data.message[0].email);
//         setpassword(response.data.message[0].password);
//       })
//     }

//     if (location.pathname.split('/')[1] === "addproduct") {
//       setformname('Add New Product');
//       setbuttonname('Add Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');
//     }

//     if (location.pathname.split('/')[1] === "editproduct") {
//       setformname('Update Product Form');
//       setbuttonname('Update Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');

//       axios.get('http://localhost:5000/products/singleproductlist/' + params.id).then((response) => {
//         console.log(response.data.message);

//         settitle(response.data.message[0].title);
//         setcategory(response.data.message[0].cat);
//         setsubcategory(response.data.message[0].subcat);
//         setdescription(response.data.message[0].description);
//         setprice(response.data.message[0].price);
//         setimage(response.data.message[0].img);
//       })
//     }
//   }, [])

//   const handlefirstname = (event) => {
//     setfirstname(event.target.value)
//     // console.log(firstname);
//   }

//   const handlelastname = (event) => {
//     setlastname(event.target.value)
//     // console.log(lastname);
//   }

//   const handlemobileno = (event) => {
//     setmobileno(event.target.value)
//     // console.log(moblieno);
//   }

//   const handleuserrolechange = (event) => {
//     setuseraccess(event.target.value);
//   }

//   const handleemail = (event) => {
//     setemail(event.target.value)
//     // console.log(email);
//   }

//   const handlepassword = (event) => {
//     setpassword(event.target.value)
//     // console.log(password);
//   }

//   const handletitle = (event) => {
//     settitle(event.target.value)
//   }
//   const handlecategory = (event) => {
//     setcategory(event.target.value)
//   }

//   const handlesubcategory = (event) => {
//     setsubcategory(event.target.value)
//   }

//   const handledescription = (event) => {
//     setdescription(event.target.value)
//   }
//   const handleprice = (event) => {
//     setprice(event.target.value)
//   }
//   const handlefilechange = (event) => {
//     // setimg(event.target.files[0]);

//     const img = {
//       preview: URL.createObjectURL(event.target.files[0]),
//       data: event.target.files[0],
//     }
//     setimage(img);
//   }

//   const handlesubmit = async (event) => {
//     event.preventDefault();

//     // let userData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password };
//     // let productData = { title: title, cat: category, description: description, price: price, img: img };

//     const formData = new FormData();
//     formData.append('firstname', firstname);
//     formData.append('lastname', lastname);
//     formData.append('mobileno', mobileno);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('subcategory', subcategory);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('image', image.data);

//     if (firstname === "") {
//       setformerror("First Name is required! Please enter your first name.");
//     } else if (!firstname.match(nameexpression)) {
//       setformerror("Invalid first name! First Name must contain only letters and be 2 to 15 characters long.");
//     } else if (lastname === "") {
//       setformerror("Last Name is required! Please enter your last name.");
//     } else if (!lastname.match(nameexpression)) {
//       setformerror("Invalid last name! Last Name must contain only letters and be 2 to 15 characters long.");
//     } else if (mobileno === "") {
//       setformerror("Mobile number is required! Please enter your mobile number.");
//     } else if (!mobileno.match(mobilenoexpression)) {
//       setformerror("Invalid mobile number! Mobile number must be exactly 10 digits.");
//     } else if (email === "") {
//       setformerror("Email is required! Please enter your email.");
//     } else if (!email.match(emailexpression)) {
//       setformerror("Invalid email format! Please enter a valid email, e.g., xyz123@gmail.com");
//     } else if (password === "") {
//       setformerror("Password is required! Please enter your password.");
//     } else if (!password.match(passwordexpression)) {
//       setformerror("Invalid password! Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
//     } else if (location.pathname.split('/')[1] === 'registration') {
//       axios.post('http://localhost:5000/users/registration/', formData).then((response) => {
//         console.log(response)
//         navigate('/login');
//       })
//     } else if(location.pathname.split('/')[1] === "edituser") {
//       axios.put('http://localhost:5000/users/updateuser/' + params.id, formData).then((response) => {
//         navigate('/userlist');
//       })
//     } else if(location.pathname.split('/')[1] === "editproduct") {
//       axios.put('http://localhost:5000/products/updateproduct/' + params.id, formData).then((response) => {
//         navigate('/products');
//       })
//     } else if(location.pathname.split('/')[1] === "login") {

//       axios.post('http://localhost:5000/users/login/', formData).then((response) => {
//         // console.log(response.data.message);

//         if (response.data.message === "Either password or email is wrong") {
//           setformerror(response.data.message);
//         } else {
//           console.log(response.data.message);

//           localStorage.setItem('userid', response.data.message.id);
//           localStorage.setItem('firstname', response.data.message.firstname);
//           localStorage.setItem('email', response.data.message.email);
//           localStorage.setItem('userrole', response.data.message.user_access);

//           // navigate('/userlist');

//           const userrole = localStorage.getItem('userrole');

//           if (userrole === "Admin") {
//             navigate('/admindashboard');
//             // console.log("Admin");

//           } else if (userrole === "Supplier") {
//             navigate('/supplierdashboard');
//             // console.log("Supplier");

//           } else if (userrole === "User") {
//             navigate('/userdashboard');
//             // console.log("User");
//           }
//         }

//       })
//     } else if (location.pathname.split('/')[1] === 'addproduct') {

//       // await fetch('http://localhost:5000/products/addproduct/', {
//       //   method: 'POST',
//       //   body: formData,
//       // }).then((response) => {
//       //   if (response.status === 200) {
//       //     navigate('/products');
//       //   } else {
//       //     setformerror('Failed to submit the form. Please try again.');
//       //   }
//       // });

//     }

//   }

//   return (
//     <>
//       <div id="form-top-container">
//         <div id="form-container">
//           <div class="header-form">{formname} </div>
//           <form class="form">
//             <div className='formerror'>{formerror}</div>
//             {buttonname !== "Login" && buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="firstname">First Name </label>
//                 <input type="text" placeholder="First Name" value={firstname} onChange={handlefirstname} />
//               </div>
//               <div class="input-box">
//                 <label for="lastname">Last Name</label>
//                 <input type="text" placeholder="Last Name" value={lastname} onChange={handlelastname} />
//               </div>
//               <div class="input-box">
//                 <label for="mobileno">Mobile No</label>
//                 <input type="text" placeholder="Mobile No" value={mobileno} onChange={handlemobileno} />
//               </div>
//             </>}

//             {buttonname === "Update User" && (
//               <div className="input-box">
//                 <select value={useraccess} onChange={handleuserrolechange}>
//                   <option value="Admin">Admin</option>
//                   <option value="Supplier">Supplier</option>
//                   <option value="User">User</option>
//                 </select>
//               </div>
//             )}

//             {buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="email">Email </label>
//                 <input type="text" placeholder="Email" value={email} onChange={handleemail} />
//               </div>
//               <div class="input-box">
//                 <label for="password">Password</label>
//                 <input type="text" placeholder="Password" value={password} onChange={handlepassword} />
//               </div>
//             </>}

//             {buttonname !== "Registration" && buttonname !== "Login" && buttonname !== "Update User" && <>
//               <div class="input-box">
//                 <label for="title">Title</label>
//                 <input type="text" placeholder="Title" value={title} onChange={handletitle} />
//               </div>
//               <div class="input-box">
//                 <label for="category">Category</label>
//                 <select value={category} onChange={handlecategory}>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="subcategory">Sub Category</label>
//                 <select value={subcategory} onChange={handlesubcategory}>
//                   <option value="All Products">All Products</option>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="description">Description</label>
//                 <input type="text" placeholder="Description" value={description} onChange={handledescription} />
//               </div>
//               <div class="input-box">
//                 <label for="price">Price</label>
//                 <input type="text" placeholder="Price" value={price} onChange={handleprice} />
//               </div>
//               <div class="input-box">
//                 <label for="img">Upload File</label>
//                 <input type="file" name="file" onChange={handlefilechange} />
//                 {image.preview && <img src={image.preview} width='100' height='100' />}
//               </div>
//             </>}
//             <input type="submit" value={buttonname} onClick={handlesubmit} />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Registration;



// import React, { useEffect } from 'react';
// import '../css/registration.css';
// import { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// const Registration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();
//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');
//   const [mobileno, setmobileno] = useState('');
//   const [useraccess, setuseraccess] = useState('User');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [title, settitle] = useState('');
//   const [category, setcategory] = useState('');
//   const [subcategory, setsubcategory] = useState('');
//   const [description, setdescription] = useState('');
//   const [price, setprice] = useState('');
//   const [image, setimage] = useState({ preview: '', data: '' });
//   const [formname, setformname] = useState('');
//   const [buttonname, setbuttonname] = useState('');
//   const [formerror, setformerror] = useState('');
//   const nameexpression = /^[a-zA-Z]{2,15}$/;
//   const mobilenoexpression = /^[0-9]{10}$/;
//   const emailexpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const passwordexpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//   useEffect(() => {
//     if (location.pathname.split('/')[1] === "registration") {
//       setformname('Registration');
//       setbuttonname('Registration');
//     }

//     if (location.pathname.split('/')[1] === "login") {
//       setformname('Login');
//       setbuttonname('Login');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//     }

//     if (location.pathname.split('/')[1] === "edituser") {
//       setformname('Update User Form');
//       setbuttonname('Update User');

//       fetch(`http://localhost:5000/users/singleuserlist/${params.id}`)
//         .then(response => response.json())
//         .then(data => {
//           setfirstname(data.message[0].firstname);
//           setlastname(data.message[0].lastname);
//           setmobileno(data.message[0].mobileno);
//           setuseraccess(data.message[0].user_access);
//           setemail(data.message[0].email);
//           setpassword(data.message[0].password);
//         });
//     }

//     if (location.pathname.split('/')[1] === "addproduct") {
//       setformname('Add New Product');
//       setbuttonname('Add Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');
//     }

//     if (location.pathname.split('/')[1] === "editproduct") {
//       setformname('Update Product Form');
//       setbuttonname('Update Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');

//       fetch(`http://localhost:5000/products/singleproductlist/${params.id}`)
//         .then(response => response.json())
//         .then(data => {
//           settitle(data.message[0].title);
//           setcategory(data.message[0].cat);
//           setsubcategory(data.message[0].subcat);
//           setdescription(data.message[0].description);
//           setprice(data.message[0].price);
//           setimage(data.message[0].img);
//         });
//     }
//   }, []);

//   const handlefirstname = (event) => {
//     setfirstname(event.target.value)
//     // console.log(firstname);
//   }

//   const handlelastname = (event) => {
//     setlastname(event.target.value)
//     // console.log(lastname);
//   }

//   const handlemobileno = (event) => {
//     setmobileno(event.target.value)
//     // console.log(moblieno);
//   }

//   const handleuserrolechange = (event) => {
//     setuseraccess(event.target.value);
//   }

//   const handleemail = (event) => {
//     setemail(event.target.value)
//     // console.log(email);
//   }

//   const handlepassword = (event) => {
//     setpassword(event.target.value)
//     // console.log(password);
//   }

//   const handletitle = (event) => {
//     settitle(event.target.value)
//   }
//   const handlecategory = (event) => {
//     setcategory(event.target.value)
//   }

//   const handlesubcategory = (event) => {
//     setsubcategory(event.target.value)
//   }

//   const handledescription = (event) => {
//     setdescription(event.target.value)
//   }
//   const handleprice = (event) => {
//     setprice(event.target.value)
//   }
//   const handlefilechange = (event) => {
//     // setimg(event.target.files[0]);

//     const img = {
//       preview: URL.createObjectURL(event.target.files[0]),
//       data: event.target.files[0],
//     }
//     setimage(img);
//   }

//   const handlesubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('firstname', firstname);
//     formData.append('lastname', lastname);
//     formData.append('mobileno', mobileno);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('subcategory', subcategory);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('image', image.data);

//     if (firstname === "") {
//       setformerror("First Name is required! Please enter your first name.");
//     } else if (!firstname.match(nameexpression)) {
//       setformerror("Invalid first name! First Name must contain only letters and be 2 to 15 characters long.");
//     } else if (lastname === "") {
//       setformerror("Last Name is required! Please enter your last name.");
//     } else if (!lastname.match(nameexpression)) {
//       setformerror("Invalid last name! Last Name must contain only letters and be 2 to 15 characters long.");
//     } else if (mobileno === "") {
//       setformerror("Mobile number is required! Please enter your mobile number.");
//     } else if (!mobileno.match(mobilenoexpression)) {
//       setformerror("Invalid mobile number! Mobile number must be exactly 10 digits.");
//     } else if (email === "") {
//       setformerror("Email is required! Please enter your email.");
//     } else if (!email.match(emailexpression)) {
//       setformerror("Invalid email format! Please enter a valid email, e.g., xyz123@gmail.com");
//     } else if (password === "") {
//       setformerror("Password is required! Please enter your password.");
//     } else if (!password.match(passwordexpression)) {
//       setformerror("Invalid password! Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
//     } else {
//       let url = '';
//       let method = '';

//       if (location.pathname.split('/')[1] === 'registration') {
//         url = 'http://localhost:5000/users/registration/';
//         method = 'POST';
//       } else if (location.pathname.split('/')[1] === 'edituser') {
//         url = `http://localhost:5000/users/updateuser/${params.id}`;
//         method = 'PUT';
//       } else if (location.pathname.split('/')[1] === 'editproduct') {
//         url = `http://localhost:5000/products/updateproduct/${params.id}`;
//         method = 'PUT';
//       } else if (location.pathname.split('/')[1] === 'login') {
//         url = 'http://localhost:5000/users/login/';
//         method = 'POST';
//       } else if (location.pathname.split('/')[1] === 'addproduct') {
//         url = 'http://localhost:5000/products/addproduct/';
//         method = 'POST';
//       }

//       await fetch(url, {
//         method,
//         body: formData,
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (location.pathname.split('/')[1] === 'login') {
//             if (data.message === "Either password or email is wrong") {
//               setformerror(data.message);
//             } else {
//               localStorage.setItem('userid', data.message.id);
//               localStorage.setItem('firstname', data.message.firstname);
//               localStorage.setItem('email', data.message.email);
//               localStorage.setItem('userrole', data.message.user_access);

//               const userrole = localStorage.getItem('userrole');

//               if (userrole === "Admin") navigate('/admindashboard');
//               else if (userrole === "Supplier") navigate('/supplierdashboard');
//               else if (userrole === "User") navigate('/userdashboard');
//             }
//           } else {
//             navigate(location.pathname.split('/')[1] === 'addproduct' || location.pathname.split('/')[1] === 'editproduct' ? '/products' : '/login');
//           }
//         })
//         .catch(error => setformerror('Failed to submit the form. Please try again.'));
//     }
//   }

//   return (
//     <>
//       <div id="form-top-container">
//         <div id="form-container">
//           <div className="header-form">{formname} </div>
//           <form className="form">
//             <div className='formerror'>{formerror}</div>
//             {buttonname !== "Login" && buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="firstname">First Name </label>
//                 <input type="text" placeholder="First Name" value={firstname} onChange={handlefirstname} />
//               </div>
//               <div class="input-box">
//                 <label for="lastname">Last Name</label>
//                 <input type="text" placeholder="Last Name" value={lastname} onChange={handlelastname} />
//               </div>
//               <div class="input-box">
//                 <label for="mobileno">Mobile No</label>
//                 <input type="text" placeholder="Mobile No" value={mobileno} onChange={handlemobileno} />
//               </div>
//             </>}

//             {buttonname === "Update User" && (
//               <div className="input-box">
//                 <select value={useraccess} onChange={handleuserrolechange}>
//                   <option value="Admin">Admin</option>
//                   <option value="Supplier">Supplier</option>
//                   <option value="User">User</option>
//                 </select>
//               </div>
//             )}

//             {buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="email">Email </label>
//                 <input type="text" placeholder="Email" value={email} onChange={handleemail} />
//               </div>
//               <div class="input-box">
//                 <label for="password">Password</label>
//                 <input type="text" placeholder="Password" value={password} onChange={handlepassword} />
//               </div>
//             </>}

//             {buttonname !== "Registration" && buttonname !== "Login" && buttonname !== "Update User" && <>
//               <div class="input-box">
//                 <label for="title">Title</label>
//                 <input type="text" placeholder="Title" value={title} onChange={handletitle} />
//               </div>
//               <div class="input-box">
//                 <label for="category">Category</label>
//                 <select value={category} onChange={handlecategory}>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="subcategory">Sub Category</label>
//                 <select value={subcategory} onChange={handlesubcategory}>
//                   <option value="All Products">All Products</option>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Smart Watch">Smart Watch</option>
//                   <option value="Headphone">Headphone</option>
//                   <option value="Camera">Camera</option>
//                   <option value="Power Bank">Power Bank</option>
//                   <option value="Heat Pipe">Heat Pipe</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Electronics">Electronics</option>
//                 </select>
//               </div>
//               <div class="input-box">
//                 <label for="description">Description</label>
//                 <input type="text" placeholder="Description" value={description} onChange={handledescription} />
//               </div>
//               <div class="input-box">
//                 <label for="price">Price</label>
//                 <input type="text" placeholder="Price" value={price} onChange={handleprice} />
//               </div>
//               <div class="input-box">
//                 <label for="img">Upload File</label>
//                 <input type="file" name="file" onChange={handlefilechange} />
//                 {image.preview && <img src={image.preview} width='100' height='100' />}
//               </div>
//             </>}
//             <input type="submit" value={buttonname} onClick={handlesubmit} />
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Registration;



// import React, { useEffect } from 'react';
// import '../css/registration.css';
// import { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const Registration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();
//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');
//   const [mobileno, setmobileno] = useState('');
//   const [useraccess, setuseraccess] = useState('User');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [title, settitle] = useState('');
//   const [category, setcategory] = useState('');
//   const [subcategory, setsubcategory] = useState('');
//   const [description, setdescription] = useState('');
//   const [price, setprice] = useState('');
//   const [image, setimage] = useState({ preview: '', data: '' });
//   const [formname, setformname] = useState('');
//   const [buttonname, setbuttonname] = useState('');
//   const [formerror, setformerror] = useState('');
//   const nameexpression = /^[a-zA-Z]{2,15}$/;
//   const mobilenoexpression = /^[0-9]{10}$/;
//   const emailexpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const passwordexpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//   // let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password, title: title, cat: category, subcat: subcategory, description: description, price: price, img: img };

//   useEffect(() => {
//     if (location.pathname.split('/')[1] === "registration") {
//       setformname('Registration');
//       setbuttonname('Registration');
//     }

//     if (location.pathname.split('/')[1] === "login") {
//       setformname('Login');
//       setbuttonname('Login');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//     }

//     if (location.pathname.split('/')[1] === "edituser") {
//       setformname('Update User Form');
//       setbuttonname('Update User');

//       axios.get('http://localhost:5000/users/singleuserlist/' + params.id).then((response) => {
//         console.log(response.data.message);

//         setfirstname(response.data.message[0].firstname);
//         setlastname(response.data.message[0].lastname);
//         setmobileno(response.data.message[0].mobileno);
//         setuseraccess(response.data.message[0].user_access);
//         setemail(response.data.message[0].email);
//         setpassword(response.data.message[0].password);
//       })
//     }

//     if (location.pathname.split('/')[1] === "addproduct") {
//       setformname('Add New Product');
//       setbuttonname('Add Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');
//     }

//     if (location.pathname.split('/')[1] === "editproduct") {
//       setformname('Update Product Form');
//       setbuttonname('Update Product');
//       setfirstname('default');
//       setlastname('default');
//       setmobileno('1111111111');
//       setemail('default@gmail.com');
//       setpassword('Default@123');

//       axios.get('http://localhost:5000/products/singleproductlist/' + params.id).then((response) => {
//         console.log(response.data.message);

//         settitle(response.data.message[0].title);
//         setcategory(response.data.message[0].cat);
//         setsubcategory(response.data.message[0].subcat);
//         setdescription(response.data.message[0].description);
//         setprice(response.data.message[0].price);
//         setimage(response.data.message[0].img);
//       })
//     }
//   }, [])

//   const handlefirstname = (event) => {
//     setfirstname(event.target.value)
//     // console.log(firstname);
//   }

//   const handlelastname = (event) => {
//     setlastname(event.target.value)
//     // console.log(lastname);
//   }

//   const handlemobileno = (event) => {
//     setmobileno(event.target.value)
//     // console.log(moblieno);
//   }

//   const handleuserrolechange = (event) => {
//     setuseraccess(event.target.value);
//   }

//   const handleemail = (event) => {
//     setemail(event.target.value)
//     // console.log(email);
//   }

//   const handlepassword = (event) => {
//     setpassword(event.target.value)
//     // console.log(password);
//   }

//   const handletitle = (event) => {
//     settitle(event.target.value)
//   }
//   const handlecategory = (event) => {
//     setcategory(event.target.value)
//   }

//   const handlesubcategory = (event) => {
//     setsubcategory(event.target.value)
//   }

//   const handledescription = (event) => {
//     setdescription(event.target.value)
//   }
//   const handleprice = (event) => {
//     setprice(event.target.value)
//   }
//   const handlefilechange = (event) => {
//     setimage(event.target.files[0]);

//     const img = {
//       preview: URL.createObjectURL(event.target.files[0]),
//       data: event.target.files[0],
//     }
//     setimage(img);
//   }

//   const handlesubmit = async (event) => {
//     event.preventDefault();

//     // let userData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password };
//     // let productData = { title: title, cat: category, description: description, price: price, img: img };

//     let formData = { firstname: firstname, lastname: lastname, mobileno: mobileno, email: email, password: password, user_access: useraccess, title: title, cat: category, subcat: subcategory, description: description, price: price, img: image };

//     // const formData = new FormData();
//     // formData.append('firstname', firstname);
//     // formData.append('lastname', lastname);
//     // formData.append('mobileno', mobileno);
//     // formData.append('email', email);
//     // formData.append('password', password);
//     // formData.append('title', title);
//     // formData.append('category', category);
//     // formData.append('subcategory', subcategory);
//     // formData.append('description', description);
//     // formData.append('price', price);
//     // formData.append('image', image.data);

//     if (firstname === "") {
//       setformerror("First Name is required! Please enter your first name.");
//     } else if (!firstname.match(nameexpression)) {
//       setformerror("Invalid first name! First Name must contain only letters and be 2 to 15 characters long.");
//     } else if (lastname === "") {
//       setformerror("Last Name is required! Please enter your last name.");
//     } else if (!lastname.match(nameexpression)) {
//       setformerror("Invalid last name! Last Name must contain only letters and be 2 to 15 characters long.");
//     } else if (mobileno === "") {
//       setformerror("Mobile number is required! Please enter your mobile number.");
//     } else if (!mobileno.match(mobilenoexpression)) {
//       setformerror("Invalid mobile number! Mobile number must be exactly 10 digits.");
//     } else if (email === "") {
//       setformerror("Email is required! Please enter your email.");
//     } else if (!email.match(emailexpression)) {
//       setformerror("Invalid email format! Please enter a valid email, e.g., xyz123@gmail.com");
//     } else if (password === "") {
//       setformerror("Password is required! Please enter your password.");
//     } else if (!password.match(passwordexpression)) {
//       setformerror("Invalid password! Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
//     } else if (location.pathname.split('/')[1] === 'registration') {
//       axios.post('http://localhost:5000/users/registration/', formData).then((response) => {
//         console.log(response)
//         navigate('/login');
//       })
//     } else if (location.pathname.split('/')[1] === "edituser") {
//       axios.put('http://localhost:5000/users/updateuser/' + params.id, formData).then((response) => {
//         navigate('/userlist');
//       })
//     } else if (location.pathname.split('/')[1] === "editproduct") {
//       axios.put('http://localhost:5000/products/updateproduct/' + params.id, formData).then((response) => {
//         navigate('/products');
//       })
//     } else if (location.pathname.split('/')[1] === "login") {

//       axios.post('http://localhost:5000/users/login/', formData).then((response) => {
//         // console.log(response.data.message);

//         if (response.data.message === "Either password or email is wrong") {
//           setformerror(response.data.message);
//         } else {
//           console.log(response.data.message);

//           localStorage.setItem('userid', response.data.message[0].id);
//           localStorage.setItem('firstname', response.data.message[0].firstname);
//           localStorage.setItem('email', response.data.message[0].email);
//           localStorage.setItem('userrole', response.data.message[0].user_access);

//           // navigate('/userlist');

//           const userrole = localStorage.getItem('userrole');

//           if (userrole === "Admin") {
//             // navigate('/admindashboard');
//             console.log("Admin");

//           } else if (userrole === "Supplier") {
//             // navigate('/supplierdashboard');
//             console.log("Supplier");

//           } else if (userrole === "User") {
//             // navigate('/userdashboard');
//             console.log("User");
//           }
//         }

//       })
//     } else if (location.pathname.split('/')[1] === 'addproduct') {

//       await fetch('http://localhost:5000/products/addproduct/', {
//         method: 'POST',
//         body: formData,
//       }).then((response) => {
//         if (response.status === 200) {
//           navigate('/products');
//         } else {
//           setformerror('Failed to submit the form. Please try again.');
//         }
//       });

//     }

//   }

//   return (
//     <>
//       <div id="form-top-container">
//         <div id="form-container">
//           <div class="header-form">{formname} </div>
//           <form class="form">
//             <div className='formerror'>{formerror}</div>
//             {buttonname !== "Login" && buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="firstname">First Name </label>
//                 <input type="text" placeholder="First Name" value={firstname} onChange={handlefirstname} />
//               </div>
//               <div class="input-box">
//                 <label for="lastname">Last Name</label>
//                 <input type="text" placeholder="Last Name" value={lastname} onChange={handlelastname} />
//               </div>
//               <div class="input-box">
//                 <label for="mobileno">Mobile No</label>
//                 <input type="text" placeholder="Mobile No" value={mobileno} onChange={handlemobileno} />
//               </div>
//             </>}

//             {buttonname === "Update User" && (
//               <div className="input-box">
//                 <select value={useraccess} onChange={handleuserrolechange}>
//                   <option value="Admin">Admin</option>
//                   <option value="Supplier">Supplier</option>
//                   <option value="User">User</option>
//                 </select>
//               </div>
//             )}

//             {buttonname !== "Add Product" && buttonname !== "Update Product" && <>
//               <div class="input-box">
//                 <label for="email">Email </label>
//                 <input type="text" placeholder="Email" value={email} onChange={handleemail} />
//               </div>
//               <div class="input-box">
//                 <label for="password">Password</label>
//                 <input type="text" placeholder="Password" value={password} onChange={handlepassword} />
//               </div>
//             </>}

//             {buttonname !== "Registration" && buttonname !== "Login" && buttonname !== "Update User" && <>
//               <div class="input-box">
//                 <label for="title">Title</label>
//                 <input type="text" placeholder="Title" value={title} onChange={handletitle} />
//               </div>
//               <div class="input-box">
//                 <label for="category">Category</label>
//                 <input type="text" placeholder="Category" value={category} onChange={handlecategory} />
//               </div>
//               <div class="input-box">
//                 <label for="category">Sub Category</label>
//                 <input type="text" placeholder="Sub Category" value={subcategory} onChange={handlesubcategory} />
//               </div>
//               <div class="input-box">
//                 <label for="description">Description</label>
//                 <input type="text" placeholder="Description" value={description} onChange={handledescription} />
//               </div>
//               <div class="input-box">
//                 <label for="price">Price</label>
//                 <input type="text" placeholder="Price" value={price} onChange={handleprice} />
//               </div>
//               <div class="input-box">
//                 <label for="image">Upload File</label>
//                 <input type="file" name="file" onChange={handlefilechange} />
//                 {image.preview && <img src={image.preview} width='100' height='100' />}
//               </div>
//             </>}

//             <input type="submit" value={buttonname} onClick={handlesubmit} />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Registration;