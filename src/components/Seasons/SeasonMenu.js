import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import * as api from '../../api';
import {useLanguage} from '../../LanguageContext';
import {NOW_DATE} from '../../Util';

const Container = styled.div`
    ${flexAlign};
    width: 80vw;
    flex-wrap: wrap;
    @media (max-width: ${p=>p.theme.mobile}) {
        flex-direction: column;
    }
`;

const SelectYearBox = styled.div`
    ${flexAlign};
    height: 100%;
    margin-right: 10px;
`;

const SelectSeasonBox = styled.div`
    ${flexAlign};
    height: 100%;
    margin-right: 10px;
`;

const Select = styled.select`
    margin-bottom: 10px;
    width: 200px;
    height: 50px;
    font-size: 1.4em;
    text-align-last: center;
    border-radius: 5px;
    border: none;
    background-color: ${p=>p['data-thememode'].container};
    color: ${p=>p['data-thememode'].text};
    &:focus {
        outline: none;
    }
`;

const SeasonMenu = ({setList}) => {
    const theme = useTheme();
    const year = NOW_DATE().getFullYear();
    const [season, setSeason] = useState({year: year, season: 'spring'});
    const la = useLanguage();

    useEffect(() => {
        onView();
    },[la.type]);

    useEffect(() => {
        onView();
    }, [season.year]);

    useEffect(() => {
        onView();
    }, [season.season]);

    const onView = useCallback(() => {
        setList([]);
        // console.log(season);
        let year = season.year;
        let gte; // 지정된 값보다 크거나 같을 경우
        let lte; // 지정된 값보다 작거나 같을 경우
        switch(season.season) {
            case 'spring':
                gte = year + '-01-01';
                lte = year + '-03-31';
                break;
            case 'summer':
                gte = year + '-04-01';
                lte = year + '-06-30';
                break;
            case 'autumn':
                gte = year + '-07-01';
                lte = year + '-09-30';
                break;
            case 'winter':
                gte = year + '-10-01';
                lte = year + '-12-31';
                break;
            default:
                throw new Error('unknown season!');
        }
        // console.log(gte, lte);
        api.getSeason(gte, lte, 1, la.type).then(res => {
            const total_pages = res.total_pages;
            let allResults = [...res.results];  // 첫 번째 페이지 결과
        
            // 나머지 페이지 결과 수집
            const promises = [];
            for (let i = 2; i <= total_pages; i++) {
                promises.push(api.getSeason(gte, lte, i, la.type).then(res => res.results));
            }
        
            // 모든 페이지 결과 처리
            Promise.all(promises).then(results => {
                // 배열을 평평하게 만들고 중복 제거
                allResults = allResults.concat(...results);
                const uniqueResults = Array.from(new Set(allResults.map(item => item.id))) // 'id'로 중복 제거
                    .map(id => allResults.find(item => item.id === id));
        
                // 최종 리스트 업데이트
                setList(uniqueResults);
            });
        });
    }, [la.type, season, setList]);

    const onChangeYear = (year) => setSeason({...season, year: year});
    const onChangeSeason = (se) => setSeason({...season, season: se});

    return (
        <Container>
            <SelectYearBox>
                <Select data-thememode={theme} onChange={e => onChangeYear(e.target.value)}>
                    {Array.apply(0, Array(20)).map((x, i) => 
                        <option key={i} value={`${year-i}`}>{year - i}</option>
                    )}
                </Select>
            </SelectYearBox>
            <SelectSeasonBox>
                <Select data-thememode={theme} onChange={e => onChangeSeason(e.target.value)}>
                    <option value="spring">{la.Season.quarter_1}</option>
                    <option value="summer">{la.Season.quarter_2}</option>
                    <option value="autumn">{la.Season.quarter_3}</option>
                    <option value="winter">{la.Season.quarter_4}</option>
                </Select>
            </SelectSeasonBox>
        </Container>
    );
}

export default React.memo(SeasonMenu);