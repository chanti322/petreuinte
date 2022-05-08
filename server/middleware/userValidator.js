const express = require("express");
const { check, validationResult } = require("express-validator");

exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req); //error are here
  
  if (!result.isEmpty()) {
  
    const error = result.array()[0].msg;
   
    return res.status(422).json({
      success: false,
      error: error,
    });
  }
  next();
};
exports.userValidator = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("Name must have between 3 and 15 characters"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid Email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
