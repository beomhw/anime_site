import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as Comp from '../components/Search/export';
import tokei from '../asset/tokei.png';
import ApngComponent from 'react-apng';
import {flexAlign} from '../css/cssModule';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const LoadingContainer = styled.div`
    ${flexAlign};
    height: 100px;
`;

const Search = () => {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    },[searchResults])

    console.log(searchResults);

    return (
        <Container>
            <Comp.Input setLoading={setLoading} setSearchResults={setSearchResults} input={input} setInput={setInput}/>
            {loading ?
            <LoadingContainer><ApngComponent autoPlay={true} src={tokei} /></LoadingContainer> :
            <Comp.SearchResults results={searchResults} /> }
        </Container>
    );
};

export default Search;