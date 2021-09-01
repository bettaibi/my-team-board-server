import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box } from '@material-ui/core';
import MyTextField from '../../../../../../components/MyTextField';

import * as yup from 'yup';
import useMutation from '../../../../../../hooks/useMutation';
import { useSharedContext } from '../../../../../../context';
import { AspectModel } from '../../../../../../models/app.model';
import { editAspect } from '../../../../../../store/actions/board.actions';

const schema = yup.object().shape({
    title: yup.string().required('Title is required')
});

const EditAspect = ({currentAspect, id, handleClose, members}: {members: string[], currentAspect: AspectModel, id: string, handleClose: () => void}) => {
    const { loading, onMutate } = useMutation();
    const {dispatch, selectedWorkspace} = useSharedContext();

    const defaultValue = {
        title: currentAspect.title,
    };

    async function onSubmitHandler({title}: {title: string}){
        try{
            const res = await onMutate({
                url: `/aspects/${id}`,
                method: 'PUT',
                data: {
                    workspace: selectedWorkspace,
                    aspect: {...currentAspect, title},
                    members
                }
            });

            if(res.success){
              handleClose();
              setTimeout(() =>{
                  dispatch(editAspect(currentAspect.project || '', {...currentAspect, title}));
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