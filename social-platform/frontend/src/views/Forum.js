import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddForumPost from '../components/AddFormPost';
import FormFilter from '../components/FormFilter';
import FormPost from '../components/FormPost';
export default function Forum() {
    
      const [newForumPost,setNewForumPost] = useState(false);
      const [forumSearch,setForumSearch] = useState(false);
      const showNewPost = ()=>{
        setNewForumPost(!newForumPost);
     }

    const showFormSearch = ()=>{
        setForumSearch(!forumSearch)
    }
    return (
        <>
        <Button variant="primary" onClick={()=>  showNewPost() } >Skapa nytt Inlägg</Button>
        <Button variant="primary" onClick={()=>  showFormSearch() } >Sök / Filter</Button>    
            {newForumPost === true ? <AddForumPost />  : '' }
            {forumSearch === true ? <FormFilter />  : '' }    
        <FormPost />
            </>
    )
}
