import React from 'react';
import styled from 'styled-components';
import {ImEarth} from 'react-icons/im';

const Toggle = styled.div`
    border-radius: 10px;
    font-size: 1.5em;
    margin: 10px;
    margin-left: auto;
    &:hover {
        color: #ac0d0d;
    }
    &:active {
        color: #ac0d0f;
    }
    cursor: pointer;
`;

const LanguageToggle = ({setModal}) => {

    const onOpen = () => setModal({opacity: 1, visibility: 'visible'})

    return (
        <Toggle>
            <ImEarth onClick={onOpen}/>
        </Toggle>
    );
}

export default React.memo(LanguageToggle);