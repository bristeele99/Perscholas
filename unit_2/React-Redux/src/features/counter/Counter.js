import {useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
// import styles from'./Counter.module.css'

export default function Counter () {
    const count = useSelector((state)=> state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <button aria-label="Increment Value"
            onClick={()=>dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button 
            aria-label="Decrement Value"
            onClick={() => dispatch(decrement ())}
            >
            Decrement
            </button>
        </div>
    )
}