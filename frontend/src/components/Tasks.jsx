import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  // pagination + sorting state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // show 5 tasks per page

  const [sortBy, setSortBy] = useState("endDate"); // "endDate" | "priority" | "createdAt"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  // Fetch tasks for logged-in user with pagination + sorting
  const fetchTasks = useCallback(() => {
    if (!authState.isLoggedIn) return;

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortOrder,
    });

    const config = { url: `/tasks?${params.toString()}`, method: "get" };

    fetchData(config, { showSuccessToast: false }).then((data) => {
      if (data && data.tasks) {
        setTasks(data.tasks);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
        } else {
          setTotalPages(1);
        }
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    });
  }, [authState.isLoggedIn, fetchData, page, pageSize, sortBy, sortOrder]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete" };
    fetchData(config).then(() => {
      // if we delete the last task on a page, optionally go back a page
      if (tasks.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        fetchTasks();
      }
    });
  };

  // Sorting handlers
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setPage(1); // reset to first page when changing sort
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="my-2 mx-auto max-w-[700px] py-4">
      {/* Header + controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 px-2 md:px-0">
        <div>
          {tasks.length !== 0 && (
            <h2 className="text-xl font-semibold">Your tasks</h2>
          )}
          {tasks.length !== 0 && (
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>
          )}
        </div>

        {/* Sorting controls */}
        {tasks.length !== 0 && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="endDate">Due date</option>
              <option value="priority">Priority</option>
              <option value="createdAt">Created time</option>
            </select>

            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <Link
              to="/tasks/add"
              className="ml-0 md:ml-4 bg-primary text-white hover:bg-primary-dark font-medium rounded-md px-3 py-1.5"
            >
              + Add new task
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
              <span>No tasks found</span>
              <Link
                to="/tasks/add"
                className="bg-primary text-white hover:bg-primary-dark font-medium rounded-md px-4 py-2"
              >
                + Add new task
              </Link>
            </div>
          ) : (
            <>
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md"
                >
                  <div className="flex items-center">
                    <span className="font-medium">Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link
                        to={`/tasks/${task.id}`}
                        className="ml-auto mr-2 text-green-600 cursor-pointer"
                      >
                        <i className="fa-solid fa-pen" />
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(task.id)}
                      >
                        <i className="fa-solid fa-trash" />
                      </span>
                    </Tooltip>
                  </div>

                  {/* Title + meta */}
                  {task.title && (
                    <div className="font-semibold mt-2">{task.title}</div>
                  )}
                  <div className="text-sm text-gray-500 mb-1">
                    Priority:{" "}
                    <span className="capitalize">{task.priority}</span>
                    {task.endDate && (
                      <> • Due: {task.endDate.substring(0, 10)}</>
                    )}
                  </div>

                  {/* Description */}
                  <div className="whitespace-pre">{task.description}</div>
                </div>
              ))}

              {/* Pagination controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
