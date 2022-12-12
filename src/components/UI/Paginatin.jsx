import React from 'react';
import {useTotalPosts} from "../../hooks/useTotalPosts";

const Paginatin = ({changePage, page,totalPages}) => {
    let pagesArray=[]
    const pagesTransfer = useTotalPosts(totalPages,pagesArray)
    return (
        <div className={"page__wrapper"}>
            {pagesTransfer.map(p=>
                <span onClick={()=>changePage(p)} key={p}
                      className={page=== p ? "page page__current":"page"}>{p}</span>
            )

            }</div>
    );
};

export default Paginatin;