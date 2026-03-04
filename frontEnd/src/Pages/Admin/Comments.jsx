import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentsTableItem from "../../Components/Admin/CommentsTableItem";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-1 px-5 sm:pt-12 sm:pl-16 bg-purple-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === "Approved" ? "text-purple-900" : "text-gray-700"}`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === "Not Approved" ? "text-purple-900" : "text-gray-700"}`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-800 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title & Comments
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comments) => {
                if (filter === "Approved") return comments.isApproved === true;
                return comments.isApproved === false;
              })
              .map((comments, index) => (
                <CommentsTableItem
                  key={comments._id}
                  comment={comments}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
