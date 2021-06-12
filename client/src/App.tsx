import React from 'react';

import { 
  Button,
  Box
} from '@material-ui/core';
import useSnackbar from './hooks/useSnackbar';

function App() {
  const {SnackbarComponent, showMsg} = useSnackbar({vertical: 'bottom', horizontal:'left'});

  const showSnackbar = (type: any) => {
    showMsg('this is a message', type);
  }

  return (
    <Box p={1}>
      <Button onClick={()=> showSnackbar('success')}>Default Button</Button>
      <Button onClick={()=> showSnackbar('warning')} variant= "contained" color="primary">Primary Button</Button>
      <Button onClick={()=> showSnackbar('error')} variant= "contained" color="secondary">Secondary Button</Button>
      <Button onClick={()=> showSnackbar('info')} variant= "contained" color="inherit">Accent Button</Button>
      <SnackbarComponent />
    </Box>
  );
}

export default App;
