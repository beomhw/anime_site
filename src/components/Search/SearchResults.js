import React,{useState} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {BsCaretDownFill} from 'react-icons/bs';
import SearchResult from './SearchResult';

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
    background-color: #8c0000;
    color: white;
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
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    

    const onMore = () => {
        setLoading(true);
        setCount(count + 1);
        setTimeout(setLoading(false), 1500);
    }

    return (
        <Container>
            {results ? 
            <>
                <CountText>
                    검색 결과가 {results.length}개 있습니다!
                </CountText>
                {results.map((ani, i) => 
                    <SearchResult ani={ani} key={i} />
                )}
                <ViewmoreBox theme={theme}>
                    <ViewmoreButton onClick={() => onMore()} theme={theme}>
                        {loading ? <></> : <BsCaretDownFill />}
                    </ViewmoreButton>
                </ViewmoreBox> 
            </> : 
            <>
            </> }
        </Container>
    )
}

export default SearchResults;