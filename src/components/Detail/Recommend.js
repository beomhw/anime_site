import React from 'react';
import styled,{css} from 'styled-components';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';
import {IMG_URL} from '../../Util';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/swiperStyle.css';
import {BsCalendar} from 'react-icons/bs';
import {Link} from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



const Container = styled.div`
    width: 80vw;
    height: 200px;
    overflow: hidden;
    display: flex;
    flex-direction: flex-start;
    margin-top: 20px;
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
`;

const Title = styled.div`
    font-size: 0.8em;
    padding-left: 5px;
    flex: 1;
`;

const breakpoints = {
    500: {
        slidesPerView: 1,
        spaceBetween: 5
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

const Recommend = ({recommendations, media}) => {
    const theme = useTheme();
    console.log(recommendations);

    return (
        <Container>
            <Swiper
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                freeMode
                breakpoints={breakpoints}
            >
                {recommendations.map((re, i) => 
                    <SwiperSlide key={i}>
                        <ContentBox>
                            <LinkStyle to={`/detail/${re.id}/${media}`}>
                            <BackDrop url={`${IMG_URL}${re.backdrop_path}`}>
                                <OpacityInfo>
                                    <BsCalendar /> {re.first_air_date}   
                                </OpacityInfo>
                            </BackDrop>
                            </LinkStyle>
                            <Title>
                                {re.name}
                            </Title>
                        </ContentBox>
                    </SwiperSlide>
                )}
            </Swiper>
            
        </Container>
    );
}

export default Recommend;