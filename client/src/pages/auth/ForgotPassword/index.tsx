import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Grid,
    Box,
    Typography,
    Fab
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import Welcome from '../../../components/Welcome';
import logo from '../../../assets/logo48.png';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import MyTextField from '../../../components/MyTextField';


const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid Email')
});

const initialValue = { email: '' };

const ForgotPassword = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const gridBasicStyle = {  minHeight: '100vh', height: '100%'}

    return (
        <Grid container>
            <Grid item xs style={matches ? { padding: '3rem', ...gridBasicStyle} : { padding: '1.5rem', ...gridBasicStyle}}>
                <Box width="100%" pr={{ xs: 0, sm: 3, md: 5 }} height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <img src={logo} alt="app logo" /> <br />
                    <Typography variant="h4" className="fw-700 bg-text-primary" gutterBottom>
                         Forgot password?
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                       Fill in the form to reset your password
                    </Typography>
                    <Box mt={1} width="100%">
                        <ForgotPasswordForm />
                    </Box>
                </Box>
            </Grid>
            {matches && <Grid item xs={6}>
                <Welcome />
            </Grid>}
        </Grid>
    )
}

const ForgotPasswordForm = () => {

    return (
        <Formik initialValues={initialValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label className="bg-text-secondary">Email Address *</label>
                            <MyTextField
                                className="w-100"
                                placeholder="Enter your email"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                value={values.email}
                                error = {touched.email && !!errors.email} 
                                helperText = {touched.email && errors.email} />
                        </div>
                        <br />
                        <Fab type="submit" className="w-100" variant="extended" color="primary">
                         Send reset link
                        </Fab>
                        <br /> <br /> 
                        <Typography variant="subtitle2">
                            Return to <Link to="/login">sign in</Link>
                        </Typography>
                    </Form>
                )
            }
        </Formik>
    )
}

export default ForgotPassword;
