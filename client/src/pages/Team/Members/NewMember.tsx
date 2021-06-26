import React from 'react';
import { Formik, Form } from "formik";
import {
    Typography,
    Box,
} from '@material-ui/core';
import * as yup from "yup";
import MyTextField from '../../../components/MyTextField';
import RoundedButton from '../../../components/RoundedButton';

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
    title: yup.string().required('Name is required')
});

interface NewMemberProps {
    onSidenavClose: () => void;
}

const NewMember: React.FC<NewMemberProps> = ({ onSidenavClose }) => {

    return (
        <Formik initialValues={InitialValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off" >
                        <Box style={{ backgroundColor: '#f1f5f9', padding: '2.5rem 1rem' }} borderBottom="1px solid #fafafa"
                            display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            
                            <div></div>
                            <Box>
                            <RoundedButton className="bg-text-secondary" onClick={onSidenavClose} variant="outlined" color="default" size="medium" type="button">
                                Cancel
                            </RoundedButton>
                            <RoundedButton disableElevation size="medium" type="submit" style={{ marginLeft: '0.5rem' }} variant="contained" color="primary">
                                Save
                            </RoundedButton>
                            </Box>
                        </Box>
                        <Box style={{ padding: '1rem 1rem 0 1rem' }}>
                            <Typography variant="subtitle1" className="bg-text-primary fw-700">
                                Basic Information
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                All infos are required
                            </Typography>
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
                            <Typography variant="subtitle1" className="bg-text-primary fw-700">
                                Extra Information
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Optional Infos
                            </Typography>
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
                    </Form>
                )
            }
        </Formik>
    )
}

export default NewMember;