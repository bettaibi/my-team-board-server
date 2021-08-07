import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../../components/MyTextField';

import * as yup from 'yup';
import useMutation from '../../../../../../hooks/useMutation';

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const EditAspect = ({title, id}: {title: string, id: string}) => {
    const { loading, onMutate } = useMutation();

    const defaultValue = {
        title: title,
    };

    async function onSubmitHandler({title}: {title: string}){
        try{
            const res = await onMutate({
                url: `/aspects/${id}`,
                method: 'PUT',
                data: {title}
            });

            if(res.success){
              
            }
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <React.Fragment>
            <Formik initialValues={defaultValue} validationSchema={schema}
                 onSubmit={(values) => onSubmitHandler(values)}>
                {
                    ({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (

                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <Box p ={2}>
                            <div className="form-group">
                                <label>Aspect Title</label>
                                <MyTextField fullWidth variant="outlined" size="small" placeholder="title"
                                    onBlur={handleBlur}
                                    onChange= {handleChange}
                                    name="title"
                                    value={values.title}
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}  />
                            </div>

                            <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                               {loading? 'Loading...':'UPDATE'} 
                            </Button>
                            </Box>

                        </Form>
                    )
                }
            </Formik>

        </React.Fragment>
    )
};

export default EditAspect