import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
    IconButton,
    Paper
} from '@material-ui/core';
import RoundedButton from '../../../../components/RoundedButton';
import clsx from 'clsx';
import {
    AppsOutlined,
    EditOutlined,
    MoreVertOutlined
} from "@material-ui/icons";
import { useHistory } from 'react-router-dom'; 

const useStyle = makeStyles((theme) => ({
    header: {
       padding: '1.5rem 1rem',
       borderBottom: "1px solid lightgray",
       [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            gap: '0.5rem',
        },
    },
    iconColor: {
        color: '#64748B'
    },
    mr: {
        marginRight: theme.spacing(1)
    },
    aspect: {
        backgroundColor: '#e6ebf1',
        padding: theme.spacing(1),
        borderRadius: 10,
        width: '288px'
    },
    card: {
        backgroundColor: 'white',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        borderRadius: 10,
    }
}));

const Scrumboard = () => {
    const classes = useStyle();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <Box display="flex" flexDirection="column">
           <Box className={clsx('bg-white', classes.header)} display="flex" 
           flexDirection="row" alignItems="center" justifyContent="space-between">
               <Typography variant="h5" className="bg-text-primary fw-700">
                    Project name
               </Typography>
                <Box>
                    <RoundedButton variant="outlined" className={clsx(classes.iconColor, classes.mr)} size="medium"
                    onClick={goBack}>
                        <AppsOutlined className={classes.mr}></AppsOutlined>
                        <span>Boards</span>
                    </RoundedButton>
                    <RoundedButton variant="outlined" className={classes.iconColor} size="medium">
                        <EditOutlined className={classes.mr}></EditOutlined>
                         <span>Edit Board</span>
                    </RoundedButton>
                </Box>
           </Box>

           {/* Cards */}
           <Box p = {2} display ="flex" flexDirection="row">
                <Aspect />
           </Box>
        </Box>
    )
};

const Aspect = () => {
    const classes =useStyle();
    let cards = [1,2,3]

    return (
        <Box  className={classes.aspect}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Aspect</Typography>
                <IconButton size="small">
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            <React.Fragment>
                {
                        cards.map((item: number) =>(
                            <Card key={item} />
                        ))
                }
            </React.Fragment>
        </Box>
    )
};


const Card = () => {
    const classes =useStyle();

    return (
        <Box boxShadow={2} className = {classes.card} >
            mlsqlk qsd qsldl qlsd 
        </Box>
    )
}

export default Scrumboard;
