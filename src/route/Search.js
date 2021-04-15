// 장르별 검색 구현 예정

import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as Comp from '../components/Search/export';
import {flexAlign} from '../css/cssModule';
import Loading from '../components/Loading';
import {useLanguage} from '../LanguageContext';

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 40px;
`;

const LoadingContainer = styled.div`
    ${flexAlign};
    height: 100px;
`;

const Search = () => {
    const la = useLanguage();
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    },[searchResults])

    console.log(searchResults);

    return (
        <Container>
            <Comp.Input la={la.type} setLoading={setLoading} setSearchResults={setSearchResults} input={input} setInput={setInput}/>
            {loading ?
            <LoadingContainer><Loading /></LoadingContainer> :
            <Comp.SearchResults results={searchResults} /> }
        </Container>
    );
};

export default Search;