import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./promotion.css";
function Promotion({ productId }) {
  const dispatch = useDispatch();
  const getListTechSpecs = useSelector(
    (state) => state.techSpecs.techSpecs?.techSpecs
  );
  useEffect(() => {}, [productId, dispatch]);

  return (
      <div className="promotion-main">
        <div className="row">
          <div className="col">
            {getListTechSpecs.map((techSpecs) => (
              <div>
                {techSpecs.promotion?.map((item) => (
                  <table className="table">
                    <thead class="table-light">
                      <td className="text-danger">{item.key}</td>
                    </thead>
                    <tbody>
                      <tr key={item._id}>
                        <td>{item.value}</td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Promotion;
