import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';

const Container = styled.div`
    width: 80vw;
    height: 100%;
    flex-direction: column;
    margin: 0 auto;
`;

const ResultBox = styled.div`
    ${flexAlign};
    width: 100%;
    height: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #dddddd;
`;

const CountText = styled.p`
    font-size: 1.3em;
    margin: 0;
`;

const SearchResults = ({results}) => {
    console.log(results);

    return (
        <Container>
            {results ? 
            <>
            <CountText>
                검색 결과가 {results.length}개 있습니다!
            </CountText>
            {results.map((ani, i) => 
            <ResultBox>

            </ResultBox> )} 
            </> : 
            <>
            </> }
        </Container>
    )
}

export default SearchResults;