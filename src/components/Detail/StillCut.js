import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {IMG_URL} from '../../Util';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{Scrollbar} from 'swiper/core';
import '../../css/swiperStyle.css';

SwiperCore.use([Scrollbar]);


const Container = styled.div`
    width: 80vw;
    height: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: flex-start;
    margin: 20px;
`;

const Still = styled.img`
    max-height: 100%;
    border-radius: 10px;
`;

const StillCut = ({still}) => {
    const theme = useTheme();

    return (
        <Container theme={theme}>
            <Swiper
                    slidesPerView={1}
                    scrollbar={{draggable: true}}
                    >
                {still.map((st, i) => 
                    <SwiperSlide key={i}>
                        <Still src={`${IMG_URL}${st.file_path}`} />
                    </SwiperSlide>
                )}
            </Swiper>
        </Container>
    );
}

export default StillCut;
