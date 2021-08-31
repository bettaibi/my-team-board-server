import React from 'react';
import { Formik, Form } from "formik";
import {
    Typography,
    Box,
} from '@material-ui/core';
import MyTextField from '../../../components/MyTextField';
import RoundedButton from '../../../components/RoundedButton';
import axios, { CancelTokenSource } from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserModel } from '../../../models/app.model';
import { useSharedContext } from '../../../context';
import { newMember } from '../../../store/actions/members.actions';
import useMutation from '../../../hooks/useMutation';

const InitialValue = {
    _id: '',
    name: '',
    email: '',
    title: '',
};

let cancelToken: CancelTokenSource;

interface NewMemberProps {
    onSidenavClose: () => void;
}

const NewMember: React.FC<NewMemberProps> = ({ onSidenavClose }) => {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<UserModel[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<UserModel>(InitialValue);
    const { dispatch } = useSharedContext();
    const { loading: mutatioLoading, onMutate } = useMutation();

    const handleSeachChange = async (e: any) => {
        const term = e.target.value;

        if(term === ''){
            setSelectedUser(InitialValue);
        }

        if (typeof cancelToken != typeof undefined) {
            cancelToken?.cancel('Operation cancled');
        }

        cancelToken = axios.CancelToken.source();

        try {
            if (term) {
                setLoading(true);
                const { data } = await axios.get(`/members/search/${term}`, { cancelToken: cancelToken.token });
                if(data.success) {
                    setOptions(data.data)
                }
                setLoading(false);
            }

        }
        catch (err) {
            console.error(err.message || err)
        }
    };

    function onEmailSelected(newValue: any){
        if(newValue !== null){
            setSelectedUser({...newValue, title: newValue.title || 'Title does not mention'});
        }
    }

    async function submitHandler(){
        try{
            if(selectedUser?.email !== ''){
                const res = await onMutate({
                    url: '/workspace/addMember',
                    method: 'PATCH',
                    data: null,
                    params: {
                        workspaceId: localStorage.getItem('workspace'),
                        memberId: selectedUser._id
                    }
                });
                if(res.success){
                    setSelectedUser(InitialValue);
                    dispatch(newMember(res.data));
                }
            }
        }
        catch(err){
            console.error(err.message || err)
        }
    }

    return (
        <Formik initialValues={selectedUser} onSubmit={submitHandler}>
            {
                ({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off" >
                        <Box style={{ backgroundColor: '#f1f5f9', padding: '2.5rem 1rem' }} borderBottom="1px solid #fafafa"
                            display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">

                            <div></div>
                            <Box>
                                <RoundedButton className="bg-text-secondary" onClick={onSidenavClose} variant="outlined" color="default" size="medium" type="button">
                                    Cancel
                                </RoundedButton>
                                <RoundedButton disableElevation size="medium" type="submit" style={{ marginLeft: '0.5rem' }} variant="contained" color="primary">
                                    {mutatioLoading?'Loading...':'Save'}
                                </RoundedButton>
                            </Box>
                        </Box>
                        <Box style={{ padding: '1rem 1rem 0 1rem' }}>
                            <Typography variant="subtitle1" className="bg-text-primary fw-700">
                                Add Member
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Add a new member to the current workspace.
                            </Typography>

                            <div className="form-group">
                                <label>Email</label>
                                <Autocomplete
                                onChange={(e, newValue)=> onEmailSelected(newValue)}
                                fullWidth
                                getOptionSelected={(option, value) => option.email === value.email}
                                getOptionLabel={(option) => option.email}
                                options={options}
                                loading={loading}
                                clearOnBlur
                                selectOnFocus={false}
                                renderInput={(params) => (
                                    <MyTextField {...params} fullWidth name="email" variant="outlined" size="small" placeholder="member's Email"
                                    onChange={(e) => handleSeachChange(e)}
                                    value={selectedUser.email}
                                    />
                                )}
                            />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <MyTextField fullWidth name="name" variant="outlined" size="small" placeholder="member's name"
                                    value={selectedUser.name} disabled />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <MyTextField fullWidth name="title" variant="outlined" size="small" placeholder="member's title"
                                    value={selectedUser.title} disabled />
                            </div>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
}

export default NewMember;