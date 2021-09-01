import React from 'react';
import { Formik, Form } from 'formik';
import {
    Box,
    Typography,
    InputAdornment,
    Avatar,
    Tooltip
} from '@material-ui/core';
import {
    GroupWorkOutlined
} from '@material-ui/icons';

import MyTextField from '../../../components/MyTextField';
import RoundedButton from '../../../components/RoundedButton';
import * as yup from 'yup';
import { useSharedContext } from '../../../context';
import { AppState, UserModel, WorkspaceModel } from '../../../models/app.model';
import { useSelector } from 'react-redux';
import useMutation from '../../../hooks/useMutation';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import userAvatar from '../../../assets/avatars/profile.jpg';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { updateWorkspace } from '../../../store/actions/workspace.actions';
import SessionExpired from './SessionExpired';
import useDialog from '../../../hooks/useDialog';

const baseURL = process.env.REACT_APP_BASE_URL;

const schema = yup.object().shape({
    name: yup.string().required('Name is required')
});

const ActiveWorkspaceSetting = () => {
    const { selectedWorkspace, currentUser, dispatch } = useSharedContext();
    const { loading, onMutate } = useMutation();
    const activeWorkspace = useSelector((state: AppState) => state.workspaces)
        .find((item: WorkspaceModel) => item._id === selectedWorkspace);

    let defaultValues = {
        name: '',
    };
    let disabled = true;

    if (activeWorkspace) {
        defaultValues = {
            name: activeWorkspace.name,
        };
        disabled = !(activeWorkspace.owner._id === currentUser._id);
    }

    async function submitHandler(values: any) {
        try {
            if (activeWorkspace) {
                const res = await onMutate({
                    url: `/workspace/${selectedWorkspace}`,
                    method: 'PUT',
                    data: { name: values.name },
                });
                if (res.success) {
                    const obj = { ...activeWorkspace, name: values.name };
                    dispatch(updateWorkspace(obj));
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={(values) => submitHandler(values)}>
            {
                ({ handleChange, handleSubmit, handleBlur, values, touched, errors }) => (
                    <Box p={2} width="100%">
                        <Typography variant="h6" className="bg-text-primary fw-700" gutterBottom>
                            Active Workspace
                        </Typography>
                        <Typography variant="subtitle2">
                            Workspace Settings
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Only workspace's owner is able to update these information.
                        </Typography>

                        <Form onSubmit={handleSubmit} autoComplete="off">

                            <div className="form-group">
                                <label className="bg-text-secondary">Name *</label>
                                <MyTextField
                                    disabled={disabled}
                                    fullWidth
                                    placeholder="Workspace name"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    value={values.name}
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <GroupWorkOutlined className="icons" />
                                            </InputAdornment>
                                        ),
                                    }} />
                            </div>
                            <Box className="form-group">
                                <label className="bg-text-secondary">Workspace Owner</label>
                                {
                                    activeWorkspace && (<>
                                        <Tooltip title={activeWorkspace.owner.name}>
                                            <Avatar alt="user avatar" src={activeWorkspace.owner.avatar ? `${baseURL}/files/${activeWorkspace.owner.avatar}` : userAvatar} />
                                        </Tooltip>
                                    </>)
                                }
                            </Box>
                            <Box className="form-group">
                                <label className="bg-text-secondary">Workspace members</label>
                                <AvatarGroup max={6}>
                                    {
                                        activeWorkspace && activeWorkspace.members.map((item: UserModel) => (
                                            <Tooltip key={item._id} title={item.name}>
                                                <Avatar alt="member avatar" src={item.avatar ? `${baseURL}/files/${item.avatar}` : userAvatar} />
                                            </Tooltip>
                                        ))
                                    }
                                </AvatarGroup>
                            </Box>
                            <Box textAlign="right">
                                <RemoveWorspaceContainer disabled={disabled} currentWorkspace={selectedWorkspace} />

                                <RoundedButton variant="contained" color="primary" type="submit">
                                    {loading ? 'Loading...' : 'Save'}
                                </RoundedButton>
                            </Box>
                        </Form>
                    </Box>
                )
            }
        </Formik>
    )
}

interface RemoveWorspaceContainerProps {
    disabled: boolean;
    currentWorkspace: string | null;
}
const RemoveWorspaceContainer: React.FC<RemoveWorspaceContainerProps> = ({ disabled, currentWorkspace }) => {
    const { ConfirmDialog, handleOpen, handleClose } = useConfirmDialog({
        onConfirmClick: onDelete,
        message: 'Are you sure you want to delete this Workspace? All related members and projects will be unlikned.'
    });
    const { loading, onMutate } = useMutation();
    const { DialogComponent, onDialogOpen, onDialogClose } = useDialog();

    async function onDelete() {
        try {
            const res = await onMutate({
                url: `/workspace/${currentWorkspace}`,
                method: 'DELETE',
            });

            if (res.success) {
                 handleClose();
                 localStorage.removeItem('workspace');

                 setTimeout(() => {
                    onDialogOpen();
                 })
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    if (!currentWorkspace) return null;

    return (
        <React.Fragment>
            <RoundedButton variant="contained" color="secondary" onClick={handleOpen}
                style={{ marginRight: '0.5rem' }} disabled={disabled}
            >
                {loading ? 'Loading...' : 'Delete'}
            </RoundedButton>
            <ConfirmDialog />
            <DialogComponent>
                <SessionExpired onDialogClose = {onDialogClose} />
            </DialogComponent>
        </React.Fragment>
    )
};

export default ActiveWorkspaceSetting;
