import React from 'react';
import { Box, TextField, Button } from '@mui/material';

function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <TextField
        name="category"
        label="Category"
        value={filters.category}
        onChange={handleChange}
      />
      <TextField
        name="company"
        label="Company"
        value={filters.company}
        onChange={handleChange}
      />
      <TextField
        name="rating"
        label="Rating"
        type="number"
        value={filters.rating}
        onChange={handleChange}
      />
      <TextField
        name="minPrice"
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <TextField
        name="maxPrice"
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={() => setFilters(filters)}>
        Apply
      </Button>
    </Box>
  );
}

export default Filters;
