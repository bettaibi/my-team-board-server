import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { withStyles, Theme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles';

const CssTextField = withStyles((theme: Theme) =>({
    root: {
      '& .MuiOutlinedInput-input' : {
        zIndex: theme.zIndex.drawer
      },
      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-inputAdornedStart': {
          zIndex: theme.zIndex.drawer,
        },
        '& .MuiInputAdornment-positionStart': {
          zIndex: theme.zIndex.drawer,
        },
        '& fieldset': {
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        boxShadow: '0 1px 2px 0 #0000000d',
        zindex: 75,
        borderRadius: 4,
        color: '#333',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        },
        '&.Mui-focused fieldset': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
            borderWidth: '1px'
        },
      },
    },
  }))(TextField);

  
const MyTextField: React.FC<TextFieldProps> = (props) => {

    return (
        <CssTextField {...props} />
    )
}

export default MyTextField;
