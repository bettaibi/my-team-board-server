import React from 'react';
import {
    Box,
    Button,
    LinearProgress,
    Typography,
    IconButton,
    MenuItem,
    Tooltip,
    Checkbox,
    makeStyles
} from '@material-ui/core';
import {
    MoreHorizOutlined,
    AddCircleOutline,
    DragHandleOutlined
} from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import MyTextField from '../../../../../components/MyTextField';
import RoundedButton from '../../../../../components/RoundedButton';
import usePopover from '../../../../../hooks/usePopover';
import clsx from 'clsx';
import { DropResult, DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import { SprintModel, TaskModel } from '../../../../../models/app.model';
import useMutation from '../../../../../hooks/useMutation';
import useConfirmDialog from '../../../../../hooks/useConfirmDialog';
import { useSharedContext } from '../../../../../context';
import { deleteSprint, editSprint } from '../../../../../store/actions/board.actions';


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

const checklistSchema = yup.object().shape({
    description: yup.string().required('task description is required'),
});

function some(array: TaskModel[]): number{
    let s = 0;
    for(let item of array){
        if(item.done){ s++; }
    }
    return s;
}

const useStyle = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        minWidth: "540px",
        height: '64px',
        [theme.breakpoints.down('xs')]: {
            minWidth: "100%"
        },
    },
    content: {
        overflow: "auto",
        height: "520px",
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 64px)',
        }
    },
    checklist: {
        boxShadow: '0 1px 2px 0 #0000000d',
        backgroundColor: theme.palette.common.white,
        borderRadius: 4,
        border: '1px solid #ced4da',
        marginTop: theme.spacing(1),
        padding: '0.4rem 0',
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: '#333',
        flexGrow: 1,
        fontSize: '14px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px'
        },
        '&.done': {
            textDecoration: 'line-through'
        }
    },
    iconColor: {
        color: '#64748B'
    },
}));

interface CardDetailsProps {
    onDialogClose: () => void;
    sprint: SprintModel,
    projectId: string;
    members: string[]
}
const CardDetails: React.FC<CardDetailsProps> = ({ onDialogClose, sprint, projectId, members }) => {
    const classes = useStyle();
    const [list, setList] = React.useState<TaskModel[]>(sprint.tasks || []);
    const { onMutate, loading } = useMutation();
    const { dispatch, selectedWorkspace} = useSharedContext();

    const defaultValue = {
        ...sprint,
        dueDate: sprint.dueDate || new Date()
    };

    const ondragend = (result: DropResult) => {
        const { source, destination } = result;
    };

    async function onSubmitHandler(values: SprintModel) {
        try {
            const obj = {
                ...sprint,
                ...values,
                tasks: list
            };
            const res = await onMutate({
                url: `/sprint/${sprint._id}`,
                method: 'PUT',
                data: {
                    sprint: obj,
                    workspace: selectedWorkspace,
                    projectId: projectId,
                    members
                }
            });
            if(res.success){
                onDialogClose();

                setTimeout(()=> {
                    dispatch(editSprint(projectId, obj));
                },0);
            }
        }
        catch (err) {

        }
    }

    return (
        <Formik initialValues={defaultValue} validationSchema={schema} onSubmit={(values) => onSubmitHandler(values)}>
            {
                ({ handleSubmit, handleBlur, handleChange, errors, touched, values }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Box p={2} borderBottom="1px solid lightgray" className={classes.root}
                            display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                            <div>
                                <CardMenu members={members} currentSprint={sprint} projectId = {projectId} />
                            </div>

                            <div>
                                <RoundedButton variant="outlined" className={classes.iconColor} size="medium"
                                    onClick={onDialogClose} style={{ marginRight: '0.5rem' }}>Cancel</RoundedButton>
                                <RoundedButton disableElevation variant="contained" color="primary" size="medium" type="submit">{loading ? 'Loading...' : 'Save'}</RoundedButton>
                            </div>
                        </Box>

                        <Box p={2} className={clsx('content-scroll', classes.content)} >
                            <div className="form-group">
                                <label>Title *</label>
                                <MyTextField name="title" size="small" fullWidth placeholder="Card title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <MyTextField name="description" size="small" fullWidth placeholder="Description"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    multiline
                                    rows={3}
                                    value={values.description}
                                />
                            </div>
                            <div className="form-group">
                                <label>Due Date</label>
                                <MyTextField name="dueDate" size="small" fullWidth placeholder="Due date"
                                    type="date"
                                    variant="outlined"
                                    value={values.dueDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="form-group">
                                <Box mb={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <label>
                                        Checklist items
                                    </label>
                                    <NewCheckList setList={setList} />
                                </Box>
                                <DragDropContext onDragEnd={ondragend}>
                                    <CheckList list={list}  setList={setList} />
                                </DragDropContext>
                            </div>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
}

const CheckList = ({ list, setList }: { list: TaskModel[],  setList: React.Dispatch<React.SetStateAction<TaskModel[]>> }) => {
    const classes = useStyle();

    let countDone = some(list);

    let percentage = list.length === 0 ? 0 : Math.trunc((countDone *  100)/ list.length);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, order: number) => {
        setList((state: TaskModel[])=> {
            return state.map((item: TaskModel) => {return item.order === order? {
                ...item, done: event.target.checked
            }: item});
        })
    };

    return (
        <React.Fragment>
            <LinearProgress variant="determinate" value={percentage} style={{ marginBottom: '.25rem' }} />
            <Typography variant="body2" color="textSecondary" align="right">
                {percentage} %
            </Typography>

            <Droppable droppableId="reorderlist">
                {
                    (provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            {
                                list.map((item: TaskModel, index: number) => (
                                    <Draggable key={index + 'ddj'} index={index} draggableId={index + 'item'}>
                                        {
                                            (providedDraggable: DraggableProvided) => (
                                                <div className={classes.checklist}
                                                    ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}>
                                                    <Checkbox
                                                        checked={item.done}
                                                        onChange={(e)=> handleChange(e, item.order)}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                    <span className={clsx(classes.todo, {
                                                        'done': item.done
                                                    })} >
                                                        {item.description}
                                                    </span>
                                                    <IconButton >
                                                        <DragHandleOutlined />
                                                    </IconButton>
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }

                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </React.Fragment>
    )
}

const NewCheckList = ({ setList }: { setList: React.Dispatch<React.SetStateAction<TaskModel[]>> }) => {
    const { PopoverComponent, handleClick } = usePopover();

    const defaultCheckListItem = {
        description: ''
    };

    async function onSubmitHandler({description}: {description: string}){
        try{
            setList((state: TaskModel[]) => {return [...state, {description, done: false, order: state.length+1}]});
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <Tooltip title="New Item">
                <IconButton size="small" aria-describedby="new_checklist" onClick={handleClick}>
                    <AddCircleOutline />
                </IconButton>
            </Tooltip>
            <PopoverComponent id="new_checklist">
                <Box p={2}>
                    <Formik validationSchema={checklistSchema} initialValues={defaultCheckListItem}
                        onSubmit={(values) => onSubmitHandler(values)}>
                        {
                            ({ handleSubmit, handleBlur, handleChange, touched, errors, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Add new item</label>
                                        <MyTextField fullWidth name="description" variant="outlined" size="small" placeholder="task description..."
                                            onChange={handleChange} onBlur={handleBlur}
                                            value={values.description}
                                            multiline
                                            rows={2}
                                            error={touched.description && !!errors.description}
                                            helperText={touched.description && errors.description} />
                                    </div>
                                    <Button type="submit" variant="contained" color="primary" size="small" fullWidth>Add</Button>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </PopoverComponent>
        </>
    )
};

const CardMenu = ({ currentSprint, projectId, members }: {members: string[], currentSprint: SprintModel, projectId: string }) => {
    const { PopoverComponent, handleClick, handleClose: closeMenu } = usePopover();
    const { ConfirmDialog, handleOpen, handleClose } = useConfirmDialog({
        onConfirmClick: onDelete,
        message: 'Are you sure you want to delete this sprint.',
    });
    const { onMutate } = useMutation();
    const { dispatch, selectedWorkspace } = useSharedContext();

    async function onDelete() {
        try {
            const res = await onMutate({
                url: `/sprint/${currentSprint._id}`,
                method: 'PATCH',
                data: {
                    projectId,
                    workspace: selectedWorkspace,
                    members
                }
            });

            if (res.success) {
                handleClose();
                setTimeout(() =>{
                    dispatch(deleteSprint(projectId ,currentSprint));
                },0);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <IconButton aria-describedby="card_menu" size="small" onClick={handleClick}>
                <MoreHorizOutlined />
            </IconButton>
            <PopoverComponent id="card_menu">
                <MenuItem style={{ padding: '1rem' }} onClick={() => { handleOpen(); closeMenu() }}>
                    Remove Card
                </MenuItem>
            </PopoverComponent>
            <ConfirmDialog />
        </React.Fragment>
    )
};

export default CardDetails;
