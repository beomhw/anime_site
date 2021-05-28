import React from 'react';
import styled from 'styled-components';
import {IMG_URL} from '../../Util';
import dogeza from '../../asset/dogeza_search.png';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';
import {Link} from 'react-router-dom';

const ResultBox = styled.div`
    background-color: ${p=>p['data-thememode'].container};
    width: 60vw;
    height: 150px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: flex-start;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 80vw;
    }
`;

const PosterImg = styled.div`
    background-image: url(${p=>p.url});
    background-size: cover;
    background-position: center;
    width: 100px;
    max-height: 200px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const DescriptionBox = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(60vw - 100px);
    height: 100%;
    padding: 15px;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: calc(80vw - 100px);
    }
`;

const MediaTypeBox = styled.div`
    width: 50px;
    height: 20px;
    border-radius: 5px;
    background-color: #8c0000;
    color: white;
    font-size: 0.8em;
    position: relative;
    left: -10px;
    top: -10px;
    ${flexAlign};
`;

const AniTitle = styled.div`
    flex: 1;
    font-size: 1.3em;
    @media (max-width: ${p=>p.theme.mobile}) {
        font-size: 1.1em;
    }
`;

const LinkS = styled(Link)`
    color: ${p=>p['data-thememode'].text};
`;

const OverviewBox = styled.div`
    padding: 10px;
    
`;

const SearchResult = ({ani}) => {
    const theme = useTheme();

    const description = ani.overview.slice(0, 40) + '...';
    
    return (
        <ResultBox data-thememode={theme}>
            {ani.poster_path ? /* 애니 이미지 */
            <PosterImg url={`${IMG_URL}${ani.poster_path}`} ><MediaTypeBox>{ani.media_type}</MediaTypeBox></PosterImg> :
            <PosterImg url={dogeza}><MediaTypeBox>{ani.media_type}</MediaTypeBox></PosterImg>
            }
            <DescriptionBox>
                <AniTitle> {/* 애니 제목 */}
                    <LinkS data-thememode={theme} to={`/anime_site/detail/${ani.id}/${ani.media_type}`} >
                        {ani.media_type === 'movie' ? ani.title : ani.name}
                    </LinkS>
                </AniTitle>
                <OverviewBox>{description}</OverviewBox>
            </DescriptionBox>
        </ResultBox>
    );
}

export default React.memo(SearchResult);