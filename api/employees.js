const express = require("express");
const router = express.Router();

const employees = require("../data/employees");

// Get all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// Get a random employee
router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

// Get an employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

// Add a new employee
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Name is required and must be a string." });
  }

  const newEmployee = {
    id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
    name,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router;
