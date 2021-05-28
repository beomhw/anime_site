import React, {useEffect} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {IMG_URL} from '../../Util';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{Scrollbar} from 'swiper/core';
import '../../css/swiperStyle.css';
import ApngComponent from 'react-apng';
import ghost from '../../asset/ghost.png';
import {useLanguage} from '../../LanguageContext';
import YouTube from 'react-youtube';

SwiperCore.use([Scrollbar]);

const YoutubeStyle = styled(YouTube)`
    max-width: 500px;
    max-height: 280px;
    @media(max-width: 500px) {
        max-width: 400px;
        max-height: 220px;
    }
`;

const Container = styled.div`
    width: 80vw;
    height: 330px;
    overflow: hidden;
    display: flex;
    flex-direction: flex-start;
    margin: 20px;
`;

const Still = styled.img`
    max-width: 100%;
    border-radius: 10px;
`;

const NoneImg = styled.div`
    ${flexAlign};
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

const StillCut = ({still, teaser}) => {
    const theme = useTheme();
    const la = useLanguage();
    
    useEffect(() => {
        if(teaser) {
            if(teaser.length > 0) {
                console.log('teaser true');
            }
        };
    }, []);

    console.log(teaser);

    if(still.length === 0) {
        return (
            <Container>
                <NoneImg>
                    <ApngComponent autoPlay={true} src={ghost} />
                    <h2>{la.Detail.none_img}</h2>
                </NoneImg>
            </Container>
        )
    }

    const onReady = e => e.target.pauseVideo();

    return (
        <Container themeMode={theme}>
            <Swiper
                navigation
                slidesPerView={1}
                scrollbar={{draggable: true}} 
            >
                {still.map((st, i) =>
                    <SwiperSlide key={i}>
                        <Still src={`${IMG_URL}${st.file_path}`} />
                    </SwiperSlide>
                )}
                {teaser.map((te, i) => 
                    <SwiperSlide key={i}>
                        <YoutubeStyle videoId={te.key} onReady={onReady} />
                    </SwiperSlide>
                )}
            </Swiper>
        </Container>
    );
}

export default React.memo(StillCut);
