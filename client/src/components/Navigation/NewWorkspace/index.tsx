import React from 'react';
import useDialog from '../../../hooks/useDialog';
import {
    IconButton,
    makeStyles,
    Box,
    Typography
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import WithTooltip from '../../WithTooltip';
import RoundedButton from '../../RoundedButton';
import MyTextField from '../../MyTextField';
import clsx from 'clsx';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required')
});

const defaultValue = {
    name: ''
};

const useStyles = makeStyles((theme) => ({
    mb: {
        marginBottom: theme.spacing(1)
    },
    mr: {
        marginRight: theme.spacing(1)
    },
    icons: {
        color: '#64748B'
    },
}));

const NewWorkspaceDialog = () => {
    const { DialogComponent, onDialogClose, onDialogOpen } = useDialog();
    const classes = useStyles();

    return (
        <React.Fragment>
            <WithTooltip title="New Workspace"
                text="Create a new workspace or switch to a different workspace by clicking on the icons above.">
                <IconButton className={classes.mb}
                    onClick={onDialogOpen}>
                    <Add className={classes.icons} />
                </IconButton>
            </WithTooltip>

            <DialogComponent>
                <NewWorkspace onDialogClose={onDialogClose} />
            </DialogComponent>
        </React.Fragment>
    )
}

const NewWorkspace = ({ onDialogClose }: { onDialogClose: () => void }) => {
    const classes = useStyles();

    return (
        <Formik initialValues={defaultValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Box p={2} borderBottom="1px solid lightgray" height="64px" textAlign="right">
                            <RoundedButton variant="outlined" color="default" className={clsx(classes.icons, classes.mr)}
                                onClick={onDialogClose} >Cancel</RoundedButton>
                            <RoundedButton disableElevation variant="contained" color="primary" type="submit">Save</RoundedButton>
                        </Box>
                        <Box p={2}>
                            <div className="form-group">
                                <label>Workspace's name</label>
                                <MyTextField name="name" placeholder="Workspace name" fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error = {touched.name && !!errors.name} 
                                    helperText = {touched.name && errors.name}
                                 />
                            </div>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
};


export default NewWorkspaceDialog;
