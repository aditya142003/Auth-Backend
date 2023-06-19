const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const Roles_list = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(Roles_list.Admin, Roles_list.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(Roles_list.Admin, Roles_list.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(Roles_list.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
