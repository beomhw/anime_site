import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme, useThemeDispatch} from '../ThemeContext';
import {BsMoon} from 'react-icons/bs';
import {HiSun} from 'react-icons/hi';
import {flexAlign} from '../css/cssModule';

const Button = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 30px;
    border: 2px solid gray;
    background-color: ${p => p.theme.container};
    cursor: pointer;
    transition-duration: 0.3s;
    border-color: #ac0d0d;
    float: right;
    right: 20px;
    position: relative;
`;

const SwitchButton = styled.div`
    ${flexAlign};
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid gray;
    position: relative;
    top: -2px;
    left: ${props => props.move}px;
    background-color: #ac0d0d;
    border-color: #ac0d0d;
    transition-duration: 0.3s;
    &:focus {
        outline: none;
    }
    color: yellow;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
`;

const ThemeToggle = () => {
    const [x, setX] = useState(-1);
    const [on, setOn] = useState(true);
    const theme = useTheme();
    const dispatch = useThemeDispatch();

    useEffect(() => {
        setOn(true);
        on ? dispatch({
            type: 'DARK',
        }) :
        dispatch({
            type: 'LIGHT'
        })
    },[]);

    console.log(theme);

    const Change = () => {
        setOn(!on);
        on ? setX(-1) : setX(29);
        on ? dispatch({
            type: 'DARK',
        }) :
        dispatch({
            type: 'LIGHT'
        })
    }

    return (
        <Div>
            <Button onClick={Change} theme={theme}>
                <SwitchButton move={x}>
                    {on ? <HiSun/> : <BsMoon/>}
                </SwitchButton>
            </Button>
        </Div>
    );
}

export default React.memo(ThemeToggle);