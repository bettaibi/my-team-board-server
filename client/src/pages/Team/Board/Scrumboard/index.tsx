import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
    IconButton,
    Badge,
    Button,
    MenuItem
} from '@material-ui/core';
import RoundedButton from '../../../../components/RoundedButton';
import clsx from 'clsx';
import {
    AppsOutlined,
    EditOutlined,
    MoreVertOutlined,
    AddCircleOutline,
    DeleteOutline
} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import UsePopover from '../../../../hooks/usePopover';


const aspects = [
    {
        title: 'aspect 1',
        cards: [
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
        ]
    },
    {
        title: 'aspect 2',
        cards: [
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur' },
        ]
    },
    {
        title: 'aspect 1',
        cards: [
            { value: 'Lorem ipsum dolor sit amet consectetur' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
        ]
    },
    {
        title: 'aspect 1',
        cards: [
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' }
        ]
    },
    {
        title: 'aspect 1',
        cards: [
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maxime repellendus aliquid asperiores nobis et ut hic, debitis necessitatibus velit dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. dolorum, quia saepe nisi at unde, atque consequatur officia ab.' },
            { value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' },
        ]
    },
]

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
        width: '288px',
        minWidth: '288px',
        marginRight: '1rem',
        height: 'fit-content',
    },
    card: {
        backgroundColor: 'white',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        borderRadius: 10,
    },
    addCardButton: {
        marginTop: theme.spacing(1),
        width: '100%',
        borderRadius: 10,
        color: '#64748B'
    }
}));

const Scrumboard = () => {
    const classes = useStyle();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <Box display="flex" flexDirection="column" overflow="hidden">
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
            <Box p={2} display="flex" flexDirection="row" overflow="auto">
                {
                    aspects.map((item: any) => (
                        <Aspect key={item} cards={item.cards} />
                    ))
                }
            </Box>
        </Box>
    )
};

const Aspect = ({ cards }: { cards: any[] }) => {
    const classes = useStyle();
    const { PopoverComponent, handleClick, handleClose } = UsePopover();

    return (
        <Box className={classes.aspect}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Aspect</Typography>
                <Box>
                    <Badge badgeContent={cards.length} color="primary" style={{ marginRight: '1rem' }} />

                    <IconButton size="small" aria-describedby="simple_menu" onClick={handleClick}>
                        <MoreVertOutlined />
                    </IconButton>

                    <PopoverComponent id="simple_menu">
                        <MenuItem onClick={handleClose} style={{padding: '1rem'}}> 
                                <DeleteOutline  className={classes.iconColor} />
                                <span style={{ marginLeft: '0.8rem' }}>Delete List</span>
                        </MenuItem>
                    </PopoverComponent>
                </Box>
            </Box>
            <React.Fragment>
                {
                    cards.map((item: any) => (
                        <Card key={item.value} value={item.value} />
                    ))
                }
                <Button className={classes.addCardButton} size="small">
                    <AddCircleOutline className={classes.mr} />
                    <span>Add another card</span>
                </Button>
            </React.Fragment>
        </Box>
    )
};


const Card = ({ value }: { value: string }) => {
    const classes = useStyle();

    return (
        <Box boxShadow={2} className={classes.card} >
            {value}
        </Box>
    )
}

export default Scrumboard;
