import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../css/cssModule';

const Overlay = styled.div`
    width: ${p=>p.size.width}px;
    height: ${p=>p.size.height}px;
    margin: 0 auto;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    ${flexAlign};
    opacity: ${p=>p.modal.opacity};
    visibility: ${p=>p.modal.visibility};
`;

const Modal = ({children, size, modal, onExit}) => {

    return (
        <Overlay size={size} modal={modal}>
            <Overlay size={size} modal={modal} onClick={onExit} />
            {children}
        </Overlay>
    );
}

export default React.memo(Modal);