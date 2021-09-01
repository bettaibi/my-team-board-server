import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  makeStyles,
  Divider,
  Tooltip
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import RoundedButton from '../../../components/RoundedButton';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSidenav from '../../../hooks/useSidenav';
import NewProject from './NewProject';
import userAvatar from '../../../assets/avatars/profile.jpg';
import { AppState, ProjectModel, UserModel } from '../../../models/app.model';
import Moment from 'react-moment';
import { useSharedContext } from '../../../context';
import WithTooltip from '../../../components/WithTooltip';

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '4rem 1.5rem'
  },
  mb: {
    marginBottom: '2.5rem'
  },
  gridContainer: {
    maxWidth: '768px'
  },
  paper: {
    padding: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: 10,
  },
  separator: {
    width: '50px',
    height: '2.6px',
    margin: '1rem 0',
    borderRadius: 5
  }
}));

const Board = () => {
  const projects = useSelector((state: AppState) => state.projects);
  const classes = useStyle();
  const history = useHistory();

  const goToScrumboard = (id: string) => {
    if (id) {
      history.push(`/team/scrumboard/${id}`);
    }
  }

  return (
    <Box className={classes.root} overflow="auto" height="100%" minHeight="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">

      <Typography align="center" variant="h4" className="bg-text-primary fw-700" gutterBottom>
        Workspace's projects
      </Typography>
      <div className={classes.mb}>
        <NewProjectDialog />  
      </div> 

      <Grid container spacing={2} className={classes.gridContainer}>
        {
          projects.map((item: ProjectModel) => (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={4}
              onClick={() => goToScrumboard(item._id || '')}
            >
              <Paper elevation={3} className={clsx('bg-white', classes.paper)}>
                <Typography variant="subtitle1" className="bg-text-primary text-capitalize">
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" component="strong" color="textSecondary" gutterBottom>
                  {item.description.substr(0, 90) + '..'}
                </Typography>
                <Divider className={classes.separator} />

                <AvatarGroup max={4} style={{ marginBottom: '0.5rem' }}>
                  {
                    item.members.map((member: UserModel) => (
                      <Tooltip key={member._id} title={member.name}>
                        <Avatar alt="project members" src={member.avatar ? `${baseURL}/files/${member.avatar}` : userAvatar} />
                      </Tooltip>
                    ))
                  }
                </AvatarGroup>
                <div>
                  <span className="bg-text-secondary">Edited: </span>
                  <Moment fromNow>{item.createdAt}</Moment>
                </div>
              </Paper>
            </Grid>
          ))
        }
      </Grid>

      {
        projects.length === 0 && (
          <Box mt={4}>
            <Typography variant="subtitle1" component="span" style={{ color: 'lightgray' }} gutterBottom>
              No projects created yet
            </Typography>
          </Box>
        )
      }
    </Box>
  )
}

const NewProjectDialog = () => {
  const classes = useStyle();
  const { onSidenavClose, onSidenavOpen, SidenavComponent } = useSidenav('right', 'persistent');
  const { owner, currentUser } = useSharedContext();
  let disabled = !(owner === currentUser._id);

  return (
    <React.Fragment>
      <WithTooltip title="New Project"
        text="Only the owner of the selected workspace has the ability to add or remove projects.">

        <span>
          <RoundedButton disabled={disabled} onClick={onSidenavOpen} variant="outlined" color="default" size="large"
            className={clsx('bg-text-secondary')}>
            CREATE NEW PROJECT
          </RoundedButton>
        </span>
      </WithTooltip>

      <SidenavComponent>
        <div style={{ overflowY: 'auto', height: 'calc(100% - 56px)', marginTop: '56px', }}>
          <NewProject onSidenavClose={onSidenavClose} />
        </div>
      </SidenavComponent>
    </React.Fragment>
  )
};

export default Board;
