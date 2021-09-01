import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Grid,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Fab
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { LoginModel } from '../../../models/auth.model';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

import Welcome from '../../../components/Welcome';
import logo from '../../../assets/logo48.png';
import * as yup from 'yup';
import useToggle from '../../../hooks/useToggle';
import MyTextField from '../../../components/MyTextField';
import axios from 'axios';
import useSnackbar from '../../../hooks/useSnackbar';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(6, 'password is too short')
});

const initialValue = { email: '', password: '' };

const Login = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const gridBasicStyle = { minHeight: '100vh', height: '100%' }

    return (
        <Grid container>
            <Grid item xs style={matches ? { padding: '3rem', ...gridBasicStyle } : { padding: '1.5rem', ...gridBasicStyle }}>
                <Box width="100%" pr={{ xs: 0, sm: 3, md: 5 }} height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <img src={logo} alt="app logo" /> <br />
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
    const { SnackbarComponent, showMsg } = useSnackbar();
    const [loading, setLoading] = React.useState<boolean>(false);
    const history = useHistory();

    async function handleSubmit(values: LoginModel, resetForm: () => void) {
        try {
                setLoading(true)
                const { data } = await axios.post(`/auth/login`, values);
                if(data.success) {
                    showMsg(data.message, 'success');
                    resetForm();
                    setTimeout(()=> {
                        history.push('/team')
                    },1000);
                }
                else{
                    setLoading(false);
                    showMsg(data.message, 'error');
                }
        }
        catch (err) {
            setLoading(false);
            showMsg("No valid credentials", 'error');
        }
    };

    return (
        <React.Fragment>
            <Formik initialValues={initialValue} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
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
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email} />
                            </div>
                            <div className="form-group">
                                <label className="bg-text-secondary">Password *</label>
                                <MyTextField
                                    className="w-100"
                                    placeholder="Enter your password"
                                    variant="outlined"
                                    size="small"
                                    type={show ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    value={values.password}
                                    error={touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton size="small" onClick={toggle}>
                                                {show ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }} />
                            </div>
                            <Box className="text-right" mb={2}>
                                <Link to='/forgot-password'>Forgot password?</Link>
                            </Box>

                            <Fab disabled={loading} type="submit" className="w-100" variant="extended" color="primary">{loading?'Loading...':'Sign in'}</Fab>
                        </Form>
                    )
                }
            </Formik>
            <SnackbarComponent />
        </React.Fragment>
    )
}

export default Login;
