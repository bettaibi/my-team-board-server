import React from 'react';
import {
    Box,
    Typography,
    Grid,
    makeStyles,
    Theme,
    Avatar
} from '@material-ui/core';
import { Formik, Form } from "formik";
import { useSharedContext } from '../../../context';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { UserModel } from '../../../models/app.model';
import MyTextField from '../../../components/MyTextField';
import clsx from 'clsx';
import RoundedButton from '../../../components/RoundedButton';
import userAvatar from '../../../assets/avatars/profile.jpg';
import useMutation from '../../../hooks/useMutation';
import useDialog from '../../../hooks/useDialog';
import Cropper from "react-cropper";
import * as yup from "yup";

import "cropperjs/dist/cropper.css";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required'),
    title: yup.string().required('Title is required')
});

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        borderRadius: 10,
        boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
        backgroundColor: "#fff",
    },
    largeAvatar: {
        width: theme.spacing(11),
        height: theme.spacing(11),
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
            '&:after': {
                fontFamily: 'Material Icons',
                content: "'&#9688'",
                position: 'absolute',
                top: 0,
                height: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    },
    croppedImageContainer: {
        overflow: "hidden",
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: '40px',
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    croppedImage: {
        objectFit: 'cover',
    },
    iconColor: {
        color: '#64748B'
    }
}))

const BasicInfos = () => {
    const classes = useStyles();
    const { currentUser, updateCurrentUser } = useSharedContext();

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>
                <Box component="div" p={2} className={clsx(classes.card)}
                    display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <ImageCropperContainer classes={classes} currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
                    <Typography variant="h6" className="text-center">
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body2" className={classes.iconColor} gutterBottom>
                        {currentUser.email}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs>
                <ProfileDetails classes={classes} currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
            </Grid>
        </Grid>
    )
}
interface ProfileDetailsProps {
    currentUser: UserModel;
    updateCurrentUser: (u: UserModel) => void;
    classes: ClassNameMap<any>;
}
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ classes, currentUser, updateCurrentUser }) => {
    const { loading, onMutate } = useMutation();

    const InitialValue = {
        name: currentUser.name || '',
        country: currentUser.country || '',
        city: currentUser.city || '',
        title: currentUser.title || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
    };

    const updateUser = async (values: any) => {
        try {
            const res = await onMutate({
                url: '/members',
                method: 'PUT',
                data: values
            });
            if (res.success) {
                // set CurrentUser
                updateCurrentUser(values);
            }
        }
        catch (err) {
            console.error(err)
        }
    };

    return (
        <Formik initialValues={InitialValue} validationSchema={schema} onSubmit={(values) => updateUser(values)}>
            {
                ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off" >
                        <Box className={clsx(classes.card)} mb={2} overflow="hidden">
                            <Box p={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                                borderBottom="1px solid lightgray" component="div">
                                <Typography variant="subtitle1">
                                    General Information
                                </Typography>
                                <RoundedButton disabled={loading} className={classes.iconColor} type="submit" disableElevation variant="outlined" color="default" size="small">
                                    <span>{loading ? 'Loading...' : 'Save'}</span>
                                </RoundedButton>
                            </Box>
                            <Box p={2} component="div">
                                <div className="form-group">
                                    <label>Full name</label>
                                    <MyTextField fullWidth name="name" variant="outlined" size="small" placeholder="full name"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.name}
                                        error={touched.name && !!errors.name}
                                        helperText={touched.name && errors.name} />
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <MyTextField fullWidth name="title" variant="outlined" size="small" placeholder="title"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.title}
                                        error={touched.title && !!errors.title}
                                        helperText={touched.title && errors.title} />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <MyTextField fullWidth name="phone" variant="outlined" size="small" placeholder="phone"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.phone}
                                        error={touched.phone && !!errors.phone}
                                        helperText={touched.phone && errors.phone} />
                                </div>
                            </Box>
                        </Box>

                        <Box className={classes.card} overflow="hidden">
                            <Box p={2} borderBottom="1px solid lightgray" component="div">
                                <Typography variant="subtitle1">
                                    Contact
                                </Typography>
                            </Box>
                            <Box p={2} component="div">
                                <div className="form-group">
                                    <label>Address</label>
                                    <MyTextField multiline rows={3} fullWidth name="address" variant="outlined" size="small" placeholder="member's address"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <MyTextField fullWidth name="country" variant="outlined" size="small" placeholder="country"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <MyTextField fullWidth name="city" variant="outlined" size="small" placeholder="city"
                                        onChange={handleChange} onBlur={handleBlur} />
                                </div>
                            </Box>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    )
};

const ImageCropperContainer: React.FC<ProfileDetailsProps> = ({ classes, currentUser, updateCurrentUser }) => {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const [selectedImg, setSelectedImg] = React.useState<any>();
    const { onDialogOpen, onDialogClose, DialogComponent } = useDialog();

    const toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function imageHandler() {
        try {
            const file = fileRef.current;
            if (file)
            file.click();
        }
        catch (err) {
            console.error(err)
        }
    };

    async function onChangeHandler(e: any) {
        try {
            const img = await toBase64(e.target.files[0]);
            setSelectedImg(img);
            onDialogOpen();
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <React.Fragment>
            <Avatar alt="user profile" src={currentUser.avatar || userAvatar} className={classes.largeAvatar}
                onClick={imageHandler} />
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onChangeHandler} />
            <DialogComponent>
                <ImageCropper src={selectedImg} updateCurrentUser={updateCurrentUser}
                    onDialogClose={onDialogClose} classes={classes} />
            </DialogComponent>
        </React.Fragment>
    )
};

interface ImageCropperProps {
    src: string;
    onDialogClose: () => void;
    updateCurrentUser: (u: UserModel) => void;
    classes: ClassNameMap<any>;
}
const ImageCropper: React.FC<ImageCropperProps> = ({ classes, src, onDialogClose, updateCurrentUser }) => {

    const [cropData, setCropData] = React.useState();
    const cropperRef = React.useRef<HTMLImageElement>(null);

    const saveAvatar = () => {

    };

    const getCropData = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        setCropData(cropper.getCroppedCanvas().toDataURL())
    };

    return (
        <>
            <Box p={2} borderBottom="1px solid lightgray" component="div"
                display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" className="fw-700">
                    Image Cropper
                </Typography>

                <div>
                    <RoundedButton onClick={onDialogClose}
                        style={{ marginRight: '0.5rem', color: 'gray' }} disableElevation variant="outlined" color="default" size="small">
                        <span>Cancel</span>
                    </RoundedButton>

                    <RoundedButton onClick={saveAvatar}
                        disableElevation variant="contained" color="primary" size="small">
                        <span>Save</span>
                    </RoundedButton>
                </div>
            </Box>

            <Box component="div" position="relative" overflow="hidden">
                <Cropper
                    style={{ height: '100vh', width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={16 / 9}
                    src={src}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={true}
                    responsive={true}
                    crop={getCropData}
                    checkOrientation={false}
                    ref={cropperRef}
                    guides={false}
                />

                <Box className={classes.croppedImageContainer}>
                    <img src={cropData || userAvatar} className={classes.croppedImage} alt="cropped image" width="100%" height="100%" />
                </Box>
            </Box>
        </>
    )
}

export default BasicInfos;
