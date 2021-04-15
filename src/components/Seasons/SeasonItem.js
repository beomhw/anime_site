import styled from 'styled-components';
import {IMG_URL} from '../../Util';
import dogeza from '../../asset/dogeza_reco.png';
import {flexAlign} from '../../css/cssModule';
import {Link} from 'react-router-dom';

const Title = styled.div`
    width: 200px;
    height: 50px;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(255,255,255,0.7);
    color: black;
    ${flexAlign};
    font-size: 0.9em;
    user-select: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 200px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    background-image: url(${p=>p.url});
    background-size: cover;
    margin: 10px;
    &:hover ${Title} {
        opacity: 1;
        visibility: visible;
    }
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const SeasonItem = ({item}) => {
    return (
        <Link to={`/detail/${item.id}/tv`} >
        {item.backdrop_path === null ? <Container url={dogeza}></Container> :
            <Container url={`${IMG_URL}${item.backdrop_path}`}>
                <Title>{item.name}</Title>
            </Container>
        }
        </Link>
    );
}

export default SeasonItem;