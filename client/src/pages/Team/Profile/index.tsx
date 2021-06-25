import React from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    makeStyles,
    Chip,
    Hidden
} from '@material-ui/core';
import {
    ArrowBackIosOutlined,
    Check
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import RoundedButton from '../../../components/RoundedButton';
import BasicInfos from './BasicInfos';
import MyWorkspaces from './MyWorkspaces';
import clsx from 'clsx';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(1)
    },
}))

const Profile = () => {
    const classes = useStyles();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <React.Fragment>
            <Box p={2} className="bg-white" display="flex" alignItems="center" justifyContent="flex-end">
                <RoundedButton variant="outlined" className={clsx(classes.iconColor, classes.mr)} size="medium"
                    onClick={goBack}>
                    <ArrowBackIosOutlined className={classes.mr}></ArrowBackIosOutlined>
                    <span>Go back</span>
                </RoundedButton>
                <RoundedButton variant="contained" color="primary" size="medium">
                    <Check className={classes.mr}></Check>
                    <span>Save</span>
                </RoundedButton>
            </Box>

            <TabContainer />

        </React.Fragment>
    )
}

const TabContainer = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const TabIcon = (
        <label>
            <span style={{ marginRight: '0.5rem' }}>My workspaces</span>
            <Hidden xsDown>
                <Chip
                    size="small"
                    label="12"
                    color="secondary"
                />
            </Hidden>
        </label>
    );

    return (
        <>
            <Box className="bg-white" borderBottom="1px solid lightgray">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
                    <Tab label="Basic information" {...a11yProps(0)}></Tab>
                    <Tab label={TabIcon} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <BasicInfos />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <MyWorkspaces />
            </TabPanel>
        </>
    )
};


export default Profile;
