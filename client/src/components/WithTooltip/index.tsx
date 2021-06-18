import React from 'react';
import {
    Typography,
    Tooltip
} from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

interface WithTooltipProps {
    title: string;
    text: string;
    children: JSX.Element;
}

const WithTooltip: React.FC<WithTooltipProps> = ({ title, text, children }) => {

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">{title}</Typography>
                    <span>{text}</span>
                </React.Fragment>
            }
        >
            {children}
        </HtmlTooltip>
    )
}

export default WithTooltip;
