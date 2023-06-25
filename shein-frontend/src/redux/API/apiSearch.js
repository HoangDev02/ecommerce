import axios from 'axios';
import {getSearchsFail,getSearchsSuccess,getSearchsStart} from '../searchSlice'

export const searchProduct = async(dispatch, searchQuery) => {
    dispatch(getSearchsStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}search`, 
        {
            params: { search: searchQuery }
        }
        )
        dispatch(getSearchsSuccess(res.data))
    }catch(err) {
        console.log(getSearchsFail(err));
    }
}