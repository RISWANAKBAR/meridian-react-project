import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserBlogTable = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userBlogs, setUserBlogs] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    description: "",
    id: null,
  });
  const handleLogout = () => {
    navigate("/");
  };
  const handleShowAllBlogs = () => {
    navigate(`/allblogs`);
  };

  const fetchUserBlogs = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/blogs/user/${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        setUserBlogs(data);
      } else {
        console.error("Failed to fetch user blogs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [userId]);

  const handleCreateNewBlog = () => {
    setShowCreatePopup(true);
  };

  const handleEditBlog = (blogId) => {
    fetch(`http://127.0.0.1:8000/api/blogs/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        setPopupData({
          title: data.title,
          description: data.description,
          id: blogId,
        });
        setShowEditPopup(true);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  };

  const handleClosePopup = () => {
    setShowCreatePopup(false);
    setShowEditPopup(false);
    setPopupData({ title: "", description: "", id: null });
  };

  const handlePopupInputChange = (e) => {
    const { name, value } = e.target;
    setPopupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();

    const apiUrl = popupData.id
      ? `http://127.0.0.1:8000/api/blogs/${popupData.id}`
      : "http://127.0.0.1:8000/api/blogs";

    const method = popupData.id ? "PUT" : "POST";

    fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: popupData.title,
        description: popupData.description,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        handleClosePopup();
        fetchUserBlogs();
      })
      .catch((error) => console.error("Error submitting blog data:", error));
  };
  const handleDeleteBlog = (blogId) => {
    fetch(`http://127.0.0.1:8000/api/blogs/${blogId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchUserBlogs();
        } else {
          console.error("Failed to delete blog");
        }
      })
      .catch((error) => console.error("Error deleting blog:", error));
  };

  return (
    <div className=" max-w-screen-xl mx-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-1 text-sm font-medium text-white rounded-sm bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-400 mr-2 "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <p className="text-4xl text-blue-800 mb-6 font-bold">Your Blogs</p>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Edit Blog
            </th>
            <th scope="col" className="px-6 py-3">
              Delete Blog
            </th>
          </tr>
        </thead>
        <tbody>
          {userBlogs.map((blog) => (
            <tr key={blog.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {blog.title}
              </td>
              <td className="px-6 py-4 max-w-sm overflow-hidden overflow-ellipsis break-words">
                {blog.description}
              </td>
              <td className="px-6 py-4 ">
                <button
                  className="font-medium text-blue-600 hover:underline "
                  onClick={() => handleEditBlog(blog.id)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium text-red-600 hover:underline"
                  onClick={() => handleDeleteBlog(blog.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-4 py-4">
        <button
          className="px-6 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
          onClick={handleCreateNewBlog}
        >
          Create New Blog
        </button>
        <button
          className="px-6 py-2 ml-4 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-400"
          onClick={handleShowAllBlogs}
        >
          Show All Blogs
        </button>
      </div>

      {showCreatePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4 text-blue-800">
              Create New Blog
            </h2>
            <form onSubmit={handlePopupSubmit}>
              <label className="block mb-2 text-left">
                Title:
                <input
                  type="text"
                  name="title"
                  value={popupData.title}
                  onChange={handlePopupInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="block mb-2 text-left">
                Description:
                <textarea
                  name="description"
                  value={popupData.description}
                  onChange={handlePopupInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-1 mr-2 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-gray-500 text-white px-6 py-1 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4 text-green-700">Edit Blog</h2>
            <form onSubmit={handlePopupSubmit}>
              <label className="block mb-2 text-left">
                Title:
                <input
                  type="text"
                  name="title"
                  value={popupData.title}
                  onChange={handlePopupInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <label className="block mb-2 text-left">
                Description:
                <textarea
                  name="description"
                  value={popupData.description}
                  onChange={handlePopupInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 mr-1 rounded-md"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-gray-500 text-white px-6 py-1 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlogTable;
