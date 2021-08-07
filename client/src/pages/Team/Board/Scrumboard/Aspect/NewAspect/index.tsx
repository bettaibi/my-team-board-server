import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../../components/MyTextField';
import useMutation from '../../../../../../hooks/useMutation';

import * as yup from 'yup';

const defaultValue = {
    title: ''
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const NewAspect = () => {
    const { loading, onMutate } = useMutation();

    async function onSubmitHandler({title}: {title: string}, resetForm: () => void){
        try{
            const res = await onMutate({
                url: '/aspects',
                method: 'POST',
                data: {title, project: '610aee9ba051e60b5c590502'}
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

export default NewAspect;