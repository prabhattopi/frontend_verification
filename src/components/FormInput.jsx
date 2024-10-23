/* eslint-disable react/prop-types */
import { useState } from 'react';

const FormInput = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit_price: '',
    total_price: '',
    shipping: '',
    tax: '',
    quantity: '',
    approval_email: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!open) return null; // Don't render the modal if `open` is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white p-4 h-[90%] overflow-auto rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

         


          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit_price">
              Unit Price
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="number"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_price">
              Total Price
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="number"
              name="total_price"
              value={formData.total_price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shipping">
              Shipping
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="number"
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tax">
              Tax
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="approval_email">
              Approval Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="email"
              name="approval_email"
              value={formData.approval_email}
              onChange={handleChange}
              required
            />
          </div>

         
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInput;
