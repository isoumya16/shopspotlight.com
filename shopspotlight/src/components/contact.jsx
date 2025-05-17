import React, { useState } from 'react';
import '../css/contact.css';
import axios from 'axios';

const Contact = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');

  const handlename = (e) => {
    setname(e.target.value);
  }

  const handleemail = (e) => {
    setemail(e.target.value);
  }

  const handlesubject = (e) => {
    setsubject(e.target.value);
  }

  const handlemessage = (e) => {
    setmessage(e.target.value);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    let formData = { name: name, email: email, subject: subject, message: message };

    axios.post('http://localhost:5000/contact/', formData)
      .then((response) => {
        console.log(response.data);
        alert('Message sent successfully!');
      })
  }

  return (
    <div className="contact_container">
      <div className="content">
        <h2>#Contact Us</h2>
        <div className="form">
          <form>
            {/* Name Input */}
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Your Full Name"
              autoComplete="off"
              onChange={handlename}
              required
            />
            {/* {errors.name && <small className="error">{errors.name}</small>} */}

            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Your E-mail"
              autoComplete="off"
              onChange={handleemail}
              required
            />
            {/* {errors.email && <small className="error">{errors.email}</small>} */}

            {/* Subject Input */}
            <input
              type="text"
              name="subject"
              value={subject}
              placeholder="Enter Your Subject"
              autoComplete="off"
              onChange={handlesubject}
              required
            />
            {/* {errors.subject && <small className="error">{errors.subject}</small>} */}

            {/* Message Input */}
            <textarea
              name="message"
              value={message}
              placeholder="Your Message"
              autoComplete="off"
              onChange={handlemessage}
              required
            ></textarea>
            {/* {errors.message && <small className="error">{errors.message}</small>} */}

            <button type="submit" onClick={handlesubmit}>Send</button>
          </form>
        </div>
      </div>

      <div className="location" style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2 style={{marginBottom : 20}}>Our Company Location</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5282.153029379319!2d88.45959392794957!3d22.946996003267294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1732942513076!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact;