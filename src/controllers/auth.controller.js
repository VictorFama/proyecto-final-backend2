const User = require('../models/user.model');

// registro de un usuario nuevo
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // chequeo que no haya otro con el mismo mail
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ status: 'error', message: 'el email ya esta registrado' });
    }

    const user = await User.create({ first_name, last_name, email, password });

    // devuelvo el usuario sin la password
    res.status(201).json({
      status: 'success',
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { register };
