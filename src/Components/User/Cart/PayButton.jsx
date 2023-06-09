import axios from "axios"
import { useSelector } from "react-redux"
import {url} from '../../../../src/redux/url'
const PayButton = ({cartItems})  => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleCheckout = () => {
        console.log(cartItems);
        axios.post(`${url}/stripe/create-checkout-session`, {
            cartItems,
            userId : user._id
        }).then((res) => {
            if(res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err));
       
    }
    return (
        <>
            <button onClick={() => handleCheckout()}>checkout</button>
        </>
    )
}
export default PayButton