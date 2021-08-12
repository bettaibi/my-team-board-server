import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Theme,
    makeStyles,
    Box,
    Typography,
    Grid,
    Hidden,
    Paper
} from '@material-ui/core';
import clsx from 'clsx';
import RoundedButton from '../RoundedButton';


const useStyles = makeStyles((theme: Theme) => ({
    hearder: {
        zIndex: theme.zIndex.drawer + 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '0 1rem',
        height: '56px',
        boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
        position: 'sticky',
        top: 0
    },
    mr: {
        marginRight: theme.spacing(2)
    },
    mb: {
        marginBottom: theme.spacing(2)
    },
    borderRedius: {
        borderRadius: '5px'
    },
    sidebar: {
        width: '280px',
        height: '100%',
        minHeight: '100vh',
        overflowY: 'hidden',
        backgroundColor: '#0f172a'
    },
    bgSecondary: {
        backgroundColor: '#475569'
    },
    bgDarker: {
        backgroundColor: '#475569'
    },
    icons: {
        color: '#64748B'
    },
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: theme.spacing(1)
    },
    gridContainer: {
        maxWidth: '768px'
    },
    paper: {
        padding: theme.spacing(2),
        cursor: 'pointer',
        borderRadius: 10,
    },
    mainRoot: {
        boxSizing: 'border-box',
        padding: '2rem 1.5rem',
        height: 'calc(100vh - 56px)'
    }
}));

const AppSkeleton = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Hidden xsDown>
                <Grid item className={classes.sidebar}>
                    <Grid container >
                        <Grid item xs={3} style={{ borderRight: '1px solid #2c3344', height: '100vh' }}>
                            <Box my={2} px={1} display="flex" flexDirection="column" alignItems="center">
                                <Skeleton variant="rect" width={46} height={46} className={clsx(classes.bgDarker, classes.mb, classes.borderRedius)} />
                                <Skeleton variant="rect" width={46} height={46} className={clsx(classes.bgSecondary, classes.mb, classes.borderRedius)} />
                                <Skeleton variant="rect" width={46} height={46} className={clsx(classes.bgSecondary, classes.mb, classes.borderRedius)} />
                            </Box>
                        </Grid>

                        <Grid item xs={9}>
                            <Box px={2} borderBottom="1px solid #2c3344" textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                                style={{ padding: '1.5rem 1rem' }}>
                                <Skeleton className={clsx(classes.largeAvatar, classes.bgSecondary)} variant="circle" />
                                <Typography component="div" variant="h5" gutterBottom>
                                    <Skeleton width={100} className={classes.bgSecondary} />
                                </Typography>
                                <Typography component="div" variant="caption">
                                    <Skeleton width={140} className={classes.bgSecondary} />
                                </Typography>
                            </Box>

                            <Box p={2} >
                                <Typography component="div" variant="body1">
                                    <Skeleton width={'100%'} className={classes.bgSecondary} />
                                </Typography>
                                <Typography component="div" variant="caption">
                                    <Skeleton width={120} className={classes.bgSecondary} />
                                </Typography>

                                <Typography component="div" variant="h2">
                                    <Skeleton width={'100%'} className={classes.bgSecondary} />
                                </Typography>
                            </Box>

                            <Box p={2} >
                                <Typography component="div" variant="body1">
                                    <Skeleton width={'100%'} className={classes.bgSecondary} />
                                </Typography>
                                <Typography component="div" variant="caption">
                                    <Skeleton width={120} className={classes.bgSecondary} />
                                </Typography>

                                <Box display="flex" flexDirection="row" mt={2}>
                                    <Skeleton className={classes.bgSecondary} animation="wave" variant="circle" width={40} height={40} />
                                    <Box ml={1}>
                                        <Typography component="div" variant="caption">
                                            <Skeleton width={120} className={classes.bgSecondary} />
                                        </Typography>
                                        <Typography component="div" variant="caption">
                                            <Skeleton width={80} className={classes.bgSecondary} />
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box display="flex" flexDirection="row" mt={2}>
                                    <Skeleton className={classes.bgSecondary} animation="wave" variant="circle" width={40} height={40} />
                                    <Box ml={1}>
                                        <Typography component="div" variant="caption">
                                            <Skeleton width={120} className={classes.bgSecondary} />
                                        </Typography>
                                        <Typography component="div" variant="caption">
                                            <Skeleton width={80} className={classes.bgSecondary} />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>

            <Grid item xs={12} sm>
                <header className={classes.hearder}>
                    <Skeleton variant="circle" width={40} height={40} />
                    <Box display="flex" flex-direction="row" alignItems="center" justifyContent="center">
                        <Skeleton className={classes.mr} variant="circle" width={40} height={40} />
                        <Skeleton className={classes.mr} variant="circle" width={40} height={40} />
                        <Skeleton variant="circle" width={40} height={40} />
                    </Box>
                </header>

                <MainSkeleton />
            </Grid>
        </Grid>
    )
}

const MainSkeleton = () => {
    const classes = useStyles();
    const cards = [1, 2, 3,4,5,6];

    return (
        <Box className={classes.mainRoot} overflow="auto"
            display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography align="center" variant="h4" gutterBottom>
                <Skeleton animation="wave" width={220} />
            </Typography>
            <RoundedButton variant="outlined" color="default" size="large" className={classes.mb}>
                <Skeleton animation="wave" width={120} />
            </RoundedButton>
            <Grid container spacing={2} className={classes.gridContainer}>
                {
                    cards.map((x: number) => (
                        <Grid key={x} item xs={12} sm={6} md={4} lg={4}>
                            <Paper elevation={3} className={clsx('bg-white', classes.paper)}>
                                <Typography component="div" variant="body1">
                                    <Skeleton animation="wave" width={'100%'}/>
                                </Typography>
                                <Typography component="div" variant="caption">
                                    <Skeleton animation="wave" width={120} />
                                </Typography>
                                <Box display="flex" flexDirection="row" my={1}>
                                  <Skeleton variant="circle" animation="wave" height={40} width={40} style={{marginRight:'2px'}} />
                                  <Skeleton variant="circle" animation="wave" height={40} width={40} style={{marginRight:'2px'}} />
                                  <Skeleton variant="circle" animation="wave" height={40} width={40} style={{marginRight:'2px'}} />
                                </Box>
                                <Typography component="div" variant="caption">
                                    <Skeleton animation="wave" width={140} />
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
};

export default AppSkeleton;
