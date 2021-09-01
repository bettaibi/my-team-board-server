import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../../components/MyTextField';
import useMutation from '../../../../../../hooks/useMutation';

import * as yup from 'yup';
import { useSharedContext } from '../../../../../../context';
import { newAspect } from '../../../../../../store/actions/board.actions';

const defaultValue = {
    title: ''
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const NewAspect = ({projectId, handleClose, members}: {members: string[], projectId: string, handleClose: () => void}) => {
    const { loading, onMutate } = useMutation();
    const { dispatch, selectedWorkspace } = useSharedContext();

    async function onSubmitHandler({title}: {title: string}){
        try{
            const res = await onMutate({
                url: '/aspects',
                method: 'POST',
                data: {
                    aspect: {title, project: projectId},
                    members,
                    workspace: selectedWorkspace
                }
            });

            if(res.success){
                handleClose();
                setTimeout(()=> {
                    dispatch(newAspect(projectId, res.data));
                },0);
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