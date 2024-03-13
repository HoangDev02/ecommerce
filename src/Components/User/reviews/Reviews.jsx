import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviewsById } from "../../../redux/API/apiReviews";
import { Accordion } from "react-bootstrap";
import { set } from "js-cookie";

function Reviews({ productId }) {
  const [currentProductId, setCurrentProductId] = useState(productId);

  const dispatch = useDispatch();
  const reviewsList = useSelector((state) => state.reviews.reviews?.reviews);
  useEffect(() => {
    if(currentProductId !== productId) {
      getProductReviewsById(productId, dispatch);
      setCurrentProductId(productId);
    }
  }, [dispatch, productId, currentProductId]);
  return (
    <Accordion defaultActiveKey="0">
      {
      reviewsList?.map((review) => ((
        <Accordion.Item eventKey="0">
        <Accordion.Header>reviews {review.author?.username}</Accordion.Header>
        <Accordion.Body>
         {
            review.title?.map((review) => (
                <div>
                    <div>{review.title}</div>
                    <div>{review.content}</div>
                    <img src={review.img}></img>
                </div>
            ))
         }
        </Accordion.Body>
      </Accordion.Item>
      )))
      
    }
    </Accordion>
 
  );
}

export default Reviews;
