import React,{useState, useEffect} from 'react';
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
    z-index: 50;
    ${flexAlign};
    /* opacity: ${p=>p.modal.opacity};
    visibility: ${p=>p.modal.visibility}; */
`;

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    border-radius: 20px;
    background-color: ${p=>p.theme.container};
    margin: 0 auto;
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column;
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

const LanguageModal = () => {
    const size = useGetSize();

    return (
        <Overlay size={size}>
            <Container>

            </Container>
        </Overlay>
    );
}

export default LanguageModal;