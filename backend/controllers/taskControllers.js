// backend/controllers/taskControllers.js
const { validationResult } = require("express-validator");
const prisma = require("../prisma");

// GET /api/tasks  (with simple pagination & sorting)
exports.getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    // NEW: sorting inputs from query
    const sortBy = req.query.sortBy || "endDate"; // "endDate" | "priority" | "createdAt"
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // whitelist allowed fields for safety
    const allowedSortFields = ["endDate", "priority", "createdAt"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "endDate";

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { userId: req.user.id },
        orderBy: { [sortField]: sortOrder },
        skip,
        take: pageSize,
      }),
      prisma.task.count({
        where: { userId: req.user.id },
      }),
    ]);

    return res.status(200).json({
      status: true,
      tasks,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      msg: "Tasks fetched successfully.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// GET /api/tasks/:id
exports.getTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ status: false, msg: "Invalid task id" });
    }

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    return res
      .status(200)
      .json({ status: true, task, msg: "Task found successfully." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        msg: errors.array()[0].msg,
      });
    }

    const { title, description, priority, endDate } = req.body;

    const task = await prisma.task.create({
      data: {
        userId: req.user.id,
        title,
        description,
        priority,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return res.status(201).json({
      status: true,
      task,
      msg: "Task created successfully.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// PATCH /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ status: false, msg: "Invalid task id" });
    }

    // Make sure the task belongs to this user
    const existing = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        msg: errors.array()[0].msg,
      });
    }

    const { title, description, priority, endDate } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (priority !== undefined) data.priority = priority;
    if (endDate !== undefined && endDate !== "") {
      data.endDate = new Date(endDate);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        msg: "Please provide at least one field to update",
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      status: true,
      task: updatedTask,
      msg: "Task updated successfully.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ status: false, msg: "Invalid task id" });
    }

    const existing = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    await prisma.task.delete({ where: { id } });

    return res.status(200).json({
      status: true,
      msg: "Task deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
