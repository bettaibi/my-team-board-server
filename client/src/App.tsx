import React from 'react';

import { 
  Button,
  Box
} from '@material-ui/core';

function App() {
  return (
    <Box p={1}>
      <Button >Default Button</Button>
      <Button variant= "contained" color="primary">Primary Button</Button>
      <Button variant= "contained" color="secondary">Secondary Button</Button>
      <Button variant= "contained" color="inherit">Accent Button</Button>
    </Box>
  );
}

export default App;
