import styled from "styled-components";

const Post = ({name, year, color}) =>{
    return(
        <Wraper color={color}>
            <p>{name}</p>
            <p>{year}</p>
        </Wraper>
    )
}
const Wraper = styled.div`
height: 100px;
background: ${(props) =>  props.color };
width: 80%;
margin: 10px;
border-radius: 10px;
`

export default Post