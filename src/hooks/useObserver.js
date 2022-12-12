import {useEffect, useRef} from "react";

export const useObserver = (ref,canLoading,isLoading,callback) =>{
    const observer = useRef()
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        console.log(observer.current)
        var cb = function(entries) {
            if (entries[0].isIntersecting && canLoading) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}