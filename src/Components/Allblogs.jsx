import React, { useState, useEffect } from "react";

export default function Allblogs() {
  const [blogs, setBlogs] = useState([]);
  const handleGoBack = () => {
    window.history.back();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <div className=" max-w-screen-xl mx-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-1 text-sm font-medium text-white rounded-sm bg-green-700  focus:outline-none focus:ring focus:border-red-400 mr-2 "
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <p className="text-4xl text-blue-800 mb-6 font-bold">All Blogs</p>
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
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {blog.title}
              </td>
              <td className="px-6 py-4 max-w-sm overflow-hidden overflow-ellipsis break-words">
                {blog.description}
              </td>
              <td className="px-6 py-4">{blog.user_name}</td>
              <td className="px-6 py-4">{formatDateTime(blog.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
