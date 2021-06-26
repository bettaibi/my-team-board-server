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
    name: yup.string().required('Default namespaces is required'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(6, 'password is too short'),
    confirmPassword: yup.string().required('Confirm your password').oneOf([yup.ref('password')], 'Password not match')
});

const initialValue = { email: '', password: '', name: '', confirmPassword:'' };

const Register = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const gridBasicStyle = {  minHeight: '100vh', height: '100%'}
    return (
        <Grid container>
            <Grid item xs style={matches ? { padding: '3rem', ...gridBasicStyle } : { padding: '1.5rem', ...gridBasicStyle}}>
                <Box width="100%" pr={{ xs: 0, sm: 3, md: 5 }} height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <img src={logo} alt="app logo" /> <br />
                    <Typography variant="h4" className="fw-700 bg-text-primary" gutterBottom>
                        Sign up
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    Already have an account? &nbsp;
                        <Link to="/login">Sign in</Link>
                    </Typography>
                    <Box mt={1} width="100%">
                        <RegisterForm />
                    </Box>
                </Box>
            </Grid>
            {matches && <Grid item xs={6}>
                <Welcome />
            </Grid>}
        </Grid>
    )
}

const RegisterForm = () => {

    return (
        <Formik initialValues={initialValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                                                <div className="form-group">
                            <label className="bg-text-secondary">Default namespace *</label>
                            <MyTextField
                                className="w-100"
                                placeholder="A default namespace should be created"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="name"
                                value={values.name}
                                error = {touched.name && !!errors.name} 
                                helperText = {touched.name && errors.name} />
                        </div>
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
                        <div className="form-group">
                            <label className="bg-text-secondary">Password *</label>
                            <MyTextField
                                className="w-100"
                                placeholder="Enter your password"
                                variant="outlined"
                                size="small"
                                type= 'password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password} 
                                error = {touched.password && !!errors.password} 
                                helperText = {touched.password && errors.password}/>
                        </div>
                        <div className="form-group">
                            <label className="bg-text-secondary">Confirm password *</label>
                            <MyTextField
                                className="w-100"
                                placeholder="Confirm password"
                                variant="outlined"
                                size="small"
                                type= 'password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="confirmPassword"
                                value={values.confirmPassword} 
                                error = {touched.confirmPassword && !!errors.confirmPassword} 
                                helperText = {touched.confirmPassword && errors.confirmPassword}/>
                        </div>
                        <Box className="text-right" mb={2}>
                          <Link to='/forgot-password'>Forgot password?</Link>
                        </Box>
                        <Fab type="submit" className="w-100" variant="extended" color="primary">
                             Create your free account
                        </Fab>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Register;
