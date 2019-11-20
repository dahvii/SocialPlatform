import React, { useEffect, useState } from 'react'
import useLifeCycle from '../utilities/useLifeCycle';
import 'moment/locale/sv'
import FormPost from '../components/FormPost';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import FormComment from '../components/ForumComments';
import FeedPost from '../components/FeedPost'
import { Store } from '../utilities/Store'
import { Card, Button } from 'react-bootstrap'
import SwipePreview from '../components/SwipePreview';


export default function Forum(props) {
    const [activeTab, setActiveTab] = useState('1');
    const [forumPosts, setForumPosts] = useState();
    const [comments, setComments] = useState();
    const [feedPosts, setFeedPosts] = useState();
    const [users, setUsers] = useState();
    const { state } = React.useContext(Store);
    useLifeCycle({
        mount: () => {
            if(!state.currentUser.isAdmin){
                props.history.push("/")
            }
            getReports();

        }
    })

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const getReports = async () => {
        let data = await fetch('/api/reported');
        let result = await data.json();
        console.log("result ", result);
        if (result[0]) {
            setForumPosts(result[0].forumPosts);
            setFeedPosts(result[0].feedPosts);
            setComments(result[0].comments);
            setUsers(result[0].persons)
        }
    }

    async function removeReport(id, index) {
        await fetch('/api/deleteReport/' + id, { method: 'PUT' });
        let copyOfList = [...forumPosts];
        copyOfList.splice(index, 1);
        setForumPosts(copyOfList);
    }

    async function removeForumPost(id, index) {
        await fetch('/api/deleteforumpost/' + id, { method: 'DELETE' });
        await fetch('/api/deleteReport/' + id, { method: 'PUT' });
        let copyOfList = [...forumPosts];
        copyOfList.splice(index, 1);
        setForumPosts(copyOfList);
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
                {users &&
                        users.map((post, index) => {
                            return <Card key={index} >
                                <Card.Body>
                                    <Card.Title>Anmäld användare </Card.Title>
                                    <Card.Text></Card.Text>
                                    <Button variant="primary" onClick={e => removeForumPost(post._id, index)}>Ta bort inlägget</Button>
                                    <Button variant="primary" onClick={e => removeReport(post._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tabId="2">

                </TabPane>
                <TabPane tabId="3">
                    {forumPosts &&
                        forumPosts.map((post, index) => {
                            return <Card  key={index}>
                                <Card.Body>
                                    <Card.Title>Anmält foruminlägg </Card.Title>
                                    <FormPost key={index} post={post} history={props.history} admin={'admin'} />
                                    <Button variant="primary" onClick={e => removeForumPost(post._id, index)}>Ta bort inlägget</Button>
                                    <Button variant="primary" onClick={e => removeReport(post._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
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