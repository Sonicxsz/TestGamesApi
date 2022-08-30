import { useRef, useEffect } from "react"


export function useKey(key, cb){
    const callbackRef = useRef(cb)

    useEffect(() =>{
        callbackRef.current = cb
    })

    useEffect(() =>{
        function handle(e){
            if(e.key === key){
                callbackRef.current(e)
            }
        }

        document.addEventListener('keydown', handle);

        return () => document.removeEventListener('keypress', handle)
    }, [key])

}