import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { updateProduct } from '../../../redux/API/apiRequestProduct';
import { useNavigate } from 'react-router-dom';
export default function UpdateProduct() {

  const productDetail = useSelector((state) => state.products.detailProduct?.product);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [name,setName] = useState(productDetail.name)
  const [price,setPrice] = useState(productDetail.price)
  const [img,setImg] = useState(productDetail.img)
  const [description,setDescription] = useState(productDetail.description)
  const handleUpdateProduct= (id) => {
    const newProduct = {
      name: name,
      price: price,
      img: img,
      description: description
    }
    updateProduct(newProduct,dispatch,id,navigate)
  }
  return (
    <div className='container'>
      <div className='mt-3'>
        <h1>Update product</h1>
          {/* {
            productDetail.map((item) => {
              return ( */}
                <div className="mb-3">
                   <label for="name">tên sản phẩm</label>
                   <input type="text" class="form-control" value={name}  onChange={(e) => setName(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="description">Mô tả</label>
                    <input type="text" class="form-control " id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="img" >img</label>
                    <input type="text" class="form-control" id="img" name="img" value={img} onChange={(e) => setImg(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={() => handleUpdateProduct(productDetail._id)}>Cập nhật ngay</button>
       
      </div>
    </div>
  )
}
