
import { useSelector } from "react-redux";
const OrderDetails = () => {
  const { singlePlanData, employerPackageFields } = useSelector(
    (state) => state.employerPackages
  );

  return (
    <div className="order-box">
      <h3>Your Order</h3>
      <table>
        <thead>
          <tr>
            <th>
              <strong>Product</strong>
            </th>
            <th>
              <strong></strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="cart-item">
            <td className="product-name capitalize">{singlePlanData.singlePlanData?.name}</td>
            <td className="product-total">₹ {employerPackageFields.price}</td>
          </tr>

          
        </tbody>
        <tfoot>
       
          
          <tr className="order-total">
            <td>Total</td>
            <td>
              <span className="amount">₹ {employerPackageFields.price}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
