import {useState} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../css/cssModule';
import * as Comp from '../components/Seasons/export';

const Container = styled.div`
    ${flexAlign};
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 40px;
`;


const Seasons = () => {
    const [list, setList] = useState([]);

    return (
        <Container>
            <Comp.SeasonMenu setList={setList} list={list}/>
            <Comp.SeasonList list={list} />
        </Container>
    );
};

export default Seasons;