// 모달 형식으로 시즌 정보 제공
import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';
import {ImCancelCircle} from 'react-icons/im';
import * as api from '../../api';
import Episode from './Episode';
import {useLanguage} from '../../LanguageContext';

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
    opacity: ${p=>p.modal.opacity};
    visibility: ${p=>p.modal.visibility};
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

const Header = styled.div`
    width: 100%;
    height: 80px;
`;

const Nav = styled.div`
    height: 50px;
    font-size: 2.2em;
    padding: 20px;
    position: absolute;
`;

const Menu = styled.select`
    width: 100px;
    padding: 20px;
    margin-left: 20px;
    height: 30px;
    border-radius: 10px;
    border: none;
    background-color: rgba(0,0,0,0.2);
    &:focus {
        outline: none;
    }
`;

const Exit = styled.div`
    float: right;
    font-size: 30px;
    padding: 10px;
    &:hover {
        color: #810000;
    }
    cursor: pointer;
`;

const EpisodeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 50px;
    flex-direction: column;
    overflow-y: scroll; // 스크롤
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

const EpisodeList = ({id, seasons, modal, setModal}) => {
    const la = useLanguage();
    const [seasonId, setSeasonId] = useState(1);
    const [seasonInfo, setSeasonInfo] = useState();
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const size = useGetSize();
    console.log(seasons);

    useEffect(() => {
        setLoading(true);
        api.getSeasonEpisodes(id, seasonId, la.type).then(res => {
            console.log(res.data);
            let data = res.data.episodes.filter(ep => new Date(ep.air_date) < new Date());
            setSeasonInfo({name: res.data.name, data: data});
            setLoading(false);
        })
    },[seasonId]);

    const onChange = (e) => setSeasonId(e.target.value);
    const onExit = () => setModal({
        opacity: 0,
        visibility: 'hidden'
    })

    return (
        <Overlay size={size} modal={modal}>
            <Overlay size={size} modal={modal} onClick={onExit} />
            {loading ? <Container theme={theme}> Now loading.. </Container> :
            <Container theme={theme}>
                <Header><Exit onClick={onExit}><ImCancelCircle /></Exit></Header>
                <Nav>{seasonInfo.name}
                    <Menu value={seasonId} onChange={onChange}>
                        {seasons.map((se,i) => <option key={i} value={i+1}> {se.name} </option>)}
                    </Menu>
                </Nav>
                <EpisodeContainer>
                {seasonInfo.data.map((ep,i) => 
                    <Episode key={i} ep={ep}/>
                )}
                </EpisodeContainer>
            </Container>
            }
        </Overlay>
    );
}

export default EpisodeList;