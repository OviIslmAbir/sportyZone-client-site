import { useEffect } from "react"

const useTitle = title =>{
    useEffect(() => { 
        document.title = `Sporty Zone | ${title}`
    }, [title])
}
export default useTitle