import React, { useState, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import AddForumPost from '../components/AddFormPost';
import FormPost from '../components/FormPost';
import '../css/Forum.css'

import { Store } from '../utilities/Store'


import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';

export default function Forum(props) {

  const [newForumPost, setNewForumPost] = useState(false);
  const [post, setPost] = useState([]);
  const [haveLocktFordata, setHaveLocktFordata] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const { state } = React.useContext(Store);

  const [follow, setFollow] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const getAllForumPost = async () => {
    setHaveLocktFordata(true)
    const data = await fetch('/api/forum');
    const result = await data.json();
    setPost(result);
  }

  const getFollowedPost = async () => {
    setHaveLocktFordata(true)
    const data = await fetch('/api/iFollow');
    const result = await data.json();
    setFollow(result);
  }


  const showNewPost = (result) => {
    if (result.newPost) {
      let newPosts = post
      newPosts.unshift(result.newPost)
      setPost(newPosts)
    }
    setNewForumPost(!newForumPost);
    scrollWin()
  }
  useEffect(() => {
    if (!haveLocktFordata) {
      getAllForumPost();
      getFollowedPost()
    }
  })
  const scrollWin = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Nav tabs>
        <NavItem className="forum-tab">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Nya forum poster
          </NavLink>
        </NavItem>
        <NavItem className="forum-tab">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Post du följer
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {newForumPost === true ? <AddForumPost showNewPost={showNewPost} /> : ''}
          {post.map((post, index) => <FormPost key={index} post={post} history={props.history} />)}
          <Button className="add-forum-buton" variant="light" onClick={showNewPost}>
            {!newForumPost ? <i className="fas fa-plus forum-button-icon"></i> : <i className="fas fa-minus forum-button-icon"></i>}
          </Button>
        </TabPane>
        <TabPane tabId="2">
          {follow.map((follow, index)=> <FormPost key={index} post={follow} history={props.history} />)}
        </TabPane>
      </TabContent>
    </>
  )
}