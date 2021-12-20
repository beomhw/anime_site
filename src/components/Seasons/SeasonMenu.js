import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import * as api from '../../api';
import {useLanguage} from '../../LanguageContext';

const Container = styled.div`
    ${flexAlign};
    width: 80vw;
    margin-top: 50px;
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

const ViewButtonBox = styled.div`
    ${flexAlign};
    height: 100%;
`;

const Button = styled.button`
    background: 0;
    border-radius: 10px;
    background-color: ${p=>p['data-thememode'].container};
    cursor: pointer;
    color: ${p=>p['data-thememode'].text};
    font-weight: bold;
    height: 40px;
    border: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        color: #ac0d0d;
    }
    width: 60px;
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
    const year = 2022;
    const [season, setSeason] = useState({year: '2022', season: 'spring'});
    const la = useLanguage();

    useEffect(() => {
        onView();
    },[la.type]);

    const onView = useCallback(() => {
        setList([]);
        //console.log(season);
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
                lte = year + '-06-31';
                break;
            case 'autumn':
                gte = year + '-07-01';
                lte = year + '-09-31';
                break;
            case 'winter':
                gte = year + '-10-01';
                lte = year + '-12-31';
                break;
            default:
                throw new Error('unknown season!');
        }
        api.getSeason(gte, lte, 1, la.type).then(res => {
            //console.log(res);
            setList(li => li.concat(res.results));
            if(res.total_pages === 2) {
                api.getSeason(gte, lte, 2, la.type).then(res => {
                    //console.log(res);
                    setList(li => li.concat(res.results));
                    //console.log(list);
                })
            }
        });
    }, [la.type, season]);

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
            <ViewButtonBox>
                <Button data-thememode={theme} onClick={onView}>{la.Season.select}</Button>
            </ViewButtonBox>
        </Container>
    );
}

export default React.memo(SeasonMenu);