import React from 'react';
import {
    Box,
    Typography,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Hidden,
    Avatar
} from '@material-ui/core';
import {
    Facebook,
    GitHub,
    LinkedIn
} from '@material-ui/icons';
import userAvatar from '../../../assets/avatars/Henderson.jpg';
import { Formik, Form } from "formik";
import MyTextField from '../../../components/MyTextField';
import * as yup from "yup";
import clsx from 'clsx';

const InitialValue = {
    fullName: '',
    email: '',
    country: '',
    city: '',
    title: '',
    phone: '',
    address: ''
};

const schema = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    title: yup.string().required('Title is required')
});

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        borderRadius: 10,
        boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
        backgroundColor: "#fff",
    },
    largeAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(1)
    },
    iconColor: {
        color: '#64748B'
    }
}))

const BasicInfos = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>
                <Box component="div" p={2} className={clsx(classes.card)}
                    display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Avatar alt="user profile" src={userAvatar} className={classes.largeAvatar} />
                    <Typography variant="h6">
                        Nidhal Bettaibi
                    </Typography>
                    <Typography variant="body2" className={classes.iconColor} gutterBottom>
                        bettaibinidhal00@gmail.com
                    </Typography>
                    <Box mt={1}>
                        <IconButton size="small" className={classes.iconColor}>
                            <Facebook />
                        </IconButton>
                        <IconButton size="small" className={classes.iconColor}>
                            <GitHub />
                        </IconButton>
                        <IconButton size="small" className={classes.iconColor}>
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs>
                <ProfileDetails />
            </Grid>
        </Grid>
    )
}

const ProfileDetails = () => {
    const classes = useStyles();

    return (
        <Formik initialValues={InitialValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off" >
                        <Box className={clsx(classes.card)} mb={2} overflow="hidden">
                            <Box p={2} borderBottom="1px solid lightgray" component="div">
                                <Typography variant="subtitle1">
                                    General Information
                                </Typography>
                            </Box>
                            <Box p={2} component="div">
                                <div className="form-group">
                                    <label>Full name</label>
                                    <MyTextField fullWidth name="fullName" variant="outlined" size="small" placeholder="member's name"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.fullName}
                                        error={touched.fullName && !!errors.fullName}
                                        helperText={touched.fullName && errors.fullName} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <MyTextField fullWidth name="email" variant="outlined" size="small" placeholder="member's Email"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.email}
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email} />
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <MyTextField fullWidth name="title" variant="outlined" size="small" placeholder="member's title"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.title}
                                        error={touched.title && !!errors.title}
                                        helperText={touched.title && errors.title} />
                                </div>
                            </Box>
                        </Box>

                        <Box className={classes.card} overflow="hidden">
                            <Box p={2} borderBottom="1px solid lightgray" component="div">
                                <Typography variant="subtitle1">
                                    Contact
                                </Typography>
                            </Box>
                            <Box p={2} component="div">
                                <div className="form-group">
                                    <label>Address</label>
                                    <MyTextField multiline rows={3} fullWidth name="address" variant="outlined" size="small" placeholder="member's address"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <MyTextField fullWidth name="country" variant="outlined" size="small" placeholder="member's country"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <MyTextField fullWidth name="city" variant="outlined" size="small" placeholder="member's city"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <MyTextField fullWidth name="title" variant="outlined" size="small" placeholder="member's phone"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                            </Box>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
};



export default BasicInfos;
