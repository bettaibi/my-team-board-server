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


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
})
const defaultValue = {
    title: '',
    description: '',
    dueDate: ''
}

const list = [
    {
        order: 1,
        value: 'this is task 1'
    },
    {
        order: 2,
        value: 'you have to complete this task as well'
    }
];

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
}
const CardDetails: React.FC<CardDetailsProps> = ({ onDialogClose }) => {
    const classes = useStyle();

    const ondragend = (result: DropResult) => {
        console.log(result);
        const { source, destination } = result;

        
    };

    return (
        <Formik initialValues={defaultValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleBlur, handleChange, errors, touched, values }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Box p={2} borderBottom="1px solid lightgray" className={classes.root}
                            display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                            <div>
                                <CardMenu />
                            </div>

                            <div>
                                <RoundedButton variant="outlined" className={classes.iconColor} size="medium"
                                    onClick={onDialogClose} style={{ marginRight: '0.5rem' }}>Cancel</RoundedButton>
                                <RoundedButton disableElevation variant="contained" color="primary" size="medium" type="submit">Save</RoundedButton>
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="form-group">
                                <Box mb={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <label>
                                        Checklist items
                                    </label>
                                    <NewCheckList />
                                </Box>
                                <DragDropContext onDragEnd={ondragend}>
                                    <CheckList />
                                </DragDropContext>
                            </div>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
}

const CheckList = () => {
    const classes = useStyle();
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <React.Fragment>
            <LinearProgress variant="determinate" value={20} style={{ marginBottom: '.25rem' }} />
            <Typography variant="body2" color="textSecondary" align="right">
                20%
            </Typography>

            <Droppable droppableId="reorderlist">
                {
                    (provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            {
                                list.map((item: any, index: number) => (
                                    <Draggable key={index + 'ddj'} index={index} draggableId={index+'item'}>
                                       {
                                            (providedDraggable: DraggableProvided) => (
                                                <div className={classes.checklist}
                                                    ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}>
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={handleChange}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                    <span className={clsx(classes.todo, {
                                                        'done': checked
                                                    })} >
                                                        {item.value}
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

const NewCheckList = () => {
    const { PopoverComponent, handleClick } = usePopover();

    return (
        <>
            <Tooltip title="New Item">
                <IconButton size="small" aria-describedby="new_checklist" onClick={handleClick}>
                    <AddCircleOutline />
                </IconButton>
            </Tooltip>
            <PopoverComponent id="new_checklist">
                <Box p={2}>
                    <div className="form-group">
                        <label>Add new item</label>
                        <MyTextField name="checklist" size="small" fullWidth placeholder="new Item"
                            type="text"
                            variant="outlined"
                            required={true}
                        />
                    </div>
                    <Button variant="contained" color="primary" size="small" fullWidth>Add</Button>
                </Box>
            </PopoverComponent>
        </>
    )
};

const CardMenu = () => {
    const { PopoverComponent, handleClick } = usePopover();

    return (
        <React.Fragment>
            <IconButton aria-describedby="card_menu" size="small" onClick={handleClick}>
                <MoreHorizOutlined />
            </IconButton>
            <PopoverComponent id="card_menu">
                <MenuItem style={{ padding: '1rem' }}>
                    Remove Card
                </MenuItem>
            </PopoverComponent>
        </React.Fragment>
    )
};

export default CardDetails;
