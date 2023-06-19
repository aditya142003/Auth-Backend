const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.sendStatus(204).json({ message: "No employees found" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
    .sendStatus(400)
    .json({ message: "First and last names are required." });
  }
  
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    
    res.sendStatus(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.sendStatus(400).json({ message: "Id is required" });
  }

  const employee = await Employee.findOne({
    _id: req.body.id,
  }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `No employye matches ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.sendStatus(400).json({ message: "Id is required" });
  }

  const employee = await Employee.findOne({
    _id: req.body.id,
  }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No employye matches ${req.body.id}` });
  }
  const result = await employee.deleteOne({
    _id: req.body.id,
  });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.sendStatus(400).json({ message: "Id is required" });
  }
  const employee = await Employee.findOne({
    _id: req.params.id,
  }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `No employye matches ${req.params.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
