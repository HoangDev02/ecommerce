import React, { useEffect, useState } from "react";
import "./specificationTable.css"; // Đây là file CSS tùy chỉnh của bạn
import { getTechSpecs } from "../../../redux/API/apiTechSpecs";
import { useDispatch, useSelector } from "react-redux";
const SpecificationTable = ({ productId }) => {
  const [currentProductId, setCurrentProductId] = useState(productId);
  const getListTechSpecs = useSelector(
    (state) => state.techSpecs.techSpecs?.techSpecs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId !== currentProductId) {
      getTechSpecs(productId, dispatch);
      setCurrentProductId(productId);
    }
  }, [productId, dispatch, currentProductId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          {getListTechSpecs.map((techSpecs) => (
            <table className="table table-striped table-hover">
              <tbody>
                {techSpecs.specifications?.map((item) => (
                  <tr key={item._id}>
                    <td>{item.key}</td>
                    <td>{item.value}</td>
                    <td>{item.garantie ? `${item.garantie} Tháng` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationTable;
