const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 HW3 Template' });
});

// 1
async function fetchProductsByCategory(category) {
  let query = 'SELECT * FROM products WHERE category = ?';
  let result = await db.all(query, [category]);

  return { products: result };
}

app.get('/products/category/:category', async (req, res) => {
  try {
    let category = req.params.category;
    let response = await fetchProductsByCategory(category);

    if (response.products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found by ' + category });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2
async function fetchProductsByBrand(brand) {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let result = await db.all(query, [brand]);

  return { products: result };
}

app.get('/products/brand/:brand', async (req, res) => {
  try {
    let brand = req.params.brand;
    let response = await fetchProductsByBrand(brand);

    if (response.products.length === 0) {
      return res.status(404).json({ message: 'No products found by ' + brand });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3
async function fetchProductsByRating(rating) {
  let query = 'SELECT * FROM products WHERE rating >= ?';
  let result = await db.all(query, [rating]);

  return { products: result };
}

app.get('/products/rating/:rating', async (req, res) => {
  try {
    let rating = req.params.rating;
    let response = await fetchProductsByRating(rating);

    if (response.products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found by ' + rating });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4
async function fetchProductsByStocks(stock) {
  let query = 'SELECT * FROM products WHERE stock <= ?';
  let result = await db.all(query, [stock]);

  return { products: result };
}

app.get('/products/stocks/:stock', async (req, res) => {
  try {
    let stock = req.params.stock;
    let response = await fetchProductsByStocks(stock);

    if (response.products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found by ' + rating });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PORT
app.listen(PORT, () => {
  console.log('Server is running on Port 3000');
});
