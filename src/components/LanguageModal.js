import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {RiCloseLine} from 'react-icons/ri';
import {useLanguageDispatch} from '../LanguageContext';
import kr from '../asset/kr.png';
import en from '../asset/en.png';
import jp from '../asset/jp.png';

const Overlay = styled.div`
    width: ${p=>p.size.width}px;
    height: ${p=>p.size.height}px;
    margin: 0 auto;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${p=>p.modal.opacity};
    visibility: ${p=>p.modal.visibility};
`;

const Container = styled.div`
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background-color: ${p=>p.theme.container};
    margin: 0 auto;
    position: fixed;
    z-index: 500;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    padding: 5px;
    font-size: 1.4em;
    flex-direction: row-reverse;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Message = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Flag = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-image: url(${p=>p.url});
    background-size: cover;
    margin: 10px;
    filter: grayscale(60%);
    &:hover {
        filter: grayscale(0%);
    }
    cursor: pointer;
`;

// window size get
function useGetSize () {
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            })
        }
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    },[]);

    return size;
}

const LanguageModal = ({modal, setModal}) => {
    const size = useGetSize();
    const theme = useTheme();
    const dispatch = useLanguageDispatch();

    const onExit = () => setModal({opacity: 0, visibility: 'hidden'});

    const onChange = (lg_type) => {
        onExit();
        return dispatch({type: lg_type});
    }

    return (
        <Overlay size={size} modal={modal}>
            <Overlay size={size} modal={modal} onClick={onExit} />
            <Container theme={theme}>
                <Header><RiCloseLine style={{cursor: 'pointer'}} onClick={onExit} /></Header>
                <Message>Select your language</Message>
                <Content>
                    <Flag url={kr} onClick={() => onChange('KO')}/>
                    <Flag url={en} onClick={() => onChange('EN')} />
                    <Flag url={jp} onClick={() => onChange('JP')} />
                </Content>
            </Container>
        </Overlay>
    );
}

export default LanguageModal;