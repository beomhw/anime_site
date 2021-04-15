import React from 'react';
import styled from 'styled-components';
import SeasonItem from './SeasonItem';

const Container = styled.div`
    width: 80vw;
    height: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

const SeasonList = ({list}) => {
    console.log(list);
    return (
        <Container>
            {list.map((li,i) => <SeasonItem item={li} key={i}/>)}
        </Container>
    );
}

export default SeasonList;