import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    minPrice: 0,
    maxPrice: 10000,
    availability: ''
  });

  useEffect(() => {
    // Fetch products data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <Container>
      <h1>All Products</h1>
      {/* Add Filters Here */}
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>Company: {product.company}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}%</Typography>
                <Typography>Availability: {product.availability}</Typography>
                <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllProductsPage;
