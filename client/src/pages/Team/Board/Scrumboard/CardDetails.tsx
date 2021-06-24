import React from 'react';
import {
    Box,
    Button,
    Typography
} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import MyTextField from '../../../../components/MyTextField';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
})
const defaultValue = {
    title: '',
    description: '',
    dueDate: ''
}

interface CardDetailsProps{
    onDialogClose : () => void;
}
const CardDetails: React.FC<CardDetailsProps> = ({onDialogClose}) => {

    return (
        <Formik initialValues={defaultValue} validationSchema={schema} onSubmit={(values) => console.log(values)}>
            {
               ({handleSubmit, handleBlur, handleChange, errors, touched, values}) =>  (
                    <Form onSubmit={handleSubmit}>
                        <Box p={2} borderBottom = "1px solid lightgray" textAlign="right" minWidth="540px">
                            <Button variant="outlined" color="default" size="medium"
                            onClick={onDialogClose} style={{marginRight:'0.5rem'}}>Cancel</Button>
                            <Button variant="outlined" color="primary" size="medium" type="submit">Save</Button>
                        </Box>

                        <Box p={2}>
                            <div className="form-group">
                                <label>Title *</label>
                                <MyTextField name="title" size="small" fullWidth placeholder="Card title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    error = {touched.title && !!errors.title} 
                                    helperText = {touched.title && errors.title}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <MyTextField name="description" size="small" fullWidth placeholder="Description"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    multiline
                                    rows={3}
                                    value={values.description}
                                />
                            </div>
                            <div className="form-group">
                                <label>Due Date</label>
                                <MyTextField name="dueDate" size="small" fullWidth placeholder="Due date"
                                    type="date"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}     
                                />
                            </div>
                            <CheckList />
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
}

const CheckList = () => {

    return (
        <Box className="form-group">
            <label>
                Checklist items
            </label>
        </Box>
    )
}

export default CardDetails;
