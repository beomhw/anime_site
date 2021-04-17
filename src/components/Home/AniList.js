import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import * as api from '../../api';
import dogeza from '../../asset/dogeza.png';
import {IMG_URL} from '../../Util';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/swiperStyle.css';
import {Link} from 'react-router-dom';
import Loading from '../Loading';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LinkStyle = styled(Link)`
    z-index: 10;
`;

const Container = styled.div`
    width: 100%;
    height: 500px;
    @media(max-width: 500px) {
        height: 250px;
        margin: 10px 0 10px 0px;
    }
`;

const AniContainer = styled.div`
    float: left;
    ${flexAlign};
    width: 300px;
    height: 500px;
    flex-direction: column;
    cursor: pointer;
    @media(max-width: 500px) {
        width: 180px;
        height: 250px;
    }
`;

const LoadingBox = styled.div`
    ${flexAlign};
    height: 500px;
    font-size: 1.4em;
    transition: unset;
    @media(max-width: 500px) {
        height: 250px;
    }
`;

const Img = styled.img`
    max-width: 300px;
    height: auto;
    @media(max-width: 500px) {
        max-width: 150px;
        object-fit: cover;
    }
`;

const breakpoints = {
    0: {
        slidesPerView: 2,
        spaceBetween: 0,
        freeMode: true
    },
    620: {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup: 2
    },
    920: {
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerGroup: 3
    },
    1280: {
        slidesPerView: 4,
        spaceBetween: 5,
        slidesPerGroup: 4
    },
    1620: {
        slidesPerView: 5,
        spaceBetween: 6,
        slidesPerGroup: 5
    }
}

const AniList = ({media,type,la,year}) => {
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.getAnime(media,type,la,year).then(res => {
            setTrend(res.results);
            setLoading(false);
        })
    },[la]);

    if(loading) return <LoadingBox><Loading /></LoadingBox>

    return (
        <Container>
            <Swiper
                breakpoints={breakpoints}
                pagination={{clickable: true}}
                navigation
            >
            {trend.map((da, i) => {
                return (
                    <SwiperSlide key={i}>
                        <LinkStyle to={`/anime_site/detail/${da.id}/${media}`}>
                        <AniContainer>
                            {da.poster_path === null ? 
                                <Img src={dogeza}/> :
                                <Img src={`${IMG_URL}${da.poster_path}`}/>
                            }
                        </AniContainer>
                        </LinkStyle>
                    </SwiperSlide>
                );
            })}
            </Swiper>
        </Container>
    );
}

export default AniList;