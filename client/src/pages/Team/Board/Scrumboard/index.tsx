import React, { useState } from 'react';
import {
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';
import RoundedButton from '../../../../components/RoundedButton';
import clsx from 'clsx';
import {
    AppsOutlined,
    EditOutlined,
} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

import { DropResult, DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";

import { v4 } from 'uuid';
import useSidenav from '../../../../hooks/useSidenav';
import EditProject from './EditProject';
import {Aspect, NewAspectContainer} from './Aspect';
import { NewSprintContainer } from './Sprint';

const aspects = [
    {
        _id: v4(),
        title: 'aspect 2',
        cards: [
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur' },
        ]
    },
    {
        _id: v4(),
        title: 'aspect 1',
        cards: [
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur' },
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
        ]
    },
    {
        _id: v4(),
        title: 'aspect 1',
        cards: [
            { dueDate: new Date(), _id: v4(), title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' }
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
                        state.map((item: any) => (
                            <Droppable droppableId={item._id} key={item._id}>
                                {
                                    (provided: DroppableProvided) => (
                                        <div className = {classes.aspect}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <Aspect cards={item.cards} />
                                            {provided.placeholder}

                                            <NewSprintContainer />
                                        </div>
                                    )
                                }
                            </Droppable>
                        ))
                    }
                </DragDropContext>
                {/* New Aspect */}
                <div className = {classes.aspect}>
                 <NewAspectContainer />
                </div>
            </Box>

        </Box>
    )
};

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
