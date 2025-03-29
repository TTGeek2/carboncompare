import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Co2 as Co2Icon } from '@mui/icons-material';

// Carbon footprint data (in kg CO2)
const carbonData = {
  // Electronics
  "Smartphone": 85,
  "Laptop": 422,
  "Desktop Computer": 588,
  "Tablet": 87,
  "Smart TV (55\")": 320,
  "Gaming Console": 89,
  "Wireless Headphones": 20,
  "Smart Watch": 29,
  "Wireless Speaker": 34,
  "E-reader": 168,

  // Clothing
  "Jeans": 33.4,
  "T-shirt": 6.5,
  "Sweater (wool)": 39,
  "Cotton Dress": 17,
  "Leather Shoes": 15,
  "Running Shoes": 14,
  "Winter Jacket": 39.2,
  "Socks (pair)": 2.1,
  "Cotton Shorts": 5.9,
  "Polyester Jacket": 28,

  // Food & Beverages
  "Hamburger": 2.5,
  "Coffee (cup)": 0.4,
  "Banana": 0.48,
  "Chocolate Bar": 2.9,
  "Beer (500ml)": 0.8,
  "Wine (750ml)": 1.2,
  "Milk (1L)": 1.67,
  "Eggs (12)": 2.7,
  "Rice (1kg)": 2.7,
  "Bread (loaf)": 1.3,
  "Cheese (1kg)": 13.5,
  "Beef (1kg)": 60,
  "Chicken (1kg)": 6.9,
  "Pork (1kg)": 7.2,
  "Fish (1kg)": 3.8,
  "Tofu (1kg)": 2,
  "Potatoes (1kg)": 0.4,
  "Tomatoes (1kg)": 1.4,
  "Apples (1kg)": 0.3,
  "Oranges (1kg)": 0.3,
  "Flight (1 hour)": 0.255,

  // Transportation (per km)
  "Car (petrol)": 0.171,
  "Car (diesel)": 0.159,
  "Car (electric)": 0.053,
  "Bus": 0.089,
  "Train": 0.041,
  "Motorcycle": 0.103,
  "Bicycle (including production)": 0.005,
  "Walking": 0,
  "Domestic Flight": 0.255,
  "International Flight": 0.195,

  // Home & Living
  "Washing Machine Cycle": 0.6,
  "Dishwasher Cycle": 0.5,
  "Air Conditioning (1 hour)": 2.1,
  "Electric Heater (1 hour)": 1.5,
  "LED Light Bulb (1000 hours)": 2.4,
  "Refrigerator (yearly)": 100,
  "Microwave (1 hour)": 0.6,
  "Electric Oven (1 hour)": 2.7,
  "Vacuum Cleaner (1 hour)": 0.75,
  "Television (1 hour)": 0.088,

  // Paper Products
  "Book (hardcover)": 2.7,
  "Magazine": 0.95,
  "Newspaper": 0.4,
  "Printer Paper (500 sheets)": 2.6,
  "Paper Towel Roll": 0.7,
  "Toilet Paper Roll": 0.8,
  "Paper Bag": 0.04,
  "Cardboard Box": 1.1,
  "Greeting Card": 0.2,
  "Notebook": 1.2,

  // Beverages
  "Bottled Water (1L)": 0.17,
  "Soda (330ml)": 0.5,
  "Orange Juice (1L)": 0.94,
  "Energy Drink (250ml)": 0.37,
  "Tea (cup)": 0.071,
  "Sports Drink (500ml)": 0.32,
  "Coconut Water (330ml)": 0.48,
  "Milk Alternative (1L)": 0.9,
  "Hot Chocolate (cup)": 0.47,
  "Smoothie (500ml)": 0.79,

  // Packaged Foods
  "Cereal (500g)": 0.87,
  "Potato Chips (150g)": 0.75,
  "Cookies (200g)": 0.92,
  "Pasta (500g)": 0.92,
  "Canned Soup (400g)": 1.3,
  "Frozen Pizza": 2.4,
  "Ice Cream (1L)": 2.1,
  "Yogurt (500g)": 1.2,
  "Granola Bar": 0.16,
  "Frozen Vegetables (1kg)": 1.1,

  // Personal Care
  "Shampoo Bottle": 0.52,
  "Toothpaste Tube": 0.2,
  "Deodorant Stick": 0.21,
  "Body Wash": 0.47,
  "Face Cream": 0.39,
  "Sunscreen": 0.45,
  "Hair Dryer (1 hour)": 1.2,
  "Electric Toothbrush (yearly)": 2.3,
  "Razor (disposable)": 0.075,
  "Cotton Swabs (100)": 0.12,

  // Household Items
  "Plastic Water Bottle": 0.083,
  "Glass Bottle": 0.45,
  "Aluminum Can": 0.17,
  "Plastic Bag": 0.033,
  "Glass Cup": 0.32,
  "Ceramic Plate": 0.71,
  "Metal Cutlery Set": 2.8,
  "Plastic Food Container": 0.22,
  "Kitchen Sponge": 0.09,
  "Aluminum Foil Roll": 6.0,

  // Garden & Outdoor
  "Plant Pot (plastic)": 0.73,
  "Garden Hose (25m)": 4.2,
  "Lawn Mower (electric, per hour)": 1.5,
  "Plant Fertilizer (1kg)": 1.6,
  "Garden Soil (10L)": 0.86,
  "Wooden Garden Chair": 15.2,
  "Solar Garden Light": 3.4,
  "Bird Feeder": 1.8,
  "Watering Can": 1.2,
  "Garden Gloves": 0.45,

  // Office Supplies
  "Pen": 0.15,
  "Pencil": 0.032,
  "Stapler": 0.84,
  "Scissors": 0.92,
  "Tape Roll": 0.13,
  "Sticky Notes Pack": 0.27,
  "Paper Clips (100)": 0.19,
  "Rubber Band (100g)": 0.21,
  "File Folder": 0.16,
  "Desk Lamp": 4.8
};

// Create a forest-themed color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#795548', // Earth brown
      light: '#A1887F',
      dark: '#4E342E',
    },
    background: {
      default: '#F1F8E9', // Light sage green
      paper: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      color: '#1B5E20', // Dark forest green
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover fieldset': {
              borderColor: '#2E7D32',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [carbonAmount, setCarbonAmount] = useState('');
  const [comparisons, setComparisons] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCarbonAmount(value);
    
    if (value && !isNaN(value)) {
      const numValue = parseFloat(value);
      const allItems = Object.entries(carbonData);
      const validItems = [];
      
      // First, collect all valid items (where quantity is between 1 and 10)
      allItems.forEach(([item, carbon]) => {
        const quantity = Math.round(numValue / carbon);
        if (quantity >= 1 && quantity <= 10) {
          validItems.push({
            item,
            carbon,
            quantity: quantity
          });
        }
      });
      
      // Randomly select 3 items from valid items
      const randomItems = [];
      while (randomItems.length < 3 && validItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * validItems.length);
        randomItems.push(validItems[randomIndex]);
        validItems.splice(randomIndex, 1); // Remove the selected item to avoid duplicates
      }
      
      setComparisons(randomItems);
    } else {
      setComparisons([]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ 
            my: 4, 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            p: 4,
            backdropFilter: 'blur(8px)',
          }}>
            <Co2Icon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              Carbon Footprint Comparator
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              Enter your carbon footprint in kg CO2 to see equivalent comparisons
            </Typography>
            
            <TextField
              fullWidth
              variant="outlined"
              label="Carbon Footprint (kg CO2)"
              type="number"
              value={carbonAmount}
              onChange={handleInputChange}
              sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
            />

            {comparisons.length > 0 && (
              <Grid container spacing={3} justifyContent="center">
                {comparisons.map((comparison, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h4" component="div" color="primary">
                          {comparison.quantity}x
                        </Typography>
                        <Typography variant="h6" component="div" color="secondary">
                          {comparison.item}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comparison.carbon} kg CO2 each
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 