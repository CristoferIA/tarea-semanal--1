const Repairs = require('../models/repairs.model');

const findRepairs = async (req, res) => {
  // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
  const repairs = await Repairs.findAll({
    attributes: ['id', 'date', 'userId', 'status', 'createdAt', 'updatedAt'],
  });
  // 2. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(200).json({
    status: 'success',
    message: 'Repairs was found successfully',
    repairs,
  });
};

const findRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      status: 'pending',
      id,
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'error',
    message: 'User not found',
    repair,
  });
};

const createRepair = async (req, res) => {
  const { date, userId } = req.body;
  const repair = Repairs.create({
    date,
    userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    repair,
  });
};

const updateRepair = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const repair = await Repairs.findOne({
    where: {
      id,
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  repair.update({ status });
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
};

const deleteRepair = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const repair = await Repairs.findOne({
    where: {
      id,
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  repair.update({ status });
  res.status(200).json({
    status: 'success',
    message: 'User cancelled successfully',
  });
};

module.exports = {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
};
