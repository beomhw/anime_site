import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {RiCloseLine} from 'react-icons/ri';
import {useLanguageDispatch} from '../LanguageContext';
import {useGetSize} from './resize';
import Modal from './Modal';
import kr from '../asset/kr.png';
import en from '../asset/en.png';
import jp from '../asset/jp.png';

const Container = styled.div`
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background-color: ${p=>p['data-thememode'].container};
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
        <Modal size={size} modal={modal} onExit={onExit}>
            <Container data-thememode={theme}>
                <Header><RiCloseLine style={{cursor: 'pointer'}} onClick={onExit} /></Header>
                <Message>Select your language</Message>
                <Content>
                    <Flag url={kr} onClick={() => onChange('KO')}/>
                    <Flag url={en} onClick={() => onChange('EN')} />
                    <Flag url={jp} onClick={() => onChange('JP')} />
                </Content>
            </Container>
        </Modal>
    );
}

export default LanguageModal;