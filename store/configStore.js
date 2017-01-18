import { createStore } from 'redux'
import Reducer from '../reducers/Reducer'

export default function configStore() {
    return createStore(Reducer)
}