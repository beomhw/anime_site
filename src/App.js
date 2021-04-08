// 전체 컴포넌트 종합 => 라우트 컴포넌트
import React from 'react';
import Navigation from './Navigation';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const App = () => {

    return (
        <Container>
            <Navigation />
        </Container>
    );
}

export default App;