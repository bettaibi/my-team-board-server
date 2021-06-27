import React from 'react';
import { Formik, Form } from "formik";
import {
    Typography,
    Box,
    Avatar,
    Chip
} from '@material-ui/core';
import * as yup from "yup";
import MyTextField from '../../../../components/MyTextField';
import RoundedButton from '../../../../components/RoundedButton';
import Autocomplete from '@material-ui/lab/Autocomplete';

const InitialValue = {
    title: '',
    description: '',
    members: [],
};
const options = [{name: 'Bettaibi Nidhal'}, {name: 'Bettaibi Ridha'}, {name: 'Bettaibi Najet'}];

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    members: yup.array().required("No member is chosen")
});


interface EditProjectProps {
    onSidenavClose: () => void;
}
const EditProject: React.FC<EditProjectProps> = ({ onSidenavClose }) => {
 
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
                            <Typography variant="h6" gutterBottom>
                                Edit Project
                            </Typography>
                            <div className="form-group">
                                <label>Title</label>
                                <MyTextField fullWidth name="title" variant="outlined" size="small" placeholder="project title"
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.title}
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <MyTextField fullWidth name="description" variant="outlined" size="small" placeholder="A short description which explains the project.."
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.description}
                                    multiline
                                    rows={3}
                                    error={touched.description && !!errors.description}
                                    helperText={touched.description && errors.description} />
                            </div>

                            <div className="form-group">
                                <label>Members</label>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Only selected members are able to work on this project
                                </Typography>
                                <Autocomplete
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={options}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={[]}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                          <Chip
                                            variant="default"
                                            color='primary'
                                            label={option.name}
                                            avatar={<Avatar>B</Avatar>}
                                            {...getTagProps({ index })}
                                          />
                                        ))
                                      }
                                    renderInput={(params) => (
                                        <MyTextField  name="members" variant="outlined" size="small" placeholder="Add members to this project"
                                        {...params}
                                        error={touched.members && !!errors.members}
                                        helperText={touched.members && errors.members} />
                                )}
                              />
                            </div>

                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
}

export default EditProject;
