const db = require('../config/db');

exports.addsubcategory = (req, res) => {

    const { category_id, subcategory_description } = req.body;

    const subcategory_image = req.file ? `http://localhost:5000/image/${req.file.filename}` : '';
    db.query('INSERT INTO subcategories (category_id, subcategory_description, subcategory_image) VALUES (?, ?, ?)', [category_id, subcategory_description, subcategory_image], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Subcategory added successfully', result }))
        }
    })

};

exports.updatesubcategory = (req, res) => {
    let subcategories_id = req.params.id;

    if (req.file != undefined) {
        let updatedData = [req.body.category_id, req.body.subcategory_description, req.file ? `http://localhost:5000/image/${req.file.filename}` : req.body.subcategory_image, subcategories_id];

    db.query('UPDATE subcategories SET category_id = ?, subcategory_description = ?, subcategory_image = ? WHERE subcategory_id = ?', updatedData, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Subcategory updated successfully' }));
        }
    });
    } else {
        let updatedData = [ 
            req.body.category_id, req.body.subcategory_description,
            subcategories_id];

        db.query('UPDATE subcategories SET category_id = ?, subcategory_description = ? WHERE subcategory_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'Subcategory updated successfully' }));
            }
        });
    }

};

exports.deletesubcategory = (req, res) => {
    let subcategories_id = { subcategory_id: req.params.id }
    db.query('DELETE FROM subcategories WHERE ?', [subcategories_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Subcategory deleted sucessfully' }))
        }
    })
};

exports.subcategorylist = (req, res) => {

    db.query('SELECT s.*, c.category_name FROM subcategories s LEFT JOIN categories c ON s.category_id = c.category_id', (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};

exports.subcategoryforcategory = (req, res) => {
    let categories_id = { category_id: req.params.id }
    db.query('SELECT * FROM subcategories WHERE ?', [categories_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};

exports.singlesubcategorylist = (req, res) => {
    let subcategories_id = { subcategory_id: req.params.id }
    db.query('SELECT * FROM subcategories WHERE ?', [subcategories_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};