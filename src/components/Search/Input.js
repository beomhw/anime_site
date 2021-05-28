import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {BsSearch} from 'react-icons/bs';
import * as api from '../../api';

const SearchContainer = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100px;
`;

const SearchInput = styled.input`
    width: 80vw;
    height: 80px;
    font-size: 2.2em;
    padding: 20px;
    background-color: ${p=>p['data-thememode'].background};
    color: ${p=>p['data-thememode'].text};
    box-shadow: none;
    border: 0;
    border-bottom: 1px solid #dddddd;
    &:focus {
        outline: none;
    }
    transition-duration: 0.2s;
`;

const SearchButton = styled.div`
    width: 50px;
    height: 80px;
    border-bottom: 1px solid #dddddd;
    color: ${p=>p['data-thememode'].text};
    ${flexAlign};
    font-size: 2.2em;
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
`;

const Input = ({setPages, setLoading, input, setInput, setSearchResults, la}) => {
    const theme = useTheme();

    useEffect(() => {
        onSearch(input);
    }, [la]);
    
    const onChange = useCallback(e => setInput(e.target.value), []);

    const onSearch = useCallback(query => {
        let check = query.trim();
        if(check.length === 0) return 0;

        setLoading(true);
        api.searchAnime(query, la, 1).then(res => {
            setSearchResults(res.data.results.filter(re => re.media_type !== 'person' && re.genre_ids.includes(16)));
            setPages(res.data.total_pages);
            setLoading(false);
        })
    }, []);

    return (
        <SearchContainer>
                <SearchInput autoComplete="off" onChange={e => onChange(e)} value={input} name="query" placeholder="Search" data-thememode={theme} />
                <SearchButton onClick={() => onSearch(input)} data-thememode={theme}><BsSearch/></SearchButton>
        </SearchContainer>
    );
}

export default React.memo(Input);