import React, { useRef, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Theme,
    Avatar,
    Typography,
    IconButton,
    InputBase,
    Tooltip,
    Divider
} from '@material-ui/core';
import {
    InfoOutlined,
    CropOriginal,
    AttachFile,
    SendOutlined,
    SentimentVerySatisfiedOutlined,
    PhoneOutlined,
    VideoCallOutlined,
    ArrowDropDownCircleOutlined,
    Comment
} from '@material-ui/icons';
import { Picker } from 'emoji-mart';
import { useSelector } from 'react-redux';
import { AppState, MessageModel, UserModel } from '../../../models/app.model';
import { useSharedContext } from '../../../context';
import { useSocketContext } from '../../../context/SocketContext';
import { PostNewMessage, setChat } from '../../../store/actions/chat.actions';
import useToggle from '../../../hooks/useToggle';
import useSidenav from '../../../hooks/useSidenav';
import ChatDetails from './ChatDetails';
import clsx from 'clsx';
import bgImage from '../../../assets/chat/bg1.svg';
import userAvatar from '../../../assets/avatars/profile.jpg';
import axios from "axios";
import Moment from 'react-moment';
import useMutation from '../../../hooks/useMutation';

import "./chat.css";
import { useVideoCallContext } from './VideoCallContext';
import { isMemberConnected } from '../../../util/helpers';
import { useNotificationContext } from '../../../context/NotificationContext';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 'calc(100vh - 56px)',
        position: "relative",
        display: 'flex',
        flexDirection: "column",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        width: '100%',
        overflow: 'hidden'
    },
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(0.5)
    },
    bgLightBlue: {
        backgroundColor: "#f1f5f9"
    },
    fileAttachment: {
        cursor: "pointer",
        color: '#fff !important',
        padding: "8px 15px",
        marginBottom: '5px',
        marginTop: '5px',
    },
    downloadLink: {
        '&:hover': {
            textDecoration: 'none !important',
        }
    }
}));

const Chat = (props: any) => {
    const classes = useStyles();
    const memberId = props.match.params.memberId;

    return (
        <Box className={classes.root}>

            <Box height="70px" boxShadow="0 .125rem .25rem rgba(0,0,0,.075)" p={2} display='flex' flexDirection="row" className="bg-white"
                alignItems="center" justifyContent="space-between">
                <ChatHeader memberId={memberId} />
            </Box>

            <Box flexGrow={1} p={2} display="flex" flexDirection="Column" overflow="auto"
                className="content-scroll">
                <Messages memberId={memberId} />
            </Box>

            <Box style={{ padding: '0.5rem 1rem' }} position="sticky" bottom={0} >
                <MessageEditor memberId={memberId} />
            </Box>
        </Box>
    )
}

const ChatHeader = ({ memberId }: { memberId: string }) => {
    const member = useSelector((state: AppState) => state.members)
        .find((item: UserModel) => item._id === memberId);
    const { onlineUsers } = useSocketContext();

    useEffect(() => {
        if(member){
            sessionStorage.setItem('userToCall', JSON.stringify(member));
        }
    }, [memberId]);

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                {member && <Avatar src={member.avatar ? `${baseURL}/files/${member.avatar}` : userAvatar} alt="receptor" />}
                <Box display="flex" flexDirection="column" ml={1}>
                    <Typography variant="subtitle2" className="bg-text-primary">
                        {member?.name}
                    </Typography>
                    <small className="bg-text-secondary">
                        {
                            member?._id &&
                                onlineUsers.hasOwnProperty(member._id) ?
                                onlineUsers[member._id].lastSeen ? (
                                    <Moment fromNow>{onlineUsers[member._id].lastSeen}</Moment>
                                ) : 'Active Now' : 'long time ago'
                        }
                    </small>
                </Box>
            </Box>
            <Box>
                <ChatDetailsDialog member={member} />
            </Box>
        </React.Fragment>
    )
}

const MessageEditor = ({ memberId }: { memberId: string }) => {
    const classes = useStyles();
    const [text, setText] = React.useState<string>('');
    const { show, toggle: toggleImoji } = useToggle();
    const { currentUser, selectedWorkspace, dispatch } = useSharedContext();
    const { onCallStart } = useVideoCallContext();
    const { sendMessage, onlineUsers } = useSocketContext();
    const { showMsg } = useNotificationContext();
    const { onMutate } = useMutation();

    let fileRef = useRef<any>();
    let imageRef = useRef<any>();

    function displayEmoji(emoji: any) {
        setText((state: string) => state.trim() + ' ' + emoji.native)
        toggleImoji();
    }

    function handleTextChange(e: any) {
        setText(e.target.value);
    }

    async function onSubmitHandler() {
        try {
            const obj: MessageModel = {
                text,
                members: [memberId, currentUser._id || ''],
                workspace: selectedWorkspace || '',
                sender: currentUser._id || '',
                sentAt: new Date()
            };
            const { data } = await axios.post('/messages', obj);
            if (data.success) {
                setText('');
                dispatch(PostNewMessage(data.data, memberId));
                sendMessage(selectedWorkspace, memberId, data.data)
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    async function audioCallHandler(){
        try{
            const isMemberAvailable = isMemberConnected(memberId, onlineUsers);
            if(!isMemberAvailable){
                showMsg('Member is not available right now, call him later', 'warning');
            }
            else{
                onCallStart('dial', false);
            }
        }
        catch(err){
            console.error(err)
        }
    }

    async function videoCallHandler(){
        try{
            const isMemberAvailable = isMemberConnected(memberId, onlineUsers);
            if(!isMemberAvailable){
                showMsg('Member is not available right now, call him later', 'warning');
            }
            else{
                onCallStart('dial', true);
            }
        }
        catch(err){
            console.error(err)
        }
    }

    async function handleImagesChange(e: any) {
        try {
            const result = window.confirm(`image(s) have been selected, confirm to send!`);
            if (result) {
                const fd = new FormData();
                for (let file of e.target.files) {
                    fd.append('pictures', file);
                }
                const res = await onMutate({
                    url: `/files/pictures/${selectedWorkspace}/${memberId}`,
                    method: 'PATCH',
                    data: fd
                });
                if (res.success) {
                    dispatch(PostNewMessage(res.data, memberId));
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    async function handlefileChange(e: any) {
        try {
            const result = window.confirm(`file(s) have been selected, confirm to send!`);
            if (result) {
                const fd = new FormData();
                fd.append('file', e.target.files[0]);
                const res = await onMutate({
                    url: `/files/attachment/${selectedWorkspace}/${memberId}`,
                    method: 'PATCH',
                    data: fd
                });
                if (res.success) {
                    dispatch(PostNewMessage(res.data, memberId));
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <Box borderRadius={5} border="1px solid lightgray" overflow="hidden" className="bg-white">
            <Box p={1}>
                <InputBase
                    onChange={handleTextChange}
                    value={text}
                    multiline
                    maxRows={3}
                    fullWidth
                    placeholder="enter your message right here.."
                    inputProps={{ 'aria-label': 'naked' }} />
            </Box>
            <Box className={classes.bgLightBlue} borderTop="1px solid lightgray" p={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <div>
                    {show && <Picker set='twitter' onSelect={(emoji) => displayEmoji(emoji)}
                        style={{ position: 'absolute', bottom: '60px', left: '1.5rem', zIndex: 99999, width: '280px' }} />
                    }

                    <IconButton className={classes.mr} size="small" onClick={toggleImoji}>
                        <SentimentVerySatisfiedOutlined className={classes.iconColor} />
                    </IconButton>

                    <React.Fragment>
                        <Tooltip title="send images">
                            <IconButton className={classes.mr} size="small" onClick={() => imageRef.current.click()}>
                                <CropOriginal className={classes.iconColor} />
                            </IconButton>
                        </Tooltip>
                        <input onChange={handleImagesChange} ref={imageRef} name="pictures"
                            hidden multiple accept="image/*" type="file" />
                    </React.Fragment>

                    <React.Fragment>
                        <Tooltip title="send attachment">
                            <IconButton className={classes.mr} size="small" onClick={() => fileRef.current.click()}>
                                <AttachFile className={classes.iconColor} />
                            </IconButton>
                        </Tooltip>
                        <input onChange={handlefileChange} ref={fileRef} hidden type="file" name="file"
                            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
                    </React.Fragment>
                </div>
                <div style={{ display: 'flex' }}>
                    <Tooltip title="audio call">
                        <IconButton className={classes.mr} size="small" onClick={audioCallHandler}>
                            <PhoneOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="video call">
                        <IconButton size="small" onClick={videoCallHandler}>
                            <VideoCallOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem style={{ margin: '0 0.6rem', width: '2px' }} />
                    <Tooltip title="send">
                        <span>
                            <IconButton size="small" disabled={text === ''}
                                onClick={onSubmitHandler}>
                                <SendOutlined className={classes.iconColor} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            </Box>
        </Box>
    )
};

const Messages = ({ memberId }: { memberId: string }) => {

    const chat = useSelector((state: AppState) => state.chat);
    const [messages, setMessages] = React.useState<MessageModel[]>(chat[memberId] || []);

    const messageRef = useRef<HTMLDivElement>(null);
    const { selectedWorkspace, currentUser, dispatch } = useSharedContext();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`/messages/${selectedWorkspace}/${memberId}`);
                if (data.success) {
                    dispatch(setChat(data.data, memberId));
                    setMessages(data.data);
                }
            }
            catch (err) {
                console.error(err);
            }
        }

        if (!chat.hasOwnProperty(memberId)) {
            fetchMessages();
        }
        else {
            setMessages(chat[memberId]);
        }
    }, [memberId, chat]);

    if (messages.length === 0) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <Comment style={{ color: '#9e9e9e', fontSize: 60 }} />
                <Typography variant="h6" component="span" style={{ color: '#9e9e9e' }} gutterBottom>
                    Start A new Conversation
                </Typography>
            </Box>
        )
    }

    return (
        <React.Fragment>
            {
                messages.map((item: MessageModel, index: number) => (
                    <div key={item._id} ref={messageRef}>
                        <Message message={item} myId={currentUser._id || ''}
                            last={messages.length === (index + 1)} />
                    </div>
                ))
            }
        </React.Fragment>
    );
};

const FileAttachment = ({ message, mine }: { message: MessageModel, mine: boolean }) => {
    const classes = useStyles();

    return (
        <Tooltip title="download">
            <a className={classes.downloadLink} target="_blank" href={`${baseURL}/files/${message.file}`} download={message.file}>
                <Box display="flex" flexDirection="row" alignItems="center" maxWidth="280px"
                    borderRadius={20} className={clsx(classes.fileAttachment, {
                        'my-attachment': mine,
                        'your-attachment': !mine
                    })}>
                    <ArrowDropDownCircleOutlined />
                    <Box mx={1}>
                        <Typography variant="subtitle2"> Click to download</Typography>
                        <small >Sent At: &nbsp;
                            <Moment format="DD/MM/YYYY">
                                {message?.sentAt}
                            </Moment>
                        </small>
                    </Box>
                </Box>
            </a>
        </Tooltip>
    )
}

const ImagesGrid = ({ pictures }: { pictures: string[] }) => {
    const classes = useStyles();

    return (
        <div className="gallery">
            {
                pictures.map((item, index) => (
                    <figure key={`pic${index}`} className={`gallery_item${index}`}>
                        <a href={`${baseURL}/files/${item}`} download target="_blank">
                            <img src={`${baseURL}/files/${item}`} alt={`pic${index}`} />
                        </a>
                    </figure>
                ))
            }
        </div>
    )
};

const Message = ({ message, myId, last }: { message: MessageModel, myId: string, last: boolean }) => {
    const { show, toggle } = useToggle();

    return (
        <React.Fragment>
            {
                message.sender === myId ? (
                    <div className="messages mine">
                        {
                            message.text && (
                                <>
                                    <div className={clsx('message', { 'last': last })} onClick={toggle}>
                                        {message.text}
                                    </div>
                                    {last && <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">
                                        <Moment fromNow>
                                            {message.sentAt}
                                        </Moment>
                                    </small>}
                                    {!last && show && <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">
                                        <Moment fromNow>
                                            {message.sentAt}
                                        </Moment>
                                    </small>}
                                </>
                            )
                        }
                        {
                            message.file && (
                                <FileAttachment message={message} mine={true} />
                            )
                        }
                        {
                            message.pictures && (
                                <ImagesGrid pictures={message.pictures} />
                            )
                        }
                    </div>
                ) : (
                    <div className="messages yours">
                        {
                            message.text && (
                                <>
                                    <div className={clsx('message', { 'last': last })} onClick={toggle}>
                                        {message.text}
                                    </div>
                                    {last && <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">
                                        <Moment fromNow>
                                            {message.sentAt}
                                        </Moment>
                                    </small>}
                                    {!last && show && <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">
                                        <Moment fromNow>
                                            {message.sentAt}
                                        </Moment>
                                    </small>}
                                </>
                            )
                        }
                        {
                            message.file && (
                                <FileAttachment message={message} mine={false} />
                            )
                        }
                        {
                            message.pictures && (
                                <ImagesGrid pictures={message.pictures} />
                            )
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
}

interface ChatDetailsProps {
    member: UserModel | undefined;
}
const ChatDetailsDialog: React.FC<ChatDetailsProps> = ({ member }) => {
    const classes = useStyles();
    const { SidenavComponent, onSidenavClose, onSidenavOpen } = useSidenav('right', 'persistent');

    return (
        <React.Fragment>
            <IconButton onClick={onSidenavOpen}>
                <InfoOutlined className={classes.iconColor} />
            </IconButton>

            <SidenavComponent>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 56px)', marginTop: '56px' }}>
                    <ChatDetails onSidenavClose={onSidenavClose} member={member} />
                </div>
            </SidenavComponent>
        </React.Fragment>
    )
}

export default Chat;
