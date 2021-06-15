import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment

} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import {
    withStyles,
    Theme
} from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Welcome from '../../../components/Welcome';
import logo from '../../../assets/logo64.png';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import useToggle from '../../../hooks/useToggle';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(6, 'password is too short')
});

const initialValue = { email: '', password: '' };

const RoundedButton = withStyles((theme: Theme) => ({
    root: {
      borderRadius: '9999px'
    },
}))(Button);

const Login = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid container>
            <Grid item xs style={matches ? { padding: '3rem' } : { padding: '1.5rem', height: '100vh'}}>
                <Box width="100%" pr={{ xs: 0, sm: 3, md: 5 }} height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <img src={logo} alt="app logo" />
                    <Typography variant="h4" className="fw-700 bg-text-primary" gutterBottom>
                        Sign in
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Don't have an account? &nbsp;
                        <Link to="/register">Sign up</Link>
                    </Typography>
                    <Box mt={1} width="100%">
                        <LoginForm />
                    </Box>
                </Box>
            </Grid>
            {matches && <Grid item xs={6}>
                <Welcome />
            </Grid>}
        </Grid>
    )
}

const LoginForm = () => {
    const { show, toggle } = useToggle();

    return (
        <Formik initialValues={initialValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label className="bg-text-secondary">Email Address *</label>
                            <TextField
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
                            <TextField
                                className="w-100"
                                placeholder="Enter your password"
                                variant="outlined"
                                size="small"
                                type={show?'text': 'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password} 
                                error = {touched.password && !!errors.password} 
                                helperText = {touched.password && errors.password}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton size="small" onClick={toggle}>
                                            {show ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                                        </IconButton>
                                    </InputAdornment>,
                                }}/>
                        </div>
                        <Box className="text-right" mb={2}>
                          <Link to='/forgot-password'>Forgot password?</Link>
                        </Box>
                        <RoundedButton size="large" className="w-100" type="submit" variant="contained" color="primary">Sign in</RoundedButton>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Login;
