import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, CardContent, Typography } from '@mui/material';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product detail data from the API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`);
        const productData = response.data.products.find(p => p.id === parseInt(productId));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3">{product.name}</Typography>
          <Typography>Company: {product.company}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Discount: {product.discount}%</Typography>
          <Typography>Availability: {product.availability}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;
