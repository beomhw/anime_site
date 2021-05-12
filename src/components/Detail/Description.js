import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import ghost from '../../asset/ghost.png';
import ApngComponent from 'react-apng';

const DescriptionContainer = styled.div`
    max-width: 80vw;
    height: 100%;
    display: flex;
    ${flexAlign};
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: ${p=>p.theme.container};
    padding: 20px;
    line-height: 30px;
`;

const GhostBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex: 4;
`;

const TextBox = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
`;

const Text = styled.p`
    font-size: 1.4em;
    margin: 0;
`;

const Description = ({la, overview}) => {
    const theme = useTheme();

    if(overview.length === 0) {
        return (
            <DescriptionContainer style={{width: '80vw'}}>
                <GhostBox>
                    <ApngComponent autoPlay={true} src={ghost} />
                </GhostBox>
                <TextBox>
                    <Text>{la.Detail.null_intro}</Text>
                </TextBox>
            </DescriptionContainer>
        );
    }

    return (
        <DescriptionContainer theme={theme}>
            {overview}
        </DescriptionContainer>
    );
}

export default Description;