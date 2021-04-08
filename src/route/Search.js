import React from 'react';
import styled from 'styled-components';
import Input from '../components/Search/Input';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;



const Search = () => {

    return (
        <Container>
            <Input/>
        </Container>
    );
};

export default Search;