import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000');
        setLaptops(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Top 10 Laptops Sold on AMZ</h2>
      <ul>
        {laptops.map((laptop, index) => (
          <li key={index}>
            <h3>{laptop.productName}</h3>
            <p>Price: ${laptop.price}</p>
            <p>Rating: {laptop.rating}</p>
            <p>Discount: {laptop.discount}%</p>
            <p>Availability: {laptop.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaptopList;
