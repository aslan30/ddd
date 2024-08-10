import it from './styles.module.css'
import { useState, useEffect } from 'react';

export function Items() {
    let [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Hello')
    }, [count])

    return(
        <>
            <h1>Items</h1>
            <button onClick={ ()=> {setCount(count+1)} }>CLICK</button>
            {count}
        </>
    )
}



export default Items;
