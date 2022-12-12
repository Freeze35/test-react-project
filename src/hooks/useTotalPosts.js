import {useMemo} from "react";

export const useTotalPosts = (totalPages,pagesArray) =>{
    /*сортировка списка*/
    return useMemo(() => {
        for (let i = 0; i < totalPages; i++) {
            pagesArray.push(i+1);
        }
        return pagesArray
    }, [totalPages])
}