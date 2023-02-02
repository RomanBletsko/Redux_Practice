import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../../features/posts/postsSlice";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from "../../Loader";
import Post from "./Post";


const Posts = () => {
  const { posts,status,page,totalPages,loader } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({page:page}));  
    }
  }, [status, dispatch]);


const handleFunc = (obj, page)=>{
  dispatch(fetchPosts({page:page}))
}
  return (<div>
    {loader ? (
    <Loader />
    ):(
    <ListStyled>
    {posts.map((element)=>{
      return(
        <Post key={element.id + element.name} 
        name={element.name} 
        color={element.color}
        year={element.year}
        />
      )
    }) }
  </ListStyled>)}
  <PaginationHolder>
    <Stack spacing={2}>
      <Pagination count={totalPages} 
      variant="outlined" 
      shape="rounded" 
      onChange={handleFunc}
      />
    </Stack>
  </PaginationHolder>
  
  </div>);
};

const ListStyled = styled.ul({
  listStyle: "none",
  padding: 0,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
})
const PaginationHolder = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "5px",
})

export default Posts;
