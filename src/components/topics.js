import styled from 'styled-components';

export default function Topics(props) {

    const StyDiv = styled.div`
        &:hover{
            font-weight: bold;
            cursor: pointer;
        }
        font-weight: ${props => props.active ? 'bold' : '' };
    `;

    return props.data && props.data.map((top,i) => {
        console.log(props.clicked === i, props.clicked, i)
        return <StyDiv
            active={parseInt(props.clicked) === i}
            key={top.name+i}
            value={top.name+'/'+props.index+'/'+i}
            onClick={props.click}>
                {top.name} - {top.stargazerCount} {props.clicked}
        </StyDiv>
    })
};