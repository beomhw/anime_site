import React,{useState, useEffect} from 'react';
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
    @media(max-width: 500px) {
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
    background-color: ${p=>p.theme.container};
    cursor: pointer;
    color: ${p=>p.theme.text};
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
    background-color: ${p=>p.theme.container};
    color: ${p=>p.theme.text};
    &:focus {
        outline: none;
    }
`;

const SeasonMenu = ({list, setList}) => {
    const theme = useTheme();
    const year = new Date().getFullYear();
    const [season, setSeason] = useState({year: '2021', season: 'spring'});
    const la = useLanguage();

    useEffect(() => {
        onView();
    },[la.type]);

    const onView = () => {
        setList([]);
        console.log(season);
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
            console.log(res);
            setList(li => li.concat(res.results));
            if(res.total_pages === 2) {
                api.getSeason(gte, lte, 2, la.type).then(res => {
                    console.log(res);
                    setList(li => li.concat(res.results));
                    console.log(list);
                })
            }
        });
    }

    const onChangeYear = (year) => setSeason({...season, year: year});
    const onChangeSeason = (se) => setSeason({...season, season: se});

    return (
        <Container>
            <SelectYearBox>
                <Select theme={theme} onChange={e => onChangeYear(e.target.value)}>
                    <option value={`${year}`}>{year}</option>
                    <option value={`${year-1}`}>{year-1}</option>
                    <option value={`${year-2}`}>{year-2}</option>
                    <option value={`${year-3}`}>{year-3}</option>
                    <option value={`${year-4}`}>{year-4}</option>
                    <option value={`${year-5}`}>{year-5}</option>
                    <option value={`${year-6}`}>{year-6}</option>
                    <option value={`${year-7}`}>{year-7}</option>
                    <option value={`${year-8}`}>{year-8}</option>
                    <option value={`${year-9}`}>{year-9}</option>
                </Select>
            </SelectYearBox>
            <SelectSeasonBox>
                <Select theme={theme} onChange={e => onChangeSeason(e.target.value)}>
                    <option value="spring">1분기</option>
                    <option value="summer">2분기</option>
                    <option value="autumn">3분기</option>
                    <option value="winter">4분기</option>
                </Select>
            </SelectSeasonBox>
            <ViewButtonBox>
                <Button theme={theme} onClick={onView}>조회</Button>
            </ViewButtonBox>
        </Container>
    );
}

export default SeasonMenu;