import React,{useState} from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import * as api from '../../api';

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

const Select = styled.select`
    width: 200px;
    height: 30px;
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

    const onView = () => {
        setList([]);
        console.log(season);
        let year = season.year;
        let gte; // 지정된 값보다 큰 경우
        let lte; // 지정된 값보다 작을 경우
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
        api.getSeason(gte, lte, 1).then(res => {
            console.log(res);
            setList(li => li.concat(res.results));
            if(res.total_pages === 2) {
                api.getSeason(gte, lte, 2).then(res => {
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
                    <option value="spring">spring</option>
                    <option value="summer">summer</option>
                    <option value="autumn">autumn</option>
                    <option value="winter">winter</option>
                </Select>
            </SelectSeasonBox>
            <ViewButtonBox>
                <button onClick={onView}>조회</button>
            </ViewButtonBox>
        </Container>
    );
}

export default SeasonMenu;