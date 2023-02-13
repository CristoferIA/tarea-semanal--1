const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: {
        status: 'enabled',
      },
    });
    // 2. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
  const user = await User.findOne({
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'status',
      'createdAt',
      'updatedAt',
    ],
    where: {
      status: 'enabled',
      id,
    },
  });
  // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not fount',
    });
  }
  // 4. ENVIAR UNA RESPUESTA AL USUARIO EN CASO SI EXISTE UNA RESPUESTA
  res.status(200).json({
    status: 'success',
    message: 'User was found succesfully',
    user,
  });
};

const createUser = async (req, res) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, email, password, role } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
};

const updateUser = async (req, res) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const { name, email } = req.body;
  // 3. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
  const user = await User.findOne({
    where: {
      status: 'enabled',
      id,
    },
  });
  //4. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  // 5. REALIZAR LA ACTUALIZACIÓN DE LA TABLA
  await user.update({ name, email });
  // 6. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User update successfully',
  });
};

const deleteUser = async (req, res) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
  const user = await User.findOne({
    where: {
      status: 'enabled',
      id,
    },
  });
  // 3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not fount',
    });
  }
  // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  await user.update({ status: 'disabled' });
  // 5. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
};

module.exports = {
  findUser,
  findUsers,
  createUser,
  updateUser,
  deleteUser,
};
