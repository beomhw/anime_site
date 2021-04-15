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
`;

const AniContainer = styled.div`
    float: left;
    ${flexAlign};
    width: 300px;
    height: 500px;
    flex-direction: column;
    cursor: pointer;
`;

const LoadingBox = styled.div`
    ${flexAlign};
    height: 500px;
    font-size: 1.4em;
    transition: unset;
`;

const Img = styled.img`
    max-width: 300px;
    height: auto;
`;

const breakpoints = {
    500: {
        slidesPerView: 1,
        spaceBetween: 5,
        freeMode: true
    },
    620: {
        slidesPerView: 2,
        spaceBetween: 5,
        freeMode: false,
    },
    920: {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: false,
    },
    1280: {
        slidesPerView: 4,
        spaceBetween: 5,
        freeMode: false,
    },
    1620: {
        slidesPerView: 5,
        spaceBetween: 5,
        freeMode: false,
    }
}

const AniList = ({media,type,la}) => {
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.getAnime(media,type,la).then(res => {
            setTrend(res.results);
            setLoading(false);
        })
    },[la]);

    if(loading) return <LoadingBox><Loading /></LoadingBox>

    return (
        <Container>
            <Swiper
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={breakpoints}
                pagination={{clickable: true}}
                navigation
            >
            {trend.map((da, i) => {
                return (
                    <SwiperSlide key={i}>
                        <LinkStyle to={`/detail/${da.id}/${media}`}>
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