import React from 'react';
import {
    Typography,
    Box,
    Avatar
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import "./style.css";

import avatar1 from '../../assets/avatars/Abbott.jpg';
import avatar2 from '../../assets/avatars/Christy.jpg';
import avatar3 from '../../assets/avatars/Barrera.jpg';
import avatar4 from '../../assets/avatars/Henderson.jpg';

const useStyle = makeStyles((theme) => ({
    primaryTitle: {
        color: '#F1F5F9',
        fontWeight: 700,
        marginLeft: '0px'
    },
    desc: {
        color: '#94A3B8'
    }
}))

const Welcome = () => {
    const style = useStyle();

    return (
        <Box px={6} display="flex" flexDirection="column" justifyContent="center" className="bg-intro">
            <Typography variant="h4" gutterBottom align="left" className={style.primaryTitle}>
                Welcome to our community
            </Typography>

            <Typography variant="subtitle2" align="left" gutterBottom className={style.desc}>
                Transform the way you work with one place for everyone and everything you need to get stuff done.
                Give everyone you work with inside or outside your company a more productive way to stay in sync,
                and simplify all your communination into one place.
            </Typography>

            <Box alignSelf="start" mt={3}>
                <AvatarGroup max={4} style={{ marginBottom: '0.5rem' }}>
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Remy Sharp" src={avatar2} />
                    <Avatar alt="Remy Sharp" src={avatar3} />
                    <Avatar alt="Remy Sharp" src={avatar4} />
                </AvatarGroup>
                <small className={style.desc}>
                    More than 17k people joined us, it's your turn
                </small>
            </Box>

        </Box>
    )
}

export default Welcome;
