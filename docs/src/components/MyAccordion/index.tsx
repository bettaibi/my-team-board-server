import React from 'react';
import {
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }
  }),
);
interface MyAccordionProps{
    label: string;
    description?: string;
    isOpen?: boolean;
}
const MyAccordion: React.FC<MyAccordionProps> = ({label, description, children, isOpen}) => {
    const classes = useStyles();

    return (
            <Accordion defaultExpanded = {isOpen || false}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>{label}</Typography>
                    {description && <Typography className={classes.secondaryHeading}>{description}</Typography>}
                </AccordionSummary>
                <AccordionDetails>
                   {
                       children
                   }
                </AccordionDetails>
            </Accordion>
    )
}

export default MyAccordion;
