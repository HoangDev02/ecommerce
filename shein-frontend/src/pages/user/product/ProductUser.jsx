import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getAllProduct,getProduct} from '../../../redux/API/apiRequestProduct'

const ProductUser = () => {
    
    const productList = useSelector((state) => state.products.product?.product)

    const dispatch = useDispatch();

    useEffect((id) => {
        getProduct(dispatch,id)
    })
    

    return (
        <div>
          {
            productList.map((item) => {
                return (
                    <div>{item.name}</div>
                )
            })
          }
        </div>
    );
};

export default ProductUser;