import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import YoutubeIcon from '../../asset/youtube.png';

const Icon = styled.div`
    width: 60px;
    height: 100%;
    cursor: pointer;
    background-image: url(${p=>p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Teaser = ({teaser}) => {
    
    return (
        <Icon url={YoutubeIcon} />
    );
}

export default Teaser;