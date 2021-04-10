import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {IMG_URL} from '../../Util';
import dogeza from '../../asset/dogeza_search.png';
import {BsCaretDownFill} from 'react-icons/bs';

const Container = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const CountText = styled.p`
    font-size: 1.3em;
    margin: 0;
    margin-bottom: 20px;
`;

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

const ViewmoreBox = styled.div`
    width: 60vw;
    height: 50px;
    background-color: ${p=>p.theme.container};
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    border-radius: 10px;
    ${flexAlign};
`;

const ViewmoreButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${p=>p.theme.background};
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    margin-top: 15px;
    cursor: pointer;
    font-size: 1.7em;
    padding-top: 5px;
    ${flexAlign};
    
`;

// 더보기 구현 flow
// 1. 클릭 시 쿼리는 같게, page + 1로 api 검색 
// if 결과에서 애니메이션 장르가 있을 경우 => 기존 state에 concat
// if 결과에서 없을 경우 => 더 이상 없다는 메시지 출력

const SearchResults = ({results}) => {
    const theme = useTheme();
    console.log(results);

    return (
        <Container>
            {results ? 
            <>
                <CountText>
                    검색 결과가 {results.length}개 있습니다!
                </CountText>
                {results.map((ani, i) => 
                    <ResultBox theme={theme} key={i}>
                        {ani.poster_path ? 
                        <PosterImg url={`${IMG_URL}${ani.poster_path}`} /> :
                        <PosterImg url={dogeza} />
                        }
                        <DescriptionBox>
                        {ani.media_type === 'movie' ? ani.title : ani.name}
                        </DescriptionBox>
                    </ResultBox>
                )}
                <ViewmoreBox theme={theme}>
                    <ViewmoreButton theme={theme}>
                        <BsCaretDownFill />
                    </ViewmoreButton>
                </ViewmoreBox> 
            </> : 
            <>
            </> }
        </Container>
    )
}

export default SearchResults;