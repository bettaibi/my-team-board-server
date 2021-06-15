import React from 'react';
import {
    withStyles,
    Theme
} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const CustomRoundedButton = withStyles((theme: Theme) => ({
    root: {
      borderRadius: '9999px',
      fontWeight: 400,
      color: '#ccc'
    },
}))(Button);

interface RoundedButtonProps{
    textContent: string;
    type: 'submit' | 'button';
    size: 'small' | 'large' | 'medium';
    className: string;
    variant: 'contained' | 'outlined' | 'text';
    color: 'primary' | 'secondary' | 'default';
}

const RoundedButton: React.FC<RoundedButtonProps> = ({textContent, type, className, size, variant, color}) => {
    return (
        <CustomRoundedButton size={size} className={className} type={type} variant={variant} color={color}>
            {textContent}
        </CustomRoundedButton>
    )
}

export default RoundedButton
