import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
    IconButton,
    Badge,
    MenuItem
} from '@material-ui/core';
import UsePopover from '../../../../../hooks/usePopover';
import {
    MoreVertOutlined,
    DeleteOutline,
    Add
} from "@material-ui/icons";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Sprint } from '../Sprint';
import EditAspect from './EditAspect';
import NewAspect from './NewAspect';
import useConfirmDialog from '../../../../../hooks/useConfirmDialog';
import { useNotificationContext } from '../../../../../context/NotificationContext';

const useStyle = makeStyles((theme) => ({
    iconColor: {
        color: '#64748B'
    },
    newAspect: {
        color: '#64748B',
        cursor: 'pointer',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mr: {
        marginRight: theme.spacing(1)
    },
    aspectTitle: {
        cursor: 'pointer',
    }
}));

const Aspect = ({ cards }: { cards: any[] }) => {
    const classes = useStyle();
    const { PopoverComponent, handleClick, handleClose } = UsePopover();

    return (
        <>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <EditAspectContainer />

                <Box display="flex" flexDirection="row" alignItems="center">
                    <Badge badgeContent={cards.length} color="primary" style={{ marginRight: '1rem' }} />

                    <IconButton size="small" aria-describedby="simple_menu" onClick={handleClick}>
                        <MoreVertOutlined />
                    </IconButton>

                    <PopoverComponent id="simple_menu">
                     <DeleteAspectContainer />
                    </PopoverComponent>

                </Box>
            </Box>
            <React.Fragment>
                {
                    cards.map((item: any, index: number) => (
                        <Draggable key={item._id} index={index} draggableId={item._id}>
                            {
                                (providedDraggable: DraggableProvided) => (
                                    <Sprint value={item.title} providedDraggable={providedDraggable} />
                                )
                            }
                        </Draggable>
                    ))
                }
            </React.Fragment>
        </>
    )
};

const DeleteAspectContainer = () => {
    const classes = useStyle();
    const { ConfirmDialog, handleOpen, handleClose } = useConfirmDialog({
        onConfirmClick: onDelete,
        message: 'Are you sure you want to delete this aspect.',
    });
    const { showMsg } = useNotificationContext();

    async function onDelete(){
        console.log('onDelete');
    }

    return (
        <React.Fragment>
            <MenuItem onClick={handleOpen} style={{ padding: '1rem' }}>
                        <DeleteOutline className={classes.iconColor} />
                        <span style={{ marginLeft: '0.8rem' }}>Delete List</span>
            </MenuItem>
            <ConfirmDialog />
        </React.Fragment>
    )
};

const EditAspectContainer = () => {
    const classes = useStyle();
    const { PopoverComponent, handleClick } = UsePopover();

    return (
        <React.Fragment>
            <Typography variant="subtitle2" aria-describedby="edit_aspect_menu"
                onClick={handleClick} className={classes.aspectTitle}>Aspect</Typography>

            <PopoverComponent id="edit_aspect_menu">
                <EditAspect />
            </PopoverComponent>
        </React.Fragment>
    )
};

const NewAspectContainer = () => {
    const classes = useStyle();
    const { PopoverComponent, handleClick } = UsePopover();

    return (
        <React.Fragment>
            <Box aria-describedby="new_aspect_menu" className={classes.newAspect}
                onClick={handleClick} >
                <Add className={classes.mr} />
                <span>New Aspect</span>
            </Box>

            <PopoverComponent id="new_aspect_menu">
                <NewAspect />
            </PopoverComponent>
        </React.Fragment>
    )
};

export { Aspect, NewAspectContainer };