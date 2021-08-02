import React, { useState } from 'react';
import {
    Box,
    Typography,
    makeStyles,
    IconButton,
    Badge,
    Button,
    MenuItem,
    Chip
} from '@material-ui/core';
import RoundedButton from '../../../../components/RoundedButton';
import clsx from 'clsx';
import {
    AppsOutlined,
    EditOutlined,
    MoreVertOutlined,
    AddCircleOutline,
    DeleteOutline,
    CheckBoxOutlined
} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import UsePopover from '../../../../hooks/usePopover';

import { DropResult, DragDropContext, Droppable, Draggable, DroppableProvided, DroppableStateSnapshot, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";
import useDialog from '../../../../hooks/useDialog';
import CardDetails from './CardDetails';
import { v4 } from 'uuid';
import Moment from 'react-moment';
import useSidenav from '../../../../hooks/useSidenav';
import EditProject from './EditProject';

const aspects = [
    {
        id: v4(),
        title: 'aspect 2',
        cards: [
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur' },
        ]
    },
    {
        id: v4(),
        title: 'aspect 1',
        cards: [
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur' },
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
        ]
    },
    {
        id: v4(),
        title: 'aspect 1',
        cards: [
            { dueDate: new Date(), id: v4(), value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' }
        ]
    }
]

const useStyle = makeStyles((theme) => ({
    header: {
        padding: '1.5rem 1rem',
        borderBottom: "1px solid lightgray",
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            gap: '0.5rem',
        },
    },
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(1)
    },
    aspect: {
        backgroundColor: '#e6ebf1',
        padding: theme.spacing(1),
        borderRadius: 10,
        width: '288px',
        minWidth: '288px',
        marginRight: '1rem',
        height: 'fit-content',
        '&:last-child': {
            marginRight: 0,
        }
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

const Scrumboard = (props: any) => {
    const classes = useStyle();
    const history = useHistory();
    const [state, setState] = useState<any[]>(aspects);

    console.log(props.match.params.projectId)
    const goBack = () => {
        history.goBack();
    }

    const handleDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // const dropbaleId: string = source.droppableId;
        // // Creating a copy of item before removing it from state
        // const itemCopy = state[dropbaleId].cards[source.index]

        // setState(prev => {
        //   prev = {...prev}
        //   // Remove from previous items array
        //   prev[source.droppableId].items.splice(source.index, 1)


        //   // Adding to new items array location
        //   prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

        //   return prev
        // })
    }

    return (
        <Box display="flex" flexDirection="column" overflow="hidden">
            <Box className={clsx('bg-white', classes.header)} display="flex"
                flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" className="bg-text-primary fw-700">
                    Project name
                </Typography>
                <Box>
                    <RoundedButton variant="outlined" className={clsx(classes.iconColor, classes.mr)} size="medium"
                        onClick={goBack}>
                        <AppsOutlined className={classes.mr}></AppsOutlined>
                        <span>Boards</span>
                    </RoundedButton>
                    <EditProjectDialog />
                </Box>
            </Box>

            {/* Cards */}
            <Box p={2} display="flex" flexDirection="row" overflow="auto">
                <DragDropContext onDragEnd={handleDragEnd} >
                    {
                        state.map((item: any, index: number) => (
                            <Droppable droppableId={item.id} key={item.id}>
                                {
                                    (provided: DroppableProvided) => (
                                        <div className={classes.aspect}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <Aspect cards={item.cards} />
                                            {provided.placeholder}

                                            <Button className={classes.addCardButton} size="small">
                                                <AddCircleOutline className={classes.mr} />
                                                <span>Add another card</span>
                                            </Button>
                                        </div>
                                    )
                                }
                            </Droppable>
                        ))
                    }
                </DragDropContext>
            </Box>

        </Box>
    )
};

const Aspect = ({ cards }: { cards: any[] }) => {
    const classes = useStyle();
    const { PopoverComponent, handleClick, handleClose } = UsePopover();

    return (
        <>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Aspect</Typography>
                <Box>
                    <Badge badgeContent={cards.length} color="primary" style={{ marginRight: '1rem' }} />

                    <IconButton size="small" aria-describedby="simple_menu" onClick={handleClick}>
                        <MoreVertOutlined />
                    </IconButton>

                    <PopoverComponent id="simple_menu">
                        <MenuItem onClick={handleClose} style={{ padding: '1rem' }}>
                            <DeleteOutline className={classes.iconColor} />
                            <span style={{ marginLeft: '0.8rem' }}>Delete List</span>
                        </MenuItem>
                    </PopoverComponent>
                </Box>
            </Box>
            <React.Fragment>
                {
                    cards.map((item: any, index: number) => (
                        <Draggable key={item.id} index={index} draggableId={item.id}>
                            {
                                (providedDraggable: DraggableProvided) => (
                                    <Card value={item.value} providedDraggable={providedDraggable} />
                                )
                            }
                        </Draggable>
                    ))
                }
            </React.Fragment>
        </>
    )
};

interface CardProps {
    providedDraggable: DraggableProvided;
    value: string;
}
const Card: React.FC<CardProps> = ({ providedDraggable, value }) => {
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
                        <Moment format="YYYY/MM/DD">
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

const EditProjectDialog = () => {
    const { onSidenavClose, onSidenavOpen, SidenavComponent } = useSidenav('right', 'persistent');
    const classes = useStyle();

    return (
        <React.Fragment>
            <RoundedButton onClick={onSidenavOpen}
             disableElevation variant="contained" color="primary" size="medium">
                <EditOutlined className={classes.mr}></EditOutlined>
                <span>Edit Board</span>
            </RoundedButton>
            <SidenavComponent>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 56px)', marginTop: '56px', }}>
                    <EditProject onSidenavClose={onSidenavClose} />
                </div>
            </SidenavComponent>
        </React.Fragment>
    )
};

export default Scrumboard;
