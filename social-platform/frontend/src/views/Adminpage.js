import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddCommentsForm from '../components/AddCommentsToPost';
import FormComment from '../components/ForumComments';
import Button from 'react-bootstrap/Button';
import '../css/Comments.css'
import Moment from 'react-moment'
import 'moment/locale/sv'

export default function Forum(props) {
    const [post, setPost] = useState();
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);

    useEffect(() => {
        if (!haveLocktFordata) {
            getReportedPost();
        }
    })

    const getReportedPost = async () => {
        
        
        const data = await fetch('/api/reportedpost');
        const result = await data.json();
        console.log(result);
        //result.filter(post => post. console.log(post));
        
        
        setPost(result);
        setHaveLocktFordata(true)
    }

    return (
        <>
            <h1>Admin page</h1>
            {haveLocktFordata ?
                console.log(post)
                
                : ''
            }
        </>
    )
}