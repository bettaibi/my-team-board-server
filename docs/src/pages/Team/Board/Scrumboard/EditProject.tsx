import React from 'react';
import { Formik, Form } from "formik";
import {
    Typography,
    Box,
    Avatar,
    Chip
} from '@material-ui/core';
import * as yup from "yup";
import { AppState, ProjectModel, UserModel } from '../../../../models/app.model';
import { useSelector } from 'react-redux';
import { deleteProject, updateProject } from '../../../../store/actions/project.actions';
import { useSharedContext } from '../../../../context';
import { deleteBoard, editBoard } from '../../../../store/actions/board.actions';

import useMutation from '../../../../hooks/useMutation';
import userAvatar from '../../../../assets/avatars/profile.jpg';
import MyTextField from '../../../../components/MyTextField';
import useConfirmDialog from '../../../../hooks/useConfirmDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoundedButton from '../../../../components/RoundedButton';

const baseURL = process.env.REACT_APP_BASE_URL;

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required')
});


interface EditProjectProps {
    onSidenavClose: () => void;
    project: ProjectModel;
}
const EditProject: React.FC<EditProjectProps> = ({ onSidenavClose, project }) => {
    const selectedMembers = useSelector((state: AppState) => state.members);
    const [members, setMembers] = React.useState<string[]>(
        project.members.map((item: UserModel) => item._id || '')
    );
    const { loading, onMutate } = useMutation();
    const { dispatch, currentUser, owner } = useSharedContext();
    let isOwner = (owner === currentUser._id);

    const InitialValue = {
        title: project.title,
        description: project.description,
        members: project.members,
    };

    function onEmailSelected(newValues: UserModel[]){
        if(newValues !== null){
            if(newValues.length === 0){
                setMembers([]);
            }
            else{
                setMembers([...newValues.map((item: UserModel) => item._id || '')]);
            }
        }
    }

    async function submitHandler(values: any){
        try{
            const obj = {
                ...project,
                ...values,
                members
            };
            const res = await onMutate({
                url: `/projects/${project._id}`,
                method: 'PUT',
                data: obj
            });
            if(res.success){
                onSidenavClose();
                setTimeout(() =>{
                    dispatch(updateProject(res.data));
                    dispatch(editBoard(res.data._id, res.data));
                },0);
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <Formik initialValues={InitialValue} validationSchema={schema} onSubmit={(values) => submitHandler(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off" >
                        <Box style={{ backgroundColor: '#f1f5f9', padding: '2.5rem 1rem' }} borderBottom="1px solid #fafafa"
                            display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">

                            <RoundedButton className="bg-text-secondary" onClick={onSidenavClose} variant="outlined" color="default" size="medium" type="button">
                                Cancel
                            </RoundedButton>

                            <Box>
                                {isOwner && <DeleteProjectButton projectId = {project._id || ''} />}
                                <RoundedButton disabled={members.length===0} disableElevation size="medium" type="submit" style={{ marginLeft: '0.5rem' }} variant="contained" color="primary">
                                  {loading? 'Loading...':'Save'}
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
                                    onChange={(e, newValue)=> onEmailSelected(newValue)}
                                    multiple
                                    fullWidth
                                    limitTags={2}
                                    clearOnBlur
                                    id="multiple-limit-tags"
                                    options={selectedMembers}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={[...project.members]}
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

const DeleteProjectButton = ({projectId}: {projectId: string}) => {
    const { ConfirmDialog, handleOpen, handleClose } = useConfirmDialog({
        onConfirmClick: onDelete,
        message: 'Are you sure you want to delete this project, by deleting this project all linked aspects will be deleted.',
    });
    const { dispatch } = useSharedContext();
    const { onMutate } = useMutation();

    async function onDelete(){
        try{
            const res = await onMutate({
                url: `/projects/${projectId}`,
                method: 'DELETE'
            });
            if(res.success){
                handleClose();

                setTimeout(() =>{
                    dispatch(deleteProject(projectId));
                    dispatch(deleteBoard(projectId));
                }, 0);
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <RoundedButton disableElevation size="medium" style={{ marginLeft: '0.5rem' }} 
            variant="contained" color="secondary" onClick={handleOpen}>
                Delete
            </RoundedButton>

            <ConfirmDialog />
        </React.Fragment>
    )
};

export default EditProject;
