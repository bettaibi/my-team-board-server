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
    ArrowDropDownCircleOutlined
} from '@material-ui/icons';
import { Picker } from 'emoji-mart';
import { useSelector } from 'react-redux';
import { AppState, MessageModel, UserModel } from '../../../models/app.model';
import useToggle from '../../../hooks/useToggle';
import useSidenav from '../../../hooks/useSidenav';
import ChatDetails from './ChatDetails';
import clsx from 'clsx';
import bgImage from '../../../assets/chat/bg1.svg';
import userAvatar from '../../../assets/avatars/profile.jpg';
import axios from "axios";

import "./chat.css";
import { useSharedContext } from '../../../context';
import useMutation from '../../../hooks/useMutation';
import Moment from 'react-moment';

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
        backgroundColor: "#3f51b5",
        color: '#fff !important',
        padding: "8px 15px",
        marginBottom: '5px',
        marginTop: '5px',
        '&:hover': {
            backgroundColor: "#556adc"
        }
    },
    imageList: {
        width: 500,
        height: 450,
    },

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

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                {member && <Avatar src={member.avatar ? `${baseURL}/files/${member.avatar}` : userAvatar} alt="receptor" />}
                <Box display="flex" flexDirection="column" ml={1}>
                    <Typography variant="subtitle2" className="bg-text-primary">
                        {member?.name}
                    </Typography>
                    <small className="bg-text-secondary">2 hours ago</small>
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
    const { loading, onMutate } = useMutation();
    let fileRef = useRef<any>();
    let imageRef = useRef<any>();

    function displayEmoji(emoji: any) {
        console.log(emoji);
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
            };
            const { data } = await axios.post('/messages', obj);
            if (data.success) {
                setText('');
            }
        }
        catch (err) {
            console.log(err)
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

                }
            }
        }
        catch (err) {
            console.log(err)
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

                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Box borderRadius={5} border="1px solid lightgray" overflow="hidden" className="bg-white">
            <Box p={1}>
                <InputBase
                    onChange={handleTextChange}
                    value={text}
                    multiline
                    rowsMax={3}
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
                        <IconButton className={classes.mr} size="small">
                            <PhoneOutlined className={classes.iconColor} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="video call">
                        <IconButton size="small">
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
    const [messages, setMessages] = React.useState<MessageModel[]>([]);
    const { selectedWorkspace, currentUser } = useSharedContext();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`/messages/${selectedWorkspace}/${memberId}`);
                if (data.success) {
                    setMessages(data.data);
                    console.log(data.data)
                }
            }
            catch (err) {
                console.error(err)
            }
        }

        fetchMessages();
    }, []);

    return (
        <React.Fragment>
            {
                messages.map((item: MessageModel, index)=> (
                    <Message message= {item} myId={currentUser._id || ''}
                    last={(index === messages.length -1 ) || messages[index + 1].sender != currentUser._id} />
                ))
            }
        </React.Fragment>
    );
};

const FileAttachment = ({ message }: { message: MessageModel }) => {
    const classes = useStyles();

    return (
        <Tooltip title="download">
            <Box display="flex" flexDirection="row" alignItems="center" minWidth="260px"
                borderRadius={20} className={clsx('', classes.fileAttachment)}>
                <ArrowDropDownCircleOutlined />
                <Box mx={1}>
                    <Typography variant="subtitle2"> Click to download</Typography>
                    <small >Sent At:             
                    <Moment format="DD/MM/YYYY">
                       {message?.sentAt}
                    </Moment>
                    </small>
                </Box>
            </Box>
        </Tooltip>
    )
}

const ImagesGrid = ({pictures}: {pictures: string[]}) => {
    const classes = useStyles();

    return (
        <div>
            {/* <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                {pictures.map((item, index) => (
                    <ImageListItem key={`pic${index}`} cols={1}>
                        <img src={item} alt={`pic${index}`} />
                    </ImageListItem>
                ))}
            </ImageList> */}
        </div>
    )
};

const Message = ({ message, myId, last }: { message: MessageModel, myId: string, last: boolean }) => {


    return (
        <React.Fragment>
            {
                message.text && message.sender === myId ? (<>
                    <div className="mine messages">
                        {
                            last ? (<>
                                <div className="message last">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </div>
                                <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">11:02</small>
                            </>) : (
                                <div className="message">
                                    {message.text}
                                </div>
                            )
                        }
                    </div>
                </>) : (
                    <>
                        <div className="yours messages">
                            {
                                last ? (<>
                                    <div className="message last">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <small style={{ marginRight: '0.5rem' }} className="bg-text-secondary">11:02</small>
                                </>) : (
                                    <div className="message">
                                        {message.text}
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }
            {
                message.file && (
                    <FileAttachment message={message} />
                )
            }
            {
                message.pictures && (
                    <ImagesGrid pictures = {message.pictures} />
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
