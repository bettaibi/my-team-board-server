import React, { useEffect } from 'react';
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
import {Aspect, NewAspectContainer} from './Aspect';

import { DropResult, DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { NewSprintContainer } from './Sprint';
import { useSharedContext } from '../../../../context';
import { useSelector } from 'react-redux';
import { AppState, BoardModel, ProjectModel } from '../../../../models/app.model';
import { newBoard } from '../../../../store/actions/board.actions';

import useSidenav from '../../../../hooks/useSidenav';
import EditProject from './EditProject';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 56px )',
        overflow: 'hidden'
    },
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
    let projectId = props.match.params.projectId;
    const board: BoardModel | undefined = useSelector((state: AppState) => state.boards).find((item: BoardModel) => item.project._id === projectId);
    const { dispatch } = useSharedContext();
    
    useEffect(() => {
        const fetchBoard = async () =>{
            try{
                const {data} = await axios.get(`/aspects/${projectId}`);
                if(data.success) {
                    console.log("***** from server *****")
                    dispatch(newBoard(data.data));
                }
            }
            catch(err){
                console.error(err);
            }
        };

        if(!board){
            fetchBoard();
        }
    }, []);

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

    if(!board) return null;

    return (
        <Box display="flex" flexDirection="column" className={classes.root}>
            <Box className={clsx('bg-white', classes.header)} display="flex"
                flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" className="bg-text-primary fw-700">
                   {board.project.title}
                </Typography>
                <Box>
                    <RoundedButton variant="outlined" className={clsx(classes.iconColor, classes.mr)} size="medium"
                        onClick={goBack}>
                        <AppsOutlined className={classes.mr}></AppsOutlined>
                        <span>Boards</span>
                    </RoundedButton>
                    <EditProjectDialog project = {board.project} />
                </Box>
            </Box>

            {/* Cards */}
            <Box p={2} display="flex" flexDirection="row" overflow="auto" height="100%">
                <DragDropContext onDragEnd={handleDragEnd} >
                    {
                        board.aspects.map((item: any) => (
                            <Droppable droppableId={item._id} key={item._id}>
                                {
                                    (provided: DroppableProvided) => (
                                        <div className = {classes.aspect}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}>

                                            <Aspect aspect = {item} />
                                            {provided.placeholder}

                                            <NewSprintContainer aspectId = {item._id || ''} />
                                        </div>
                                    )
                                }
                            </Droppable>
                        ))
                    }
                </DragDropContext>
                {/* New Aspect */}
                <div className = {classes.aspect}>
                 <NewAspectContainer projectId = {board.project._id || ''} />
                </div>
            </Box>

        </Box>
    )
};

const EditProjectDialog = ({project}: {project: ProjectModel}) => {
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
                    <EditProject onSidenavClose={onSidenavClose} project = {project} />
                </div>
            </SidenavComponent>
        </React.Fragment>
    )
};

export default Scrumboard;
