import React from 'react';
import {
    Box,
    Typography,
    InputAdornment 
} from '@material-ui/core';
import { 
    LockOutlined
} from '@material-ui/icons';

import { Formik, Form } from 'formik';
import useMutation from '../../../hooks/useMutation';
import MyTextField from '../../../components/MyTextField';
import RoundedButton from '../../../components/RoundedButton';
import * as yup from 'yup';
import useDialog from '../../../hooks/useDialog';
import SessionExpired from './SessionExpired';

const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required').min(6, 'too short!'),
    newPassword: yup.string().required('Password is required').min(6, 'too short!')
});

const defaultValues = {
    currentPassword: '',
    newPassword: ''
};

const PasswordSetting = () => {
    const { loading, onMutate } = useMutation();
    const { DialogComponent, onDialogOpen, onDialogClose } = useDialog();

    async function submitHandler(values: any) {
        try{
            const res = await onMutate({
                url: `/settings/password`,
                method: 'PUT',
                data: values,
            });

            if(res.success){
                onDialogOpen();
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <>
        <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={(values) => submitHandler(values)}>
            {
                ({ handleChange, handleSubmit, handleBlur, values, touched, errors }) => (
                    <Box p={2} width="100%">
                        <Typography variant="h6" className="bg-text-primary fw-700" gutterBottom>
                          Security
                        </Typography>
                        <Typography variant="subtitle2">
                          Change your password
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            You can only change your password twice within 24 hours!
                        </Typography>

                        <Form onSubmit={handleSubmit} autoComplete="off">

                        <div className="form-group">
                            <label className="bg-text-secondary">Current password *</label>
                            <MyTextField
                                fullWidth
                                type="password"
                                placeholder="Enter your password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="currentPassword"
                                value={values.currentPassword}
                                error = {touched.currentPassword && !!errors.currentPassword} 
                                helperText = {touched.currentPassword && errors.currentPassword}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined className="icons" />
                                      </InputAdornment>
                                    ),
                                }} />
                        </div>

                        <div className="form-group">
                            <label className="bg-text-secondary">New password *</label>
                            <MyTextField
                                fullWidth
                                type="password"
                                placeholder="Enter your password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="newPassword"
                                value={values.newPassword}
                                error = {touched.newPassword && !!errors.newPassword} 
                                helperText = {touched.newPassword && errors.newPassword}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined className="icons" />
                                      </InputAdornment>
                                    ),
                                }} />
                        </div>
                            <Box textAlign="right">
                                <RoundedButton variant="contained" color="primary" type="submit">
                                   {loading ? 'Loading...' : 'Save'}
                                </RoundedButton>
                            </Box>
                        </Form>
                    </Box>
                )
            }
        </Formik>
        <DialogComponent>
            <SessionExpired onDialogClose = {onDialogClose} />
        </DialogComponent>
        </>
    )
}

export default PasswordSetting;
