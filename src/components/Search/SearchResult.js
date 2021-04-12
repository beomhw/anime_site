import styled from 'styled-components';
import {IMG_URL} from '../../Util';
import dogeza from '../../asset/dogeza_search.png';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';

const ResultBox = styled.div`
    background-color: ${p=>p.theme.container};
    width: 60vw;
    max-height: 200px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: flex-start;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const PosterImg = styled.div`
    background-image: url(${p=>p.url});
    background-size: contain;
    width: 100px;
    height: 150px;
    min-width: 50px;
    min-height: 80px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const DescriptionBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15px;
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

const SearchResult = ({ani}) => {
    const theme = useTheme();

    return (
        <ResultBox theme={theme}>
            {ani.poster_path ? 
            <PosterImg url={`${IMG_URL}${ani.poster_path}`} ><MediaTypeBox>{ani.media_type}</MediaTypeBox></PosterImg> :
            <PosterImg url={dogeza}><MediaTypeBox>{ani.media_type}</MediaTypeBox></PosterImg>
            }
            <DescriptionBox>
            {ani.media_type === 'movie' ? ani.title : ani.name}
            </DescriptionBox>
        </ResultBox>
    );
}

export default SearchResult;