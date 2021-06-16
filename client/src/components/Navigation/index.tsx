import React from 'react';
import {
    Box,
    Grid,
    makeStyles,
    IconButton,
    Avatar
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
    borderRight: {
        borderRight: '1px solid #2c3344'
    },
    textCenter:{
        textAlign: 'center'
    },
    mb:{
        marginBottom: theme.spacing(1)
    },
    namespaces: {
        color: '#fff',
        backgroundColor: '#475569',
        cursor: 'pointer',
        fontSize:'16px'
    },
    bgActive:{
        backgroundColor: '#2c3344'
    },


}));

const Navigation = () => {
    const classes = useStyles();

    return (
        <Grid container className="bgColor vh-100">
            <Grid className={classes.borderRight} item xs={3}>
            <Box my={2} px={1} display="flex" flexDirection="column" alignItems="center">
                 <Avatar  variant="rounded" className={classes.mb +' '+ classes.namespaces + ' ' +classes.bgActive}>IT</Avatar>
                 <Avatar  variant="rounded" className={classes.mb +' '+ classes.namespaces}>MN</Avatar>
                 <Avatar  variant="rounded" className={classes.mb +' '+ classes.namespaces}>H</Avatar>
                 <IconButton className={classes.mb}>
                    <Add style={{color: '#fff'}} />
                 </IconButton>
            </Box>
            </Grid>
            <Grid item xs> 
               <Box p={1}>

               </Box>
            </Grid>
        </Grid>
    )
}

export default Navigation
