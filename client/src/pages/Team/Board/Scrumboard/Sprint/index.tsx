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
import { AspectModel, SprintModel, TaskModel } from '../../../../../models/app.model';

function some(array: TaskModel[]): number{
    let s = 0;
    for(let item of array){
        if(item.done){ s++; }
    }
    return s;
}

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
        color: '#64748B',
    }
}));

interface CardProps {
    providedDraggable: DraggableProvided;
    value: SprintModel;
    projectId: string;
    members: string[];
}
const Sprint: React.FC<CardProps> = ({ providedDraggable, value, projectId, members }) => {
    const classes = useStyle();
    const numberOfDone = some(value.tasks || []);
    const { DialogComponent, onDialogClose, onDialogOpen } = useDialog();

    return (
        <React.Fragment>
            <div className={classes.card} onClick={onDialogOpen}
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}>
                <Typography variant="subtitle1">
                  {value.title}
                </Typography>
               { value.description && <Typography variant="subtitle2" component="p" color="textSecondary">
                  {value.description.length > 120 ? value.description.substr(0, 120) + '...' : value.description}
                </Typography>}
                <Box mt={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                    width="100%">
                   { value.dueDate && <Typography variant="body2" color="secondary" >
                        <Moment format="DD/MM/YYYY">
                            {value.dueDate}
                        </Moment>
                    </Typography> }
                    {
                        value?.tasks && value?.tasks.length > 0 &&
                        <Chip
                            size="small"
                            icon={<CheckBoxOutlined />}
                            label={`${numberOfDone} / ${value.tasks.length}`}
                            color="primary"
                         />
                    }
                </Box>
            </div>

            <DialogComponent>
                <CardDetails members={members} onDialogClose={onDialogClose} sprint = {value} projectId= {projectId} />
            </DialogComponent>
        </React.Fragment>
    )
}

const NewSprintContainer = ({aspect, members}: {aspect: AspectModel, members: string[]}) => {
    const classes = useStyle();
    const { PopoverComponent, handleClick, handleClose} = UsePopover();

    return (
        <React.Fragment>

            <Button aria-describedby="new_sprint_menu"  onClick={handleClick}
             className={classes.addCardButton} size="small">
                <AddCircleOutline className={classes.mr} />
                <span>Add A NEW sprint</span>
            </Button>

            <PopoverComponent id="new_sprint_menu">
                <NewSprint aspect = {aspect} handleClose = {handleClose} members={members} />
            </PopoverComponent>
        </React.Fragment>
    )
};


export { Sprint, NewSprintContainer };