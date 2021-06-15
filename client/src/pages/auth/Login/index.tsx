import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { 
    Grid, 
    Box,
    Typography,
    TextField
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Welcome from '../../../components/Welcome';
import logo from '../../../assets/logo64.png';
import { Link } from 'react-router-dom';



const Login = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid container>
            <Grid item xs >
               <Box width="100%" pr={{ xs: 1, sm: 3, md: 5}} style={{backgroundColor:'red'}} height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                   <img src={logo} alt="app logo" />
                    <Typography variant="h4" className="fw-700 bg-text-primary" gutterBottom>
                      Sign in
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                       Don't have an account? &nbsp;
                        <Link to="/register">Sign up</Link>
                    </Typography>
                    <Box mt={1} width="100%">
                        <div className="form-group">
                            <label className="bg-text-secondary">Email Address</label>
                            <TextField 
                            className="w-100"
                            placeholder="Enter your email"
                            variant="outlined"
                            size="small"
                        />
                        </div>
                        <div className="form-group">
                            <label className="bg-text-secondary">Password</label>
                            <TextField
                             className="w-100"
                            placeholder="Enter your password"
                            variant="outlined"
                            size="small"
                            type="password"
                        />
                        </div>
                    </Box>
               </Box>
            </Grid>
            { matches && <Grid item xs={6}>
               <Welcome />
            </Grid>}
        </Grid>
    )
}

export default Login;
