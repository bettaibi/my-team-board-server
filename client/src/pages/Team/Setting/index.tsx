import React from 'react';
import {
    Box
} from '@material-ui/core';
import {

} from '@material-ui/icons';
import MyAccordion from '../../../components/MyAccordion';
import EmailSetting from './EmailSetting';
import PasswordSetting from './PasswordSetting';

const Setting: React.FC = () => {
    
    return (

        <Box p={2}>
            <MyAccordion label="Account Setting" isOpen = {true}>
                <EmailSetting />
            </MyAccordion>

            <MyAccordion label="Security">
               <PasswordSetting />
            </MyAccordion>
        </Box>
    )
}

export default Setting;
