import React from 'react';
import {
    withStyles,
    Theme
} from '@material-ui/core/styles';
import { Button, ButtonProps } from '@material-ui/core';

const CustomRoundedButton = withStyles((theme: Theme) => ({
    root: {
      borderRadius: '9999px',
      fontWeight: 500,
      color: '#fafafa',
      fontSize:'13px'
    },
}))(Button);


const RoundedButton: React.FC<ButtonProps> = React.forwardRef ((props, ref: any) => {
    return (
        <CustomRoundedButton {...props} ref = {ref} />
    )
});

export default RoundedButton;
