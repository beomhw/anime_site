// 모달 형식으로 시즌 정보 제공
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';
import {ImCancelCircle} from 'react-icons/im';
import * as api from '../../api';
import Episode from './Episode';
import {useLanguage} from '../../LanguageContext';
import {useGetSize} from '../resize';
import Loading from '../Loading';
import Modal from '../Modal';

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    border-radius: 20px;
    background-color: ${p=>p.themeMode.container};
    margin: 0 auto;
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 100px;
    border-bottom: 2px solid #dddddd;
`;

const Nav = styled.div`
    height: auto;
    padding: 20px;
    position: absolute;
    display: flex;
    justify-content: center;
`;

const Menu = styled.select`
    width: 100px;
    margin-left: 20px;
    height: 30px;
    border-radius: 10px;
    border: none;
    color: ${p=>p.themeMode.text};
    background-color: rgba(0,0,0,0.2);
    &:focus {
        outline: none;
    }
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 70px;
        height: 30px;
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

const LoadingBox = styled.div`
    ${flexAlign};
    height: 100%;
`;

const H3 = styled.h3`
    font-size: 2em;
    margin: 0;
    display: inline;
    @media (max-width: ${p=>p.theme.mobile}) {
        font-size: 1em;
    }
`;

const EpisodeList = ({id, seasons, modal, setModal}) => {
    const la = useLanguage();
    const [seasonId, setSeasonId] = useState(seasons[0].season_number);
    const [seasonInfo, setSeasonInfo] = useState();
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const size = useGetSize();
    console.log(seasons);

    useEffect(() => {
        setLoading(true);
        // null이면 안되는데..
        api.getSeasonEpisodes(id, seasonId, la.type).then(res => {
            console.log(res.data);
            let data = res.data.episodes.filter(ep => new Date(ep.air_date) < new Date());
            setSeasonInfo({name: res.data.name, data: data, air_date: res.data.air_date});
            setLoading(false);
        })
    },[seasonId]);

    const onChange = (e) => setSeasonId(e.target.value);
    const onExit = () => setModal({
        opacity: 0,
        visibility: 'hidden'
    })

    return (
        <Modal size={size} modal={modal} onExit={onExit}>
            {loading ? <Container themeMode={theme}><LoadingBox> <Loading /> </LoadingBox></Container> :
            <Container themeMode={theme}>
                <Header><Exit onClick={onExit}><ImCancelCircle /></Exit></Header>
                <Nav>
                    <H3>
                        {seasonInfo.name}
                    </H3>
                    <Menu themeMode={theme} value={seasonId} onChange={onChange}>
                        {seasons.map((se,i) => <option key={i} value={se.season_number}> {se.name} </option>)}
                    </Menu>
                </Nav>
                {seasonInfo.air_date !== '' ? 
                <EpisodeContainer>
                {seasonInfo.data.map((ep,i) => 
                    <Episode key={i} ep={ep}/>
                )}
                </EpisodeContainer> :
                <EpisodeContainer>
                    <h2>{la.Detail.will_air}</h2>
                </EpisodeContainer>
                }
            </Container>
            }
        </Modal>
    );
}

export default EpisodeList;