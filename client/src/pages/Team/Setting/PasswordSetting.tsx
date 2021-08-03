import React from 'react';
import {
    Box,
    Typography,
    InputAdornment 
} from '@material-ui/core';
import { 
    MailOutline,
    LockOutlined
} from '@material-ui/icons';

import { Formik, Form } from 'formik';
import MyTextField from '../../../components/MyTextField';
import RoundedButton from '../../../components/RoundedButton';
import * as yup from 'yup';

const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required').min(6, 'too short!'),
    NewPassword: yup.string().required('Password is required').min(6, 'too short!')
});

const defaultValues = {
    currentPassword: '',
    NewPassword: ''
};

const PasswordSetting = () => {

    return (
        <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={(values) => console.log(values)}>
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
                                name="NewPassword"
                                value={values.NewPassword}
                                error = {touched.NewPassword && !!errors.NewPassword} 
                                helperText = {touched.NewPassword && errors.NewPassword}
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
                                    Save
                                </RoundedButton>
                            </Box>
                        </Form>
                    </Box>
                )
            }
        </Formik>
    )
}

export default PasswordSetting;
