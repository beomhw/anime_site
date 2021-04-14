// 전체 컴포넌트 종합 => 라우트 컴포넌트
import React from 'react';
import Navigation from './Navigation';
import {LanguageProvider} from './LanguageContext';

const App = () => {

    return (
        <LanguageProvider>
            <Navigation />
        </LanguageProvider>
    )
}

export default App;