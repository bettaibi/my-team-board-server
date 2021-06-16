import { useState } from 'react';

const useToggle = (state?: boolean) => {
    const [show, setShow] = useState<boolean>(state || false);

    const toggle = () => {
        setShow(state => !state);
    };

    const handleClose = () => {
        setShow(false)
    };

    const handleOpen = () => {
        setShow(true);
    };

    return {
        toggle,
        handleOpen,
        handleClose,
        show
    };
};

export default useToggle;