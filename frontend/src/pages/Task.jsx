import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Input from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";
import { toast } from "react-toastify";

const Task = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [fetchData, { loading }] = useFetch();

  const mode = taskId === undefined ? "add" : "update";

  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    endDate: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);

  // Load task for edit
  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/tasks/${taskId}`,
        method: "get",
      };

      fetchData(config, { showSuccessToast: false }).then((data) => {
        if (data && data.task) {
          setTask(data.task);
          setFormData({
            title: data.task.title || "",
            description: data.task.description || "",
            priority: data.task.priority || "medium",
            endDate: data.task.endDate
              ? data.task.endDate.substring(0, 10)
              : "",
          });
        }
      });
    }
  }, [mode, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        endDate: task.endDate ? task.endDate.substring(0, 10) : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // old validation for description
    const errors = validateManyFields("task", {
      description: formData.description,
    });
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    // title is always required
    if (!formData.title.trim()) {
      toast.error("Please provide a title");
      return;
    }

    // build payload
    const payload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    };

    if (mode === "add") {
      // for create we require a date
      if (!formData.endDate) {
        toast.error("Please select an end date");
        return;
      }
      payload.endDate = formData.endDate;
    } else {
      // for update we only send endDate if user has chosen one
      if (formData.endDate) {
        payload.endDate = formData.endDate;
      }
    }

    if (mode === "add") {
      const config = {
        url: "/tasks",
        method: "post",
        data: payload,
      };
      fetchData(config).then(() => navigate("/"));
    } else {
      const config = {
        url: `/tasks/${taskId}`,
        method: "patch",
        data: payload,
      };
      fetchData(config).then(() => navigate("/"));
    }
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation" />
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <form className="m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center mb-4">
              {mode === "add" ? "Add New Task" : "Edit Task"}
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Title
              </label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                placeholder="Task title"
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Description
              </label>
              <Textarea
                type="description"
                name="description"
                id="description"
                value={formData.description}
                placeholder="Write here.."
                onChange={handleChange}
              />
              {fieldError("description")}
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* End date */}
            <div className="mb-6">
              <label
                htmlFor="endDate"
                className={`after:ml-0.5 ${
                  mode === "add" ? "after:content-['*'] after:text-red-500" : ""
                }`}
              >
                Due date
              </label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <button
              className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
              onClick={handleSubmit}
            >
              {mode === "add" ? "Add task" : "Update Task"}
            </button>
            <button
              type="button"
              className="ml-4 bg-red-500 text-white px-4 py-2 font-medium"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            {mode === "update" && (
              <button
                type="button"
                className="ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Task;
