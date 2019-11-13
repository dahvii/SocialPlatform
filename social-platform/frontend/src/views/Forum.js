import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AddForumPost from '../components/AddFormPost';
import FormPost from '../components/FormPost';
import '../css/Forum.css'

export default function Forum() {
    
      const [newForumPost,setNewForumPost] = useState(false);
      const [post, setPost] = useState([]);
      const [haveLocktFordata, setHaveLocktFordata] = useState(false);

     
      const getAllForumPost = async() =>{
        setHaveLocktFordata(true)
        const data = await fetch('/api/forum');
        const result = await data.json();
        setPost(result);
    }

      const showNewPost = (result)=>{
        if(result.newPost){
          let newPosts = post
          newPosts.unshift(result.newPost)
          setPost(newPosts)
        }
        setNewForumPost(!newForumPost);
        
     }

     // sprint två ta ej bort
     /*
    const showFormSearch = ()=>{
        setForumSearch(!forumSearch)
    }
  */
    useEffect(() => {
        if(!haveLocktFordata){
          getAllForumPost();
          }
      }) 

      //sprint 2
      //<Button className="costumBtn" onClick={()=>  showFormSearch() } >Sotering</Button>
      //{forumSearch === true ? <FormFilter />  : '' }  
    return (
        <>
            {newForumPost === true ? <AddForumPost showNewPost = {showNewPost}/>  : '' }
            {post.map((post, index) => <FormPost key ={index} post={post}/>)}
            <Button className="add-forum-buton" variant="light" onClick={showNewPost}>
               {!newForumPost ? <i className="fas fa-plus forum-button-icon"></i>:<i className="fas fa-minus forum-button-icon"></i>}
            </Button>
            </>
    )
}