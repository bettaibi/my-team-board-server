import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  makeStyles,
  Divider
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import RoundedButton from '../../../components/RoundedButton';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom'; 

import avatar1 from '../../../assets/avatars/Abbott.jpg';
import avatar2 from '../../../assets/avatars/Christy.jpg';
import avatar3 from '../../../assets/avatars/Barrera.jpg';
import avatar4 from '../../../assets/avatars/Henderson.jpg';


const useStyle = makeStyles((theme) => ({
  root: {
    padding: '4rem 2rem'
  },
  mb: {
    marginBottom: '2.5rem' 
  },
  gridContainer: {
    maxWidth: '768px'
  },
  paper: {
    padding: theme.spacing(2),
    cursor: 'pointer'
  },
  separator: {
    width: '50px',
    height: '2.6px',
    margin: '1rem 0',
    borderRadius: 5
  }
}));

const Board = () => {
  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const classes = useStyle();
  const history = useHistory();

  const goToScrumboard = () => {
    history.push('/team/scrumboard');
  }

  return (
    <Box className={classes.root} overflow="auto" height="100%" minHeight="80vh"  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h4" className="bg-text-primary fw-700" gutterBottom>
        Workspace's projects
      </Typography>
      <RoundedButton variant="outlined" color="default" size="large" className={clsx('bg-text-secondary', classes.mb)}>
        CREATE NEW PROJECT
      </RoundedButton>

      <Grid container spacing={2} className={classes.gridContainer}>
        {
          projects.map((item: number) => (
            <Grid key={item} item xs={12} sm={6} md={4} lg={4} 
            onClick={goToScrumboard}
            >
              <Paper elevation={3} className={clsx('bg-white', classes.paper)}>
                <Typography variant="subtitle1" className="bg-text-primary">
                  Admin Dashboard
                </Typography>
                <Typography variant="subtitle2" component="strong" color="textSecondary" gutterBottom>
                  Roadmap for new project
                </Typography>
                <Divider className={classes.separator}  />
                <AvatarGroup max={4} style={{marginBottom: '0.5rem'}}>
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Remy Sharp" src={avatar2} />
                    <Avatar alt="Remy Sharp" src={avatar3} />
                    <Avatar alt="Remy Sharp" src={avatar4} />
                    <Avatar alt="Remy Sharp" src={avatar4} />
                    <Avatar alt="Remy Sharp" src={avatar4} />
                </AvatarGroup>
                <div>
                  <span className="bg-text-secondary">Edited: </span>
                  <span>2 days ago</span>
                </div>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default Board;
