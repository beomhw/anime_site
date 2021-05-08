import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {BsCaretDownFill} from 'react-icons/bs';
import SearchResult from './SearchResult';
import {useLanguage} from '../../LanguageContext';
import * as api from '../../api';

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

const SearchResults = ({length, setSearchResults, results, pages, input}) => {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const la = useLanguage();
    

    const onMore = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        if(count > 1) {
            api.searchAnime(input, la.type, count).then(res => {
                let data = res.data.results.filter(ani => ani.media_type !== 'person' && ani.genre_ids.includes(16))
                console.log(data);
                setSearchResults(se => se.concat(data));
            })
        }
    },[count]);

    return (
        <Container>
            {results ? 
            <>
                <CountText>
                    {la.Search.search_result_front}{results.length} {la.Search.search_result_back}
                </CountText>
                {loading ? <></> :
                results.map((ani, i) => 
                    <SearchResult ani={ani} key={i} />
                )
                }
                {count === pages ? <></> : 
                <ViewmoreBox theme={theme}>
                    <ViewmoreButton onClick={() => onMore()} theme={theme}>
                        {loading ? <></> : <BsCaretDownFill />}
                    </ViewmoreButton>
                </ViewmoreBox> 
                }
            </> : 
            <>
            </> }
        </Container>
    )
}

export default SearchResults;