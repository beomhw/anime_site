import React, {useState, useEffect, useCallback} from 'react';
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
    opacity: ${p=>p.opacity};
    visibility: ${p=>p.visibility};
`;

// 스크롤 내릴 시 나타나게 하고 맨 위에 위치 시 안 보이게
const UpToggle = () => {
    const [state, setState] = useState({
        opacity: 0,
        visibility: 'hidden'
    });

    useEffect(() => {
        window.onscroll = function () {
            if(window.pageYOffset > 200) {
                setState({
                    opacity: 1,
                    visibility: 'visible'
                })
            } else {
                setState({
                    opacity: 0,
                    visibility: 'hidden'
                })
            }
        }
    },[])

    const onTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    return (
        <Circle onClick={onTop} opacity={state.opacity} visibility={state.visibility}>
            <BsCaretUpFill />
        </Circle>
    );
}

export default React.memo(UpToggle);