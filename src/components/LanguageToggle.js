import React, {useState} from 'react';
import styled from 'styled-components';
import {ImEarth} from 'react-icons/im';

const Toggle = styled.div`
    border-radius: 10px;
    position: absolute;
    right: 90px;
    font-size: 1.5em;
    margin: 10px;
    &:hover {
        color: #ac0d0d;
    }
    &:active {
        color: #ac0d0f;
    }
    cursor: pointer;
`;

const LanguageToggle = () => {
    const [on, setOn] = useState({
        opacity: 0,
        visibility: 'hidden'
    })

    const onOpen = () => {
        setOn({
            opacity: 1,
            visibility: 'visible'
        })
    }

    return (
        <Toggle>
            <ImEarth onClick={onOpen}/>
        </Toggle>
    );
}

export default LanguageToggle;