import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import * as api from '../../api';
import dogeza from '../../asset/dogeza.png';
import {IMG_URL} from '../../Util';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/swiperStyle.css';
import {Link} from 'react-router-dom';

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

const Loading = styled.div`
    ${flexAlign};
    height: 500px;
    font-size: 1.4em;
    color: ${p=>p.theme.text};
`;

const Img = styled.img`
    max-width: 300px;
    height: auto;
`;

const breakpoints = {
    0: {
        slidesPerView: 1,
        spaceBetween: 5
    },
    610: {
        slidesPerView: 2,
        spaceBetween: 5
    },
    910: {
      slidesPerView: 3,
      spaceBetween: 5
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 5
    },
    1620: {
      slidesPerView: 5,
      spaceBetween: 5
    }
}

const AniList = ({media,type}) => {
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();


    useEffect(() => {
        api.getAnime(media,type).then(res => {
            setTrend(res.results);
            setLoading(false);
        })
    },[]);

    if(loading) return <Loading theme={theme}>Now Loading...</Loading>

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
                        <LinkStyle to={`/detail/${da.id}`}>
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