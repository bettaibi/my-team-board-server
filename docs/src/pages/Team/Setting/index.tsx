import React from 'react';
import {
    Box
} from '@material-ui/core';

import MyAccordion from '../../../components/MyAccordion';
import EmailSetting from './EmailSetting';
import PasswordSetting from './PasswordSetting';
import ActiveWorkspaceSetting from './ActiveWorkspaceSetting';

const Setting: React.FC = () => {
    
    return (

        <Box p={2}>

            <MyAccordion label="Workspace Setting" isOpen = {true}>
                <ActiveWorkspaceSetting />
            </MyAccordion>

            <MyAccordion label="Account Setting">
                <EmailSetting />
            </MyAccordion>

            <MyAccordion label="Security">
               <PasswordSetting />
            </MyAccordion>
        </Box>
    )
}

export default Setting;
