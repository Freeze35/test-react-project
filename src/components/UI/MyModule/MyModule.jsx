import React from 'react';
import cl from "./MyModule.module.css"
const MyModule = ({children,visible,setVisible}) => {

    const rootClasses= [cl.myModule]

    if(visible){
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={cl.myModuleContent} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModule;