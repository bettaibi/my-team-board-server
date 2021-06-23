import React from 'react';

interface DropWrapperProps{
    onDrop: (data: any, status: string) => void;
    status: string;
}
const DropWrapper: React.FC<DropWrapperProps> = ({onDrop, children, status}) => {

    const allowDrop = (e: any) => e.preventDefault();

    const handleDrop = (e: any) => {
        const data = JSON.parse(e.dataTransfer.getDate('item'));
        onDrop(data, status);
    }

    return (
        <div onDragOver = {allowDrop} onDrop = {handleDrop}>
            {children}
        </div>
    )
}

export default DropWrapper
