import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../css/Feed.css'
import FeedPost from '../components/FeedPost'
import InfiniteScroll from 'react-infinite-scroller';
import TRIModal from '../components/TRIModal';

export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);

    
    useEffect(() => {
        if(props.location && props.location.state && props.location.state.emptyProps){
            setShowModal(true);
        }
    }, [props]);

    function addPost() {
        props.history.push('/new-feed-post')
    }

    async function loadMore() {
        let result = await fetch(`/api/feed-posts/${skip}`);
        result = await result.json();
        if (result.error) {
            setHasMore(false)
        } else if (result.success) {
            if (posts.length <= 0) {
                setPosts(result.result)
            } else if (posts.length > 0) {
                setPosts([...posts, ...result.result]);
            }
            let amountToSkip = skip
            setSkip(amountToSkip + 3)
        }
    }

    const modalCallback = (redirect) => {
        if(redirect){
            props.history.push('/edit-profile');
        }
        setShowModal(false);
    }

    return (
        <div>
            <TRIModal matchModal={false} show= {showModal} callback= {modalCallback}></TRIModal>

            <InfiniteScroll
                className="feed-div"
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {
                    posts.map(post => <FeedPost className="feed-post-one-post" key={post._id} post={post} history={props.history} />)
                }
            </InfiniteScroll>
            <Button className="add-feed-button" variant="light" onClick={addPost}>
                <i className="fas fa-plus plus-icon"></i>
            </Button>
        </div>
    )
}
