import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
    Chip,
    Button
} from '@material-ui/core';
import UsePopover from '../../../../../hooks/usePopover';
import {
    CheckBoxOutlined,
    AddCircleOutline
} from "@material-ui/icons";
import { DraggableProvided } from "react-beautiful-dnd";
import Moment from 'react-moment';
import useDialog from '../../../../../hooks/useDialog';
import CardDetails from './CardDetails';
import NewSprint from './NewSprint';

const useStyle = makeStyles((theme) => ({
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(1)
    },
    card: {
        backgroundColor: 'white',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        borderRadius: 10,
        cursor: 'pointer',
        boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px"
    },
    addCardButton: {
        marginTop: theme.spacing(1),
        width: '100%',
        borderRadius: 10,
        color: '#64748B'
    }
}));

interface CardProps {
    providedDraggable: DraggableProvided;
    value: string;
}
const Sprint: React.FC<CardProps> = ({ providedDraggable, value }) => {
    const classes = useStyle();
    const { DialogComponent, onDialogClose, onDialogOpen } = useDialog();

    return (
        <React.Fragment>
            <div className={classes.card} onClick={onDialogOpen}
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}>
                {value}
                <Box mt={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                    width="100%">
                    <Typography variant="body2" color="secondary" >
                        <Moment format="DD/MM/YYYY">
                            {new Date()}
                        </Moment>
                    </Typography>
                    <Chip
                        size="small"
                        icon={<CheckBoxOutlined />}
                        label="1 / 3"
                        color="primary"
                    />
                </Box>
            </div>

            <DialogComponent>
                <CardDetails onDialogClose={onDialogClose} />
            </DialogComponent>
        </React.Fragment>
    )
}

const NewSprintContainer = () => {
    const classes = useStyle();
    const { PopoverComponent, handleClick } = UsePopover();

    return (
        <React.Fragment>

            <Button aria-describedby="new_sprint_menu"  onClick={handleClick}
             className={classes.addCardButton} size="small">
                <AddCircleOutline className={classes.mr} />
                <span>Add another sprint</span>
            </Button>

            <PopoverComponent id="new_sprint_menu">
                <NewSprint />
            </PopoverComponent>
        </React.Fragment>
    )
};


export { Sprint, NewSprintContainer };