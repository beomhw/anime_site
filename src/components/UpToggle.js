import React,{useState} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../css/cssModule';
import {BsCaretUpFill} from 'react-icons/bs';

const Circle = styled.div`
    ${flexAlign};
    width: 50px;
    height: 50px;
    position: fixed;
    border-radius: 25px;
    background-color: #ac0d0d;
    border: 0;
    bottom: 20px;
    right: 20px;
    font-size: 1.8em;
    z-index: 100;
    &:hover {
        background-color: #7d0a0a;
    }
    cursor: pointer;
    color: white;
`;


const UpToggle = () => {
    const onTop = () => {
        window.scrollTo(0,0);
    }

    return (
        <Circle onClick={onTop}>
            <BsCaretUpFill />
        </Circle>
    );
}

export default UpToggle;