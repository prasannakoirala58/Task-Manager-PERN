const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

// GET /api/tasks
router.get("/tasks", auth, getTasks);

router.get(
  "/tasks/:id",
  auth,
  [param("id").isInt().withMessage("Task id must be an integer")],
  getTask
);

// POST /api/tasks
router.post(
  "/tasks",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("endDate")
      .notEmpty()
      .withMessage("End date is required")
      .isISO8601()
      .withMessage("End date must be a valid date"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be low, medium, or high"),
  ],
  createTask
);

// PATCH /api/tasks/:id
router.patch(
  "/tasks/:id",
  auth,
  [
    param("id").isInt().withMessage("Task id must be an integer"),
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be low, medium, or high"),
    body("endDate")
      .optional()
      .isISO8601()
      .withMessage("End date must be a valid date"),
  ],
  updateTask
);

// DELETE /api/tasks/:id
router.delete(
  "/tasks/:id",
  auth,
  [param("id").isInt().withMessage("Task id must be an integer")],
  deleteTask
);

module.exports = router;
