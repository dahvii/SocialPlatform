import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AddForumPost from '../components/AddFormPost';
import FormPost from '../components/FormPost';
import '../css/Forum.css'

export default function Forum() {
    
      const [newForumPost,setNewForumPost] = useState(false);
      //const [forumSearch,setForumSearch] = useState(false);
      const [post, setPost] = useState([]);
      //const [loading, setLoading] = useState(true);
      const [haveLocktFordata, setHaveLocktFordata] = useState(false);

     
      const getAllForumPost = async() =>{
        setHaveLocktFordata(true)
        //setLoading(false)
        const data = await fetch('/api/forum');
        const result = await data.json();
        setPost(result);
    }

      const showNewPost = (result)=>{
        if(result.newPost){
          let newPosts = post
          newPosts.unshift(result.newPost)
          console.log(newPosts)
          setPost(newPosts)
          console.log(result.newPost)
        }
        console.log(result)
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
        <div className="add-filter-btn">
        <Button className="costumBtn" onClick={showNewPost} >Skapa nytt Inlägg</Button>
            {newForumPost === true ? <AddForumPost showNewPost = {showNewPost}/>  : '' }
              
            </div>
            {post.map((post, index) => <FormPost key ={index} post={post}/>)}
           
            </>
    )
}