import React, { Dispatch, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../store/actions/project.actions';
import { setWorkspaceMembers } from '../store/actions/members.actions';
import { setWorkspaces } from '../store/actions/workspace.actions';
import { UserModel } from '../models/app.model';
import { initChat } from '../store/actions/chat.actions';
import axios from 'axios';
import AppSkeleton from '../components/AppSkeleton';

interface ContextProps{
    dispatch: Dispatch<any>;
    selectedWorkspace: string | null;
    setSelectedWorkspace: (w: string) => void;
    currentUser: UserModel;
    updateCurrentUser: (u: UserModel) => void;
    owner: string;
}

const defaultUserState: UserModel = {
    name: '',
    email: '',
    title: '',
    avatar: '',
    country: '',
    city: '',
    address: '',
    _id: '',
    phone: ''
};

const Shared = React.createContext({} as ContextProps);

export const ContextProvider = ({children}: {children: JSX.Element}) => {
    const [selectedWorkspace, setSelectedWorkspace] = React.useState<string | null>(localStorage.getItem('workspace'))
    const [ appLoading, setAppLoading ] = React.useState<boolean>(true);
    const [ owner, setOwner ] = React.useState<string>('');
    const [ currentUser, setCurrentUser ] = React.useState<UserModel>(defaultUserState);

    const dispatch = useDispatch();

    useEffect(() => {
        async function onSwitch (){
            try{
                if(selectedWorkspace){
                    setAppLoading(true);
                    const {data} = await axios.get(`/workspace/switch/${selectedWorkspace}`);
                    if(data.success){
                        localStorage.setItem('workspace', selectedWorkspace);
                        dispatch(setProjects(data.data.projects));
                        dispatch(setWorkspaceMembers(data.data.members));
                        dispatch(initChat());
                        setOwner(data.data.owner);
                        setAppLoading(false);
                    }
                }
                
            }
            catch(err){
                console.error(err);
            }
        }
        
        onSwitch()
    }, [selectedWorkspace]);

    useEffect(() => {
        async function getConnectedUser(){
            try{
                const {data} = await axios.get('/auth/user');
                if(data.success){
                    setCurrentUser(data.data)
                }
            }
            catch(err){
                console.error(err)
            }
        }

        getConnectedUser()
    }, [])

    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                const { data } = await axios.get('/workspace');
                if (data.success) {
                    dispatch(setWorkspaces(data.data))

                    if(selectedWorkspace === null && data.data.length > 0) {
                        setSelectedWorkspace(data.data[0]._id);
                        setOwner(data.data[0].owner._id);
                    }
                    setAppLoading(false);
                }
            }
            catch (err) {
                console.error(err);
            }
        };

        getWorkspaces()
    }, []);


    function updateCurrentUser(u: UserModel){
        setCurrentUser(state => {return {...state, ...u}});
    }

    const value = {
        dispatch,
        selectedWorkspace,
        setSelectedWorkspace,
        currentUser,
        updateCurrentUser,
        owner
    };

    return(
        <Shared.Provider value = {value}>
           <React.Fragment>
                {appLoading ? <AppSkeleton /> : children}
           </React.Fragment>
        </Shared.Provider>
    )
}

export const useSharedContext = () => {
    const values = useContext(Shared);
    return values;
};