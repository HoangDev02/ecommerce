import React, {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {ShowUpdateProduct, deleteProduct, getAllProduct,updateProduct, getProduct} from '../../../redux/API/apiRequestProduct'
import './product.css'
import { useNavigate } from 'react-router-dom';
import {createAxios} from '../../../redux/createInstance'
import { loginSuccess } from "../../../redux/authSlice";
export default function Product() {

    const productList = useSelector((state) => state.products.products?.allProduct)
    const user = useSelector((state)=> state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const msg = useSelector((state) => state.products?.msg)
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleUpdate = (id) => {
        ShowUpdateProduct(dispatch,id,navigate)
    }
    const handleDelete = (id) => {
        deleteProduct(user?.accessToken,dispatch,id,axiosJWT)
    }

    useEffect(() => {
        getAllProduct( dispatch) 
    }, []);
  return (
    <div className='Container'>
         <div className="home-role">
        {`your user: ${user?.isAdmin ? 'admin': 'user'}`}
      </div>
        <table className='table mt-4'>
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
            </thead>
            <tbody>
                {
                    productList?.map((item) => (
                        <tr>
                            <th scope='row'>{item._id}</th>
                            <td scope='row'>{item.name}</td>
                            <td scope='row'>{item.price}</td>
                            <td>
                                <button onClick={() => handleUpdate(item._id)} className="delete-user">Update</button>
                                <button onClick={() => handleDelete(item._id)} className="delete-user">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div>{msg}</div>
    </div>
  )
}
