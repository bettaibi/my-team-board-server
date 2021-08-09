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
import { AppState, ProjectModel, UserModel } from '../../../../models/app.model';
import { useSelector } from 'react-redux';
import { useSharedContext } from '../../../../context';
import { newProject } from '../../../../store/actions/project.actions';
import useMutation from '../../../../hooks/useMutation';
import userAvatar from '../../../../assets/avatars/profile.jpg';

const baseURL = process.env.REACT_APP_BASE_URL;

const InitialValue = {
    title: '',
    description: '',
    members: [],
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required')
});

let members: string[] = [];

interface NewProjectProps {
    onSidenavClose: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({ onSidenavClose }) => {
    const selectedMembers = useSelector((state: AppState) => state.members);
    const { dispatch, selectedWorkspace } = useSharedContext();
    const { loading, onMutate } = useMutation();

    function onEmailSelected(newValues: UserModel[]){
        if(newValues !== null){
            if(newValues.length === 0){
                members = [];
            }
            else{
                members = [...newValues.map((item: UserModel) => item._id || '')];
            }
        }
    }

    async function submitHandler (values: ProjectModel, resetForm: () => void){
        try{
            const payload: ProjectModel = {
                ...values,
                members: members,
                workspace: selectedWorkspace || ''
            };
            const res = await onMutate({
                url: '/projects',
                method: 'POST',
                data: payload
            })
            if(res.success){
                onSidenavClose();
                setTimeout(() =>{
                    dispatch(newProject(res.data));
                },0)
            }
        }
        catch(err){
            console.error(err)
        }
    }
    return (
        <Formik initialValues={InitialValue} validationSchema={schema} onSubmit={(values, { resetForm }) => submitHandler(values, resetForm)}>
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
                                    {loading? 'Loading...':'Save'}
                                </RoundedButton>
                            </Box>
                        </Box>

                        <Box style={{ padding: '1rem 1rem 0 1rem' }}>
                            <Typography variant="h6" gutterBottom>
                                New Project
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
                                    Only selected members are able to work on this project (you can add them later)
                                </Typography>
                                <Autocomplete
                                    onChange={(e, newValue)=> onEmailSelected(newValue)}
                                    multiple
                                    fullWidth
                                    limitTags={2}
                                    clearOnBlur
                                    id="multiple-limit-tags"
                                    options={selectedMembers}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={[]}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                          <Chip
                                            variant="default"
                                            color='primary'
                                            label={option.name}
                                            avatar={<Avatar alt="members"  src={option.avatar? `${baseURL}/files/${option.avatar}` : userAvatar} />}
                                            {...getTagProps({ index })}
                                          />
                                        ))
                                      }
                                    renderInput={(params) => (
                                        <MyTextField  name="members" variant="outlined" size="small" placeholder="Add members to this project"
                                        {...params} />
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

export default NewProject;
