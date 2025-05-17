const db = require('../config/db');
const multer = require('multer');

// const ProductController = {
//     addproduct: (req, res) => {
//         // const { title, cat, description, price, img } = req.body;
//         let productData = {
//             title: req.body.title, cat: req.body.cat, subcat: req.body.subcat,
//             description: req.body.description, price: req.body.price, img: req.file.path
//         };

//         db.query('INSERT INTO products SET ?', [productData], (error, result) => {
//             if (error) {
//                 res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
//             } else {
//                 res.send(JSON.stringify({ 'error': '', 'message': result }))
//             }
//         })

//         // ProductModel.addProduct(product, (err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error adding product' });
//         //     res.json({ message: 'Product added successfully', productId: results.insertId });
//         // });
//     },

//     deleteproduct: (req, res) => {
//         let products_id = { id: req.params.id };

//         db.query('DELETE FROM products WHERE ?', [products_id], (error, result) => {
//             if (error) {
//                 res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
//             } else {
//                 res.send(JSON.stringify({ 'error': '', 'message': 'Product deleted sucessfully' }))
//             }
//         })
//     },

//     updateproduct: (req, res) => {
//         // const { id, title, cat, description, price, img } = req.body;
//         // const product = { title, cat, description, price, img };
//         // ProductModel.updateProduct(id, product, (err, result) => {
//         //     if (err) {
//         //         console.error('Error updating product:', err);
//         //         return res.status(500).json({ message: 'Error updating product' });
//         //     }
//         //     res.json({ message: 'Product updated successfully' });
//         // });

//         const productId = req.params.id;

//         // Extract data from the request body
//         const { title, cat, subcat, description, price, img } = req.body;

//         // Data to update
//         const updateData = [title, cat, subcat, description, price, img, productId];

//         db.query('UPDATE products SET title = ?, cat = ?, subcat = ?, description = ?, price = ?, img = ? WHERE id = ?', updateData, (error, result) => {
//             if (error) {
//                 res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
//             } else {
//                 res.send(JSON.stringify({ 'error': '', 'message': 'Product updated successfully' }));
//             }
//         });

//     },

//     productlist: (req, res) => {
//         // ProductModel.getAllProducts((err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error fetching products' });
//         //     res.json(results);
//         // });

//         db.query('SELECT * FROM products', [], (error, result) => {
//             if (error) {
//                 res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
//             } else {
//                 res.send(JSON.stringify({ 'error': '', 'message': result }))
//             }
//         })
//     },

//     singleproductlist: (req, res) => {
//         // const { id } = req.params;
//         // ProductModel.getProductById(id, (err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error fetching product details' });
//         //     if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
//         //     res.json(results[0]);
//         // });

//         let products_id = { id: req.params.id };

//         db.query('SELECT * FROM products WHERE ?', [products_id], (error, result) => {
//             if (error) {
//                 res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
//             } else {
//                 res.send(JSON.stringify({ 'error': '', 'message': result }))
//             }
//         })
//     },

//     getproductcount: (req, res) => {
//         // ProductModel.getProductCount((err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error fetching product count' });
//         //     res.json(results);
//         // });

//         db.query('SELECT cat AS category, COUNT(*) AS count FROM products GROUP BY cat', (err, results) => {
//             if (err) return res.status(500).json({ message: 'Error fetching product count' });
//             res.json(results);
//         });
//     },

//     gettopproducts: (req, res) => {
//         // ProductModel.getTopProducts((err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error fetching top products' });
//         //     res.json(results);
//         // });

//         db.query('SELECT * FROM products ORDER BY view_count DESC LIMIT 5', (err, results) => {
//             if (err) return res.status(500).json({ message: 'Error fetching top products' });
//             res.json(results);
//         });
//     },

//     getbanners: (req, res) => {
//         // ProductModel.getBanners((err, results) => {
//         //     if (err) return res.status(500).json({ message: 'Error fetching banners' });
//         //     res.json(results);
//         // });

//         db.query('SELECT * FROM banners', (err, results) => {
//             if (err) return res.status(500).json({ message: 'Error fetching banners' });
//             res.json(results);
//         });
//     },

//     updateviewcount: (req, res) => {
//         const { id } = req.params;
//         // ProductModel.updateViewCount(id, (err, result) => {
//         //     if (err) {
//         //         console.error('Error updating view count:', err);
//         //         return res.status(500).json({ message: 'Failed to update view count' });
//         //     }
//         //     res.json({ message: 'View count updated successfully' });
//         // });

//         db.query('UPDATE products SET view_count = view_count + 1 WHERE id = ?', [id], (err, results) => {
//             if (err) {
//                 console.error('Error updating view count:', err);
//                 return res.status(500).json({ message: 'Failed to update view count' });
//             }
//             res.json({ message: 'View count updated successfully' });
//         });
//     },

//     updatelikecount: (req, res) => {
//         const { id } = req.params;
//         // ProductModel.updateLikeCount(id, (err, result) => {
//         //     if (err) {
//         //         console.error('Error updating like count:', err);
//         //         return res.status(500).json({ message: 'Failed to update like count' });
//         //     }
//         //     res.json({ message: 'Like count updated successfully' });
//         // });

//         db.query('UPDATE products SET like_count = like_count + 1 WHERE id = ?', [id], (err, results) => {
//             if (err) {
//                 console.error('Error updating like count:', err);
//                 return res.status(500).json({ message: 'Failed to update like count' });
//             }
//             res.json({ message: 'Like count updated successfully' });
//         });
//     },

//     getlikecount: (req, res) => {
//         const { id } = req.params;
//         // ProductModel.getLikeCount(id, (err, result) => {
//         //     if (err) {
//         //         console.error('Error fetching like count:', err);
//         //         return res.status(500).json({ message: 'Failed to fetch like count' });
//         //     }
//         //     if (result.length === 0) {
//         //         return res.status(404).json({ message: 'Product not found' });
//         //     }
//         //     res.json({ likes: result[0].like_count || 0 });
//         // });

//         db.query('SELECT like_count FROM products WHERE id = ?', [id], (err, results) => {
//             if (err) {
//                 console.error('Error fetching like count:', err);
//                 return res.status(500).json({ message: 'Failed to fetch like count' });
//             }
//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }
//             res.json({ likes: results[0].like_count || 0 });
//         });
//     },

// };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
exports.upload = multer({ storage: storage });

exports.addproduct = (req, res) => {

    // let productData = {
    //     title: req.body.title, cat: req.body.cat, subcat: req.body.subcat,
    //     description: req.body.description, price: req.body.price
    // };

    const { category_id, subcategory_id, product_name, product_description, product_qty, product_price, product_likes, product_views } = req.body;

    const product_image = req.file ? `${process.env.BACKEND_URL}/image/${req.file.filename}` : '';
    db.query('INSERT INTO products (category_id, subcategory_id, product_image, product_name, product_description, product_qty, product_price, product_likes, product_views) VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?)', [category_id, subcategory_id, product_image, product_name, product_description, product_qty, product_price, product_likes, product_views], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Product added successfully' }))
        }
    })
};

exports.deleteproduct = (req, res) => {
    let products_id = { id: req.params.id }
    db.query('DELETE FROM products WHERE ?', [products_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': 'Product deleted sucessfully' }))
        }
    })
};

exports.updateproduct = (req, res) => {
    // console.log(req.file.path);

    let products_id = req.params.id;

    if (req.file != undefined) {
        let updatedData = [req.body.category_id, req.body.subcategory_id, req.body.product_name,
            req.body.product_description, req.body.product_price, req.file ? `${process.env.BACKEND_URL}/image/${req.file.filename}` : req.body.product_image, products_id];
        
            db.query('UPDATE products SET category_id = ?, subcategory_id = ?, product_name = ?, product_description = ?, product_price = ?, product_image = ? WHERE product_id = ?', updatedData, (error, result) => {
                if (error) {
                    res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
                } else {
                    res.send(JSON.stringify({ 'error': '', 'message': 'Product updated successfully' }));
                }
            });
    } else {
        let updatedData = [ 
            req.body.category_id, req.body.subcategory_id, req.body.product_name,
            req.body.product_description, req.body.product_price,
            products_id];

        db.query('UPDATE products SET category_id = ?, subcategory_id = ?, product_name = ?, product_description = ?, product_price = ? WHERE product_id = ?', updatedData, (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'Product updated successfully' }));
            }
        });
    }
};

exports.productlist = (req, res) => {
    db.query('SELECT p.*, c.category_name, s.subcategory_description FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories s ON p.subcategory_id = s.subcategory_id', (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }))
        }
    })
};

exports.singleproductlist = (req, res) => {
    let products_id = { product_id: req.params.id }
    db.query('SELECT * FROM products WHERE ?', [products_id], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ 'error': error.message, 'message': '' }))
        } else {
            res.send(JSON.stringify({ 'error': '', 'message': result }));
        }
    })
};

exports.getproductcount = (req, res) => {
    db.query('SELECT cat AS category, COUNT(*) AS count, (SELECT img FROM products WHERE cat = p.cat LIMIT 1) as img FROM products AS p GROUP BY cat', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching product count', error: err }); // Include error for debugging
        res.json(results);
    });
};

exports.gettopproducts = (req, res) => {
    db.query('SELECT * FROM products ORDER BY product_views DESC LIMIT 4', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching top products' });
        res.json(results);
    });
};

exports.getbanners = (req, res) => {
    db.query('SELECT * FROM banners', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching banners' });
        res.json(results);
    });
};

exports.updateviewcount = (req, res) => {
    let products_id = { product_id: req.params.id };
    db.query('UPDATE products SET product_views = product_views + 1 WHERE product_id = ?', [products_id], (err, results) => {
        if (err) {
            console.error('Error updating view count:', err);
            return res.status(500).json({ message: 'Failed to update view count' });
        }
        res.json({ message: 'View count updated successfully' });
    });
};

exports.updatelikecount = (req, res) => {
    let products_id = { product_id: req.params.id };
    db.query('UPDATE products SET product_likes = product_likes + 1 WHERE product_id = ?', [products_id], (err, results) => {
        if (err) {
            console.error('Error updating like count:', err);
            return res.status(500).json({ message: 'Failed to update like count' });
        }
        res.json({ message: 'Like count updated successfully' });
    });
};

exports.getlikecount = (req, res) => {
    let products_id = { product_id: req.params.id };
    db.query('SELECT product_likes FROM products WHERE product_id = ?', [products_id], (err, results) => {
        if (err) {
            console.error('Error fetching like count:', err);
            return res.status(500).json({ message: 'Failed to fetch like count' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ likes: results[0].product_likes || 0 });
    });
};

exports.searchproduct = (req, res) => {
    const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query cannot be empty.' });
  }

  const searchTerm = `%${query}%`; // Use wildcard for partial matches (like Amazon)
  const sql = `
    SELECT
      product_id,
      category_id,
      subcategory_id,
      product_image,
      product_name,
      product_description,
      product_qty,
      product_price,
      product_likes,
      product_views
    FROM
      products
    WHERE
      product_name LIKE ? OR product_description LIKE ?;
  `;

  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error executing search query:', err);
      return res.status(500).json({ error: 'Failed to fetch products.' });
    }

    if (results.length > 0) {
      return res.json(results);
    } else {
      return res.status(404).json({ message: 'No products found matching your search criteria.' });
    }
  });
};

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'img/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// exports.uploadimage = multer({ storage: storage }).single('img');