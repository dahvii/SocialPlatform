import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AddForumPost from '../components/AddFormPost';
import FormFilter from '../components/FormFilter';
import FormPost from '../components/FormPost';
import '../css/Forum.css'
export default function Forum() {
    
      const [newForumPost,setNewForumPost] = useState(false);
      const [forumSearch,setForumSearch] = useState(false);
      const [post, setPost] = useState([]);
      const [loading, setLoading] = useState(true);
      const [haveLocktFordata, setHaveLocktFordata] = useState(false);

      const getAllForumPost = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/forum');
        const result = await data.json();
        setPost(result);
    }

      const showNewPost = ()=>{
        setNewForumPost(!newForumPost);
        getAllForumPost();
     }

    const showFormSearch = ()=>{
        setForumSearch(!forumSearch)
    }

    useEffect(() => {
        if(!haveLocktFordata){
          getAllForumPost();
          }
      }) 

    return (
        <>
        <Button className="costumBtn" onClick={()=>  showNewPost() } >Skapa nytt Inlägg</Button>
        <Button className="costumBtn" onClick={()=>  showFormSearch() } >Sotering</Button>    
            {newForumPost === true ? <AddForumPost showNewPost = {showNewPost}/>  : '' }
            {forumSearch === true ? <FormFilter />  : '' }    
            {post.map((post, index) => <FormPost key ={index} post={post}/> )}
            </>
    )
}
