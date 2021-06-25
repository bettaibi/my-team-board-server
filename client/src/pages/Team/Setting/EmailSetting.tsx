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
    email: yup.string().required('Email is required').email('Invalid Email'),
    newEmail: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(6, 'too short!')

});
const defaultValues = {
    email: '',
    newEmail: '',
    password: ''
};

const EmailSetting = () => {

    return (
        <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleChange, handleSubmit, handleBlur, values, touched, errors }) => (
                    <Box p={2} width="100%">
                        <Typography variant="h6" className="bg-text-primary fw-700" gutterBottom>
                             Account
                        </Typography>
                        <Typography variant="subtitle2">
                             Email Settings
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                             Manage your private information
                        </Typography>

                        <Form onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label className="bg-text-secondary">Email Address *</label>
                            <MyTextField
                                fullWidth
                                placeholder="Enter your email"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                value={values.email}
                                error = {touched.email && !!errors.email} 
                                helperText = {touched.email && errors.email}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <MailOutline className="icons" />
                                      </InputAdornment>
                                    ),
                                }}
                                />
                        </div>

                        <div className="form-group">
                            <label className="bg-text-secondary">New Email *</label>
                            <MyTextField
                                fullWidth
                                placeholder="Enter a new email"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="newEmail"
                                value={values.newEmail}
                                error = {touched.newEmail && !!errors.newEmail} 
                                helperText = {touched.newEmail && errors.newEmail} 
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined className="icons" />
                                      </InputAdornment>
                                    ),
                                }}
                                />
                        </div>

                        <div className="form-group">
                            <label className="bg-text-secondary">Password *</label>
                            <MyTextField
                                fullWidth
                                placeholder="Enter your password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password}
                                error = {touched.password && !!errors.password} 
                                helperText = {touched.password && errors.password}
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

export default EmailSetting;
