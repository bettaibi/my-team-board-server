import React from 'react';
import {
    withStyles,
    Theme
} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const CustomRoundedButton = withStyles((theme: Theme) => ({
    root: {
      borderRadius: '9999px',
      fontWeight: 500,
      color: '#fafafa',
      fontSize:'13px'
    },
}))(Button);


const RoundedButton: React.FC<any> = (props) => {
    return (
        <CustomRoundedButton {...props} />
    )
}

export default RoundedButton
