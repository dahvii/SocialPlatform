import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import '../css/Feed.css'
import FeedPost from '../components/FeedPost'
import InfiniteScroll from 'react-infinite-scroller';

export default function Feed(props) {
    const [displayImage, setDisplayImage] = useState("/Users/ericrasmusson/Public/SocialPlatform/social-platform/backend/uploads/resized/e5f0d5c3-9ef4-45c1-8afe-135a98186c39");
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [innitLoading, setInnitLoading] = useState(false);

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

    return (
        <div>
            <p>Feed view</p>
            <InfiniteScroll
                className="feed-div"
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {
                    posts.map(post => <FeedPost className="feed-post-one-post" key={post._id} post={post} />)
                }
            </InfiniteScroll>
            <Image src={displayImage}></Image>
            <Button className="add-feed-button" variant="light" onClick={addPost}>
                <i className="fas fa-plus plus-icon"></i>
            </Button>
        </div>
    )
}
