import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../components/MyTextField';

import * as yup from 'yup';
import useMutation from '../../../../../hooks/useMutation';
import { useSharedContext } from '../../../../../context';
import { newSprint } from '../../../../../store/actions/board.actions';
import { AspectModel } from '../../../../../models/app.model';

const defaultValue = {
    title: ''
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const NewSprint = ({aspect, handleClose, members}: {members: string[], aspect: AspectModel, handleClose: () => void}) => {
    const { loading, onMutate } = useMutation();
    const { dispatch, selectedWorkspace } = useSharedContext();

    async function onSubmitHandler({title}: {title: string}){
        try{
            const res = await onMutate({
                url: '/sprint',
                method: 'POST',
                data: {
                    sprint: {title, aspect: aspect._id},
                    workspace: selectedWorkspace,
                    projectId: aspect.project,
                    members
                }
            });

            if(res.success){
               handleClose();
               setTimeout(() => {
                dispatch(newSprint(aspect?.project || '', res.data));
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