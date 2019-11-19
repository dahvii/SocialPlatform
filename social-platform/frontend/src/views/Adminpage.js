import React, { useEffect, useState } from 'react'
import 'moment/locale/sv'
import FormPost from '../components/FormPost';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import FormComment from '../components/ForumComments';
import FeedPost from '../components/FeedPost'
export default function Forum(props) {
    const [activeTab, setActiveTab] = useState('1');

    const [post, setPost] = useState();
    const [comment, setComment] = useState();
    const [feedpost, setFeedPost] = useState();
    const [haveLocktForUser, setHaveLocktForUser] = useState(false);
    const [haveLocktForFeedPost, setHaveLocktForFeedPost] = useState(false);
    const [haveLocktForForumPost, setHaveLocktForForumPost] = useState(false);
    const [haveLocktForComment, setHaveLocktForComment] = useState(false);
    
    
    useEffect(() => {
        /*
        if (!haveLocktForFeedPost) {
            getReportedFeedPost();
        }
        */
        if (!haveLocktForForumPost) {
            getReportedPost();
        }
        
        if (!haveLocktForComment) {
            getReportedComment();
        }
        
    })

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
      }
      /*
      const getReportedFeedPost = async () => {
        const data = await fetch('/api/reportedfeedpost');
        const result = await data.json();
        setFeedPost(result);
        setHaveLocktForFeedPost(true);
    }
    */
    const getReportedPost = async () => {
        const data = await fetch('/api/reportedpost');
        const result = await data.json();
        setPost(result);
        setHaveLocktForForumPost(true);
    }
    
    const getReportedComment = async () => {
        const data = await fetch('/api/reportedcomment');
        const result = await data.json();
        setComment(result);
        setHaveLocktForComment(true);
    }
    
    return (
        <>
            <h1>Admin page</h1>
            <Nav tabs>
                <NavItem className="forum-tab">
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >Users</NavLink>
                </NavItem>
                <NavItem className="forum-tab">
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >Feedposts</NavLink>
                </NavItem>
                <NavItem className="forum-tab">
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >Forumposts</NavLink>
                </NavItem>
                <NavItem className="forum-tab">
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >Komentarer</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">

                </TabPane>
                <TabPane tabId="2">
                
                </TabPane>
                <TabPane tabId="3">
                {haveLocktForForumPost ?
                        post.map(obj => obj.forumPosts.map((post, index) =><FormPost key={index} post={post} history={props.history} admin={'admin'} />))
                        : ''
                    }
                </TabPane>
                <TabPane tabId="4">
                {haveLocktForComment ?
                        comment.map(obj => obj.comments.map((comment, index) => <FormComment key={index} comment={comment} post={post} history={props.history} admin={'admin'} />))
                        : ''
                    }
                </TabPane>
            </TabContent>


        </>

    )
}
/*
               {haveLocktForFeedPost ?
                console.log(feedpost)
                
                        //feedpost.map(obj => obj.feedpost.map(post => <FeedPost key={post._id} post={post} history={props.history} admin={'admin'} />))
                        : ''
                    }


*/