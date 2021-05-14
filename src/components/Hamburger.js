import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
    z-index: 200;
    margin-right: 10px;
    user-select: none;
    .burger {
        width: 30px;
        height: 3px;
        border-radius: 2px;
        background-color: ${p=>p.themeMode.text};
        margin-bottom: 5px;
        z-index: 200;
        user-select: none;
    }
    .burger_center {
        transform: translate(0px);
        opacity: ${p=>p.on.opacity};
        visibility: ${p=>p.on.visibility};
        transition: 0.2s;
    }
    .burger_top {
        transform: translate(0px, ${p=>p.on.y}px) rotate(${p=>p.on.rotate}deg);
        transition: 0.2s;
    }
    .burger_bottom {
        transform: translate(0px, -${p=>p.on.y}px) rotate(-${p=>p.on.rotate}deg);
        transition: 0.2s;
    }
`;

const Hamburger = ({la, setOn, nav, theme, pathname}) => {
    const [burgerOn, setBurgerOn] = useState({
        opacity: 1,
        visibility: 'visible',
        rotate: 0,
        x: 0,
        y: 0
    })

    useEffect(() => {
        setOn({
            nav: false,
            opacity: 0,
            visibility: 'hidden'
        })
        setBurgerOn({
            opacity: 1,
            visibility: 'visible',
            rotate: 0,
            x: 0,
            y: 0
        })
    },[pathname, la]);

    const onActive = () => {
        if(nav) {
            setOn({
                nav: false,
                opacity: 0,
                visibility: 'hidden'
            })
            setBurgerOn({
                opacity: 1,
                visibility: 'visible',
                rotate: 0,
                x: 0,
                y: 0
            })
        } else {
            setOn({ 
                nav: true,
                opacity: 1,
                visibility: 'visible'
            })
            setBurgerOn({
                opacity: 0,
                visibility: 'hidden',
                rotate: 130,
                x: -5,
                y: 8
            })
        }
    }

    return (
        <Container themeMode={theme} onClick={onActive} on={burgerOn}>
            <span className="burger burger_top" />
            <span className="burger burger_center" />
            <span className="burger burger_bottom" />
        </Container>
    );
};

export default Hamburger;