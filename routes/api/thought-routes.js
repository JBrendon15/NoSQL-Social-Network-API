const router = require('express').Router();
const { getUsers, getOneUser, createUser, updateUser } = require('../../controllers/user-controller');