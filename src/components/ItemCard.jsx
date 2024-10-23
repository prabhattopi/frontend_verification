/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const ItemCard = ({ item, handleUpdate }) => {
    const {currentUser}=useContext(AuthContext)
  return (
    <div className="flex rounded-lg shadow-md h-[50px] items-center justify-between gap-4  w-full px-6 py-6">
        <div className="flex w-[80%] items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="text-sm">Name:</div>
        <div>{item.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">Quantity:</div>
        <div>{item.quantity}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">Unit Price:</div>
        <div>{item.unit_price}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">Total Price:</div>
        <div>{item.total_price}</div>
      </div>
      </div>
      {
        currentUser.email===item.approval_email && item.is_approved=="Pending"?(<div className="flex items-center gap-2">
            <div>Approval Waiting:</div>
            <button onClick={()=>handleUpdate(true,item)} className="bg-green-400 text-white rounded-md px-2 py-1">Accept</button>
            <button onClick={()=>handleUpdate(false,item)} className="bg-red-700 text-white rounded-md px-2 py-1">Reject</button>

        </div>):(
            <div className="flex items-center  gap-2">
            <div className="text-sm">Approval Status:</div>
            <div>{item.is_approved}</div>
          </div>
        )
      }
   
    </div>
  );
};

export default ItemCard;
