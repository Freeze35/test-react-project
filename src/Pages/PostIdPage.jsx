import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params=useParams()
    const [post,setPost] = useState({})
    const [com,setCom] = useState([])

    const[fetchPostById, isLoading, error] = useFetching(async (id)=>{
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const[fetchComents, isComLoading, comError] = useFetching(async (id)=>{
        const response = await PostService.getComByPostId(id)
        setCom(response.data)
    })

    useEffect(()=>{
     fetchPostById(params.id)
     fetchComents(params.id)
    },[])


    return (
        <div>
            <h1 className={'post__btns'}>Post Page = {params.id}</h1>
            {isLoading
                ?<Loader/>
                : <div>{post.id}. {post.title}</div>

            }
            <h1 style={{marginTop: 15}}>
                Комментарии:
            </h1>
            {isComLoading
                ?<Loader/>
                : <div>{
                    com.map(com=>
                        <div style={{marginTop: 15}}>
                            <h5>{com.email}</h5>
                            <div>{com.body}</div>
                        </div>
                    )
                }</div>

            }
        </div>
    );
};

export default PostIdPage;