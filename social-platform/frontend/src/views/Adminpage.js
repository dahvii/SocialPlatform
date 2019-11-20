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
            if(!state.currentUser.admin){
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

    async function removeForumReport(id, index) {
        await fetch('/api/deleteForumReport/' + id, { method: 'PUT' });
        let copyOfList = [...forumPosts];
        copyOfList.splice(index, 1);
        setForumPosts(copyOfList);
    }

    async function removeForumPost(id, index) {
        await fetch('/api/deleteforumpost/' + id, { method: 'DELETE' });
        await fetch('/api/deleteForumReport/' + id, { method: 'PUT' });
        let copyOfList = [...forumPosts];
        copyOfList.splice(index, 1);
        setForumPosts(copyOfList);
    }

    function goToProfile(id){
        props.history.push(`/profile/${id}`);
    }

    function goToFeedPost(id){
        props.history.push(`/feed-post/${id}`);
    }

    async function removeUserReport(id, index) {
        await fetch('/api/deleteUserReport/' + id, { method: 'PUT' });
        let copyOfList = [...users];
        copyOfList.splice(index, 1);
        setUsers(copyOfList);
    }

    async function removeUser(id, index) {
        await fetch('/api/deleteUser/' + id, { method: 'DELETE' });
        await fetch('/api/deleteUserReport/' + id, { method: 'PUT' });
        let copyOfList = [...users];
        copyOfList.splice(index, 1);
        setUsers(copyOfList);
    }

    async function removeCommentReport(id, index) {
        console.log("ta bort rapporteringen för ", id);
        
        // await fetch('/api/deleteUserReport/' + id, { method: 'PUT' });
        // let copyOfList = [...users];
        // copyOfList.splice(index, 1);
        // setUsers(copyOfList);
    }

    async function removeComment(id, index) {
        console.log("ta bort kommentaren ", id);

        // await fetch('/api/deleteUser/' + id, { method: 'DELETE' });
        // await fetch('/api/deleteUserReport/' + id, { method: 'PUT' });
        // let copyOfList = [...users];
        // copyOfList.splice(index, 1);
        // setUsers(copyOfList);
    }

    function goToPost(id) {
        props.history.push(`/profile/${id}`);
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
                        users.map((user, index) => {
                            return <Card key={index} >
                                <Card.Body>
                                    <Card.Title>Anmäld användare </Card.Title>
                                    <Card.Text>
                                        Namn: {user.firstName} {user.lastName} <br />
                                        id: {user._id}
                                        <Button variant="primary" onClick={e => goToProfile(user._id)}>Gå till användare</Button>
                                    </Card.Text>
                                    <Button variant="primary" onClick={e => removeUser(user._id, index)}>Ta bort användaren</Button>
                                    <Button variant="primary" onClick={e => removeUserReport(user._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tabId="2">
                {feedPosts &&
                        feedPosts.map((feedPost, index) => {
                            return <Card key={index} >
                                <Card.Body>
                                    <Card.Title>Anmäld FeedPost </Card.Title>
                                    <Card.Text>
                                        text: {feedPost.text} <br/>
                                        id: {feedPost._id}
                                        <Button variant="primary" onClick={e => goToFeedPost(feedPost._id)}>Gå till Komentaren</Button>
                                    </Card.Text>
                                    <Button variant="primary" onClick={e => removeUser(feedPost._id, index)}>Ta bort användaren</Button>
                                    <Button variant="primary" onClick={e => removeUserReport(feedPost._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tabId="3">
                    {forumPosts &&
                        forumPosts.map((post, index) => {
                            return <Card key={index}>
                                <Card.Body>
                                    <Card.Title>Anmält foruminlägg </Card.Title>
                                    <FormPost key={index} post={post} history={props.history} admin={'admin'} />
                                    <Button variant="primary" onClick={e => removeForumPost(post._id, index)}>Ta bort inlägget</Button>
                                    <Button variant="primary" onClick={e => removeForumReport(post._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tabId="4">
                    {comments &&
                        comments.map((comment, index) => {
                            return <Card key={index}>
                                <Card.Body>
                                    <Card.Title>Anmäld kommentar</Card.Title>
                                    <Card.Text>
                                        Kommentar: {comment.text}
                                    </Card.Text>
                                    <Button variant="primary" onClick={e => removeComment(comment._id, index)}>Ta bort kommentaren</Button>
                                    <Button variant="primary" onClick={e => removeCommentReport(comment._id, index)}>Ta bort anmälningen</Button>
                                </Card.Body>
                            </Card>
                        })
                    }
                </TabPane>
            </TabContent>


        </>

    )
}