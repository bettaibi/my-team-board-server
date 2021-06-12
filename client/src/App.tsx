import React from 'react';

import { 
  Button,
  Box
} from '@material-ui/core';
import useSnackbar from './hooks/useSnackbar';
import useDialog from './hooks/useDialog';
import useConfirmDialog from './hooks/useConfirmDialog';

function App() {
  const {SnackbarComponent, showMsg} = useSnackbar();
  const { DialogComponent, handleClose, handleOpen } = useDialog();
  const { handleOpen: onOpen, ConfirmDialog } = useConfirmDialog(
    {message: 'Are you sure you want to delete?', onConfirmClick: onConfirm}
  );

  function onConfirm(){
    console.log("confirm button Clicked");
  }

  const showSnackbar = (type: any) => {
    showMsg('this is a message', type);
  }

  return (
    <Box p={1}>
      <Button onClick={()=> showSnackbar('success')}>Default Button</Button>
      <Button onClick={()=> showSnackbar('warning')} variant= "contained" color="primary">Primary Button</Button>
      <Button onClick={()=> showSnackbar('error')} variant= "contained" color="secondary">Secondary Button</Button>
      <Button onClick={()=> showSnackbar('info')} variant= "contained" color="inherit">Accent Button</Button>
      <Button onClick={handleOpen} variant= "contained" color="inherit">Open Dialog</Button>
      <Button onClick={() => onOpen() } variant= "contained" color="secondary">Confirm Dialog</Button>
      <SnackbarComponent />
      <ConfirmDialog />
      <DialogComponent>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore mollitia exercitationem eveniet iusto, maxime eum beatae, molestias illum praesentium doloribus facere nihil odio, modi iste illo. Odio facere excepturi natus.
        </p>
        <Button onClick={handleClose}>Close</Button>
      </DialogComponent>
    </Box>
  );
}

export default App;
