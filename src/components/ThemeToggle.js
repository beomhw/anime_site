import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useTheme, useThemeDispatch} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';

const Button = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 30px;
    border: 2px solid gray;
    background-color: ${p => p['data-thememode'].container};
    cursor: pointer;
    transition-duration: 0.3s;
    border-color: #ac0d0d;    
`;

const SwitchButton = styled.button`
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
    cursor: pointer;
    color: yellow;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 10px;
`;

const ThemeToggle = () => {
    const [x, setX] = useState();
    const [on, setOn] = useState(true);
    const theme = useTheme();
    const dispatch = useThemeDispatch();

    useEffect(() => {
        console.log(x) // TODO::버그 대응 필요하다!!!!!
        setX(-1);
    },[]);

    useEffect(() => {
        on ? setX(-1) : setX(29);
        on ? dispatch({
            type: 'DARK',
        }) :
        dispatch({
            type: 'LIGHT'
        })
    },[on])

    //console.log(theme);

    const Change = useCallback(() => {
        setOn(!on);
    }, [on]);

    return (
        <Div>
            <Button onClick={Change} data-thememode={theme}>
                <SwitchButton move={x} />
            </Button>
        </Div>
    );
}

export default React.memo(ThemeToggle);