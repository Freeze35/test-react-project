import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/page";
import MyButton from "../components/UI/button/MyButton";
import MyModule from "../components/UI/MyModule/MyModule";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/UI/PostList";
import Loader from "../components/UI/Loader/Loader";
import Paginatin from "../components/UI/Paginatin";
import {useFetching} from "../hooks/useFetching";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";



function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts,...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useObserver(lastElement,page<totalPages,isPostsLoading,()=>{
        setPage(page+1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page,limit])



    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (

        <div className='App'>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModule visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModule>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Подгрузка элементов"
                options={[
                        {value: 5, name:'5'},
                        {value: 10, name:'10'},
                        {value: 25, name:'25'},
                        {value: -1, name:'All'}
                    ]}
            ></MySelect>
            <hr style={{margin: "15px 0"}}/>
            {/*Проверка условия на наличие в поиске поста.*/
                postError && <h1>Ошибка ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты"/>
            <div ref={lastElement} style={{height:20}}/>
            {isPostsLoading &&
                 <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
            }
            <Paginatin
                changePage={changePage}
                page={page}
                totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
