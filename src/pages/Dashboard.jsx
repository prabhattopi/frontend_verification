/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import api from "../api";
import ClipLoader from "react-spinners/ClipLoader";
import ItemCard from "../components/ItemCard";
import { AuthContext } from "../context/auth/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    console.log("Form Data Submitted:", formData);
    try {
      let data = await api.post("/items", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (data?.data?.item) {
        setData((prev) => [...prev, data.data.item]);
      }
      // Perform your submission logic here
      setIsModalOpen(false);
      toast.success(data?.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };
  const handleUpdate = async (id, item) => {
    setLoading(true);
    try {
      let data = await api.put(
        `/items/${item._id}`,
        {
          isApproved: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (data?.data?.item) {
        setData((prev) =>
          prev.map((e) =>
            e._id == data.data.item._id
              ? { ...e, is_approved: data.data.item.is_approved }
              : e
          )
        );
        toast.success("Item approval updated successfully");
      }
    } catch (err) {
      toast.error("Something error occured");
      console.log(err);
    }
    setLoading(false);
  };
  const handleLogout = async () => {
    try {
      api.post(
        "/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      let data = await api.get("/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (data?.data?.item) {
        setData(data.data.item);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isGet = true;
    if (isGet) {
      fetchData();
    }

    return () => {
      isGet = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-10  items-center h-screen w-full px-4 py-4">
      <div className="flex items-center justify-between w-full">
        <div>Dashboard</div>
        <div className="flex items-center gap-6 px-4">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 w-[170px] h-[50px] text-white font-bold text-md rounded-lg"
          >
            Create New Item +
          </button>
          <button
            onClick={handleLogout}
            className="h-[30px] w-24 border-2 border-black rounded-xl"
          >
            Logout
          </button>
        </div>
        <FormInput
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </div>
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      {!loading && (
        <div className="flex mt-4 gap-6 flex-col items-center w-full">
          {data?.length > 0 ? (
            data?.map((e) => (
              <ItemCard handleUpdate={handleUpdate} key={e._id} item={e} />
            ))
          ) : (
            <div className="flex items-center text-center">
              There is no Item
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
