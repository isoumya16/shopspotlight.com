const db = require('../config/db');

exports.registration = (req, res) => {

    const { firstname, lastname, useraccess, mobileno, email, password } = req.body;

    const image = req.file ? `http://localhost:5000/image/${req.file.filename}` : '';
    db.query('INSERT INTO users (firstname, lastname, useraccess, mobileno, email, password, user_image) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, useraccess, mobileno, email, password, image], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'User added successfully', result }))
        }
    })

    // let registrationData = {
    //     firstname: req.body.firstname, lastname: req.body.lastname,
    //     email: req.body.email, password: req.body.password, mobileno: req.body.mobileno, user_access: req.body.user_access, img : req.file.filename
    // };

    // // console.log(req.body);

    // db.query('INSERT INTO users SET ?', [registrationData], (error, result) => {
    //     if (error) {
    //         res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
    //     } else {
    //         res.send(JSON.stringify({ 'error': '', 'message': result }))
    //     }
    // })
};

exports.login = (req, res) => {
    // const { email, password } = req.body;

    // db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {

    //     if (results[0].password !== password) {
    //         res.send(JSON.stringify({ 'message': 'Invalid email or password' }));
    //     } else {
    //         res.send(JSON.stringify({ 'message': 'Login successful', user: results[0] }));
    //     }
    // });

    console.log(1);

    console.log(req.body.email);

    if (req.body.email == '') {
        res.send(JSON.stringify({ 'error': '', 'message': 'Enter your valid email' }))
    } else if (req.body.password == '') {
        res.send(JSON.stringify({ 'error': '', 'message': 'Enter your valid password' }))
    } else {
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': result }))
            } else if (result == '') {
                res.send(JSON.stringify({ 'error': '', 'message': 'Either password or email is wrong' }))
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': result }))
            }

        })
    }
};

exports.updateuser = (req, res) => {
    let users_id = req.params.id;
    
    // let updatedData = [
    //     req.body.firstname,
    //     req.body.lastname,
    //     req.body.useraccess,
    //     req.body.mobileno,
    //     req.body.email,
    //     req.body.password,
    //     req.file ? `http://localhost:5000/image/${req.file.filename}` : req.body.user_image,
    //     users_id
    // ];

    // db.query('UPDATE users SET firstname = ?, lastname = ?, useraccess = ?, mobileno = ?, email = ?, password = ?, user_image = ? WHERE user_id = ?', updatedData, (error, result) => {

    //     console.log(updatedData);

    //     if (error) {
    //         res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
    //     } else {
    //         res.send(JSON.stringify({ 'error': '', 'message': 'User updated successfully' }));
    //     }
    // });

    if (req.file != undefined) {
        let updatedData = [
            req.body.firstname,
            req.body.lastname,
            req.body.useraccess,
            req.body.mobileno,
            req.body.email,
            req.body.password,
            req.file ? `http://localhost:5000/image/${req.file.filename}` : req.body.user_image,
            users_id];

        db.query('UPDATE users SET firstname = ?, lastname = ?, useraccess = ?, mobileno = ?, email = ?, password = ?, user_image = ? WHERE user_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'User updated successfully' }));
            }
        });
    } else {
        let updatedData = [ 
            req.body.firstname,
            req.body.lastname,
            req.body.useraccess,
            req.body.mobileno,
            req.body.email,
            req.body.password,
            users_id];

        db.query('UPDATE users SET firstname = ?, lastname = ?, useraccess = ?, mobileno = ?, email = ?, password = ? WHERE user_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'User updated successfully' }));
            }
        });
    }

};

exports.userlist = (req, res) => {

    db.query('SELECT * FROM users', [], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};

exports.deleteuser = (req, res) => {
    let users_id = { user_id: req.params.id }
    db.query('DELETE FROM users WHERE ?', [users_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'User deleted sucessfully' }))
        }
    })
};

exports.singleuserlist = (req, res) => {

    let users_id = { user_id: req.params.id };

    db.query('SELECT * FROM users WHERE ?', [users_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};
