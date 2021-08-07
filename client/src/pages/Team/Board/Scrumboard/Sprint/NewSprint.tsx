import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../components/MyTextField';

import * as yup from 'yup';
import useMutation from '../../../../../hooks/useMutation';

const defaultValue = {
    title: ''
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const NewSprint = () => {
    const { loading, onMutate } = useMutation();

    async function onSubmitHandler({title}: {title: string}, resetForm: () => void){
        try{
            const res = await onMutate({
                url: '/sprint',
                method: 'POST',
                data: {title, aspect: '610e6d68026a362ec0e13038'}
            });

            if(res.success){
                resetForm();
            }
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <React.Fragment>
            <Formik initialValues={defaultValue} validationSchema={schema}
                onSubmit={(values, { resetForm }) => onSubmitHandler(values, resetForm)}>
                {
                    ({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (

                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <Box p ={2}>
                            <div className="form-group">
                                <label>New Sprint</label>
                                <MyTextField fullWidth variant="outlined" size="small" placeholder="title"
                                    onBlur={handleBlur}
                                    onChange= {handleChange}
                                    name="title"
                                    value={values.title}
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}  />
                            </div>

                            <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                                {loading? 'Loading...':'ADD'}
                            </Button>
                            </Box>

                        </Form>
                    )
                }
            </Formik>

        </React.Fragment>
    )
};

export default NewSprint;