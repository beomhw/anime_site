import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';

const Container = styled.div`
    ${flexAlign};
    width: 80vw;
    height: 200px;
    margin-top: 50px;
`;

const SelectYearBox = styled.div`
    ${flexAlign};
    flex: 4;
    height: 100%;
    border: 1px solid #dddddd;
`;

const SelectSeasonBox = styled.div`
    ${flexAlign};
    height: 100%;
    flex: 4;
    border: 1px solid #dddddd;
`;

const ViewButtonBox = styled.div`
    ${flexAlign};
    height: 100%;
    flex: 1;
    border: 1px solid #dddddd;
`;


const SeasonMenu = () => {
    return (
        <Container>
            <SelectYearBox>
                
            </SelectYearBox>
            <SelectSeasonBox>

            </SelectSeasonBox>
            <ViewButtonBox>

            </ViewButtonBox>
        </Container>
    );
}

export default SeasonMenu;