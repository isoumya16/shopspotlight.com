const db = require('../config/db');

exports.addcategory = (req, res) => {

    const { category_name, category_description } = req.body;

    const category_image = req.file ? `http://localhost:5000/image/${req.file.filename}` : '';
    db.query('INSERT INTO categories (category_name, category_description, category_image) VALUES (?, ?, ?)', [category_name, category_description, category_image], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Category added successfully', result }))
        }
    })

};

exports.updatecategory = (req, res) => {
    let categories_id = req.params.id;

    console.log(req.file);
    
    if (req.file != undefined) {
        let updatedData = [req.body.category_name, req.body.category_description, req.file ? `http://localhost:5000/image/${req.file.filename}` : req.body.category_image, categories_id];

        db.query('UPDATE categories SET category_name = ?, category_description = ?, category_image = ? WHERE category_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'Category updated successfully' }));
            }
        });
    } else {
        let updatedData = [req.body.category_name, req.body.category_description, categories_id];

        db.query('UPDATE categories SET category_name = ?, category_description = ? WHERE category_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'Category updated successfully' }));
            }
        });
    }

};

exports.deletecategory = (req, res) => {
    let categories_id = { id: req.params.id }
    db.query('DELETE FROM categories WHERE ?', [categories_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Category deleted sucessfully' }))
        }
    })
};

exports.categorylist = (req, res) => {
    db.query('SELECT * FROM categories', (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};

exports.singlecategorylist = (req, res) => {
    let categories_id = { category_id: req.params.id }
    db.query('SELECT * FROM categories WHERE ?', [categories_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};