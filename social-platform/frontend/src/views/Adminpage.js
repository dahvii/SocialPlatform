import React, { useEffect, useState } from 'react'
import useLifeCycle from '../utilities/useLifeCycle';
import 'moment/locale/sv'
import FormPost from '../components/FormPost';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import FormComment from '../components/ForumComments';
import FeedPost from '../components/FeedPost'
export default function Forum(props) {
    const [activeTab, setActiveTab] = useState('1');

    const [forumPosts, setForumPosts] = useState();
    const [comments, setComments] = useState();
    const [feedPosts, setFeedPosts] = useState();
    const [users, setUsers] = useState();

    useLifeCycle({
        mount: () => {
            getReports();
        }
    })

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const getReports = async () => {
        let data = await fetch('/api/reported');
        let result = await data.json();
        console.log("result ",result);
        if (result[0]) {
            setForumPosts(result[0].forumPosts);
            setFeedPosts(result[0].feedPosts);
            setComments(result[0].comments);
            setUsers(result[0].persons)
        }
    }

    function displayForumPosts() {
        if(forumPosts){
            return forumPosts.map((post, index) => {
                return <FormPost key={index} post={post} history={props.history} admin={'admin'} />
            })
        }
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
                    users
                    {

                    }
                </TabPane>
                <TabPane tabId="2">

                </TabPane>
                <TabPane tabId="3">
                    {displayForumPosts()}
                </TabPane>
                <TabPane tabId="4">
                    {/*haveLocktForComment ?
                        comment.map(obj => obj.comments.map((comment, index) => <FormComment key={index} comment={comment} post={post} history={props.history} admin={'admin'} />))
                        : ''
                */}
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