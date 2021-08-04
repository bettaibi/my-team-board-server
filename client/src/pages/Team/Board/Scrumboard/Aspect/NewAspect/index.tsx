import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../../components/MyTextField';

import * as yup from 'yup';

const defaultValue = {
    title: ''
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const NewAspect = () => {

    return (
        <React.Fragment>
            <Formik initialValues={defaultValue} validationSchema={schema}
                onSubmit={(values) => console.log(values)}>
                {
                    ({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (

                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <Box p ={2}>
                            <div className="form-group">
                                <label>New Aspect</label>
                                <MyTextField fullWidth variant="outlined" size="small" placeholder="title"
                                    onBlur={handleBlur}
                                    onChange= {handleChange}
                                    name="title"
                                    value={values.title}
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}  />
                            </div>

                            <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                                ADD
                            </Button>
                            </Box>

                        </Form>
                    )
                }
            </Formik>

        </React.Fragment>
    )
};

export default NewAspect;