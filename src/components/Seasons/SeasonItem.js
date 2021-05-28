import React from 'react';
import styled from 'styled-components';
import {IMG_URL} from '../../Util';
import dogeza from '../../asset/dogeza_reco.png';
import {flexAlign} from '../../css/cssModule';
import {Link} from 'react-router-dom';

const Title = styled.div`
    width: 250px;
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
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 140px;
        height: 20px;
        font-size: 0.7em;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 250px;
    height: 150px;
    border-radius: 10px;
    background-image: url(${p=>p.url});
    background-size: cover;
    &:hover ${Title} {
        opacity: 1;
        visibility: visible;
    }
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 140px;
        height: 90px;
        margin: 5px;
    }
`;

const LinkStyle = styled(Link)`
    @media (max-width: ${p=>p.theme.mobile}) {
        margin: 5px;
    }
    @media (min-width: ${p=>p.theme.mobile}) {
        margin: 10px;
    }
`;

const SeasonItem = ({item}) => {
    return (
        <LinkStyle  to={`/anime_site/detail/${item.id}/tv`} >
        {item.backdrop_path === null ? <Container url={dogeza}></Container> :
            <Container url={`${IMG_URL}${item.backdrop_path}`}>
                <Title>{item.name}</Title>
            </Container>
        }
        </LinkStyle>
    );
}

export default React.memo(SeasonItem);