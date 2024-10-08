import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {IMG_URL} from '../../Util';
import * as api from '../../api';
import {useTheme} from '../../ThemeContext';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/swiperStyle.css';
import dogeza from '../../asset/dogeza.png';


// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CastContainer = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 20px;
`;

const CastCard = styled.div`
    width: 150px;
    height: 300px;
    ${flexAlign};
    margin: 10px;
    border: 1px solid #dddddd;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${p=>p['data-thememode'].container};
    overflow: hidden;
`;

const CastImg = styled.img`
    flex: 8;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const CastName = styled.div`
    flex: 5;
    font-size: 0.8em;
    flex-direction: column;
`;

const breakpoints = {
    320: {
        slidesPerView: 2,
        spaceBetween: 0
    },
    400: {
        slidesPerView: 2,
        spaceBetween: 3
    },
    540: {
        slidesPerView: 3,
        spaceBetween: 3
    },
    910: {
      slidesPerView: 5,
      spaceBetween: 3
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 3
    },
    1620: {
      slidesPerView: 7,
      spaceBetween: 3
    }
}

const Cast = ({media, id, la}) => {
    const [casts, setCasts] = useState();
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        api.getAnimeCast(media, id, la.type).then(res => {
            //console.log(res.data);
            setCasts(res.data);
            setLoading(false);
        })
    },[]);

    if(loading) return <CastContainer>Now Loading...</CastContainer>

    if(casts.cast.length === 0) {
        return <CastContainer>{la.no_casts}</CastContainer>
    } 

    return (
        <CastContainer>
            <Swiper style={{width: '100%'}} breakpoints={breakpoints} navigation>
            {casts && casts.cast.map((cast, i) => 
                <SwiperSlide key={i}>
                    <CastCard data-thememode={theme}>
                        {cast.profile_path ? 
                        <CastImg src={`${IMG_URL}${cast.profile_path}`} /> :
                        <CastImg src={dogeza} />
                        }
                        <CastName>
                            <p style={{width: '100%', textAlign: "center"}}>{cast.name}</p>
                            <p style={{width: '100%', textAlign: "center"}}>{cast.character}</p>
                        </CastName>
                    </CastCard>  
                </SwiperSlide>
            )}
            </Swiper>
        </CastContainer>
    );
}

export default React.memo(Cast);