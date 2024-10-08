import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {IMG_ORIGINAL_URL} from '../../Util';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/swiperStyle.css';
import {BsCalendar} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import ghost from '../../asset/ghost.png';
import dogeza from '../../asset/dogeza_reco.png';
import ApngComponent from 'react-apng';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Container = styled.div`
    width: 80vw;
    height: 200px;
    overflow: hidden;
    display: flex;
    flex-direction: flex-start;
    margin: 20px 0 10px 0;
`;

const ContentBox = styled.div`
    width: 300px;
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`;

const OpacityInfo = styled.div`
    opacity: 0;
    position: relative;
    height: 30px;
    background-color: rgba(255,255,255,0.8);
    bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: black;
    padding: 5px;
    font-size: 0.9em;
`;

const LinkStyle = styled(Link)`
    z-index: 15;
    flex: 5;
    display: flex;
`;

const BackDrop = styled.div`
    background-image: url(${p=>p.url});
    width: 100%;
    background-size: cover;
    background-position: center;
    flex: 5;
    border-radius: 10px;
    display: flex;
    flex-direction: column-reverse;
    &:hover ${OpacityInfo} {
        opacity: 1;
    }
    @media (max-width: ${p=>p.theme.tabletM}) {
        ${OpacityInfo} {
            opacity: 1;
        }
    };
`;

const Title = styled.div`
    margin: 5px 0 0 0;
    font-size: 0.8em;
    padding-left: 5px;
    flex: 1;
`;

const NoneAl = styled.h1`
    ${flexAlign};
    height: 200px;
    @media (max-width: ${p=>p.theme.tabletS}) {
        flex-direction: column;
    }
    @media (max-width: ${p=>p.theme.mobile}) {
        font-size: 1em;
    }
`;

const breakpoints = {
    500: {
        slidesPerView: 2,
        spaceBetween: 0
    },
    620: {
        slidesPerView: 2,
        spaceBetween: 5
    },
    920: {
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

const Recommend = ({recommendations, media, la}) => {
    //console.log(recommendations);
    // 추천 알고리즘에서 애니메이션만 선별
    const recommend = recommendations.filter(re => re.genre_ids.includes(16));

    if(recommend.length === 0) {
        return (
            <NoneAl>
                <ApngComponent autoPlay={true} src={ghost} /> 
                {la.Detail.null_recommend}
            </NoneAl>
        )
    }

    return (
        <Container>
            <Swiper
                freeMode
                freeModeMomentumBounce={0.1}
                freeModeMomentumBounceRatio={0.1}
                breakpoints={breakpoints}
            >
                {recommend.map((re, i) => 
                    <SwiperSlide key={i}>
                        <ContentBox>
                            <LinkStyle to={`/anime_site/detail/${re.id}/${media}`} replace={true} >
                            {re.backdrop_path === null ?
                            <BackDrop url={`${dogeza}`}>
                                <OpacityInfo>
                                    <BsCalendar />  {media === 'movie' ? re.release_date : re.first_air_date}
                                </OpacityInfo>
                            </BackDrop> :
                            <BackDrop url={`${IMG_ORIGINAL_URL}${re.backdrop_path}`}>
                                <OpacityInfo>
                                    <BsCalendar /> {media === 'movie' ? re.release_date : re.first_air_date} 
                                </OpacityInfo>
                            </BackDrop> }
                            </LinkStyle>
                            <Title>
                                {media === 'movie' ? re.title : re.name}
                            </Title>
                        </ContentBox>
                    </SwiperSlide>
                )}
            </Swiper>
            
        </Container>
    );
}

export default React.memo(Recommend);