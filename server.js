const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Ruta actualiza privilegios usuario
router.put('/api/users/:id/privileges', async (req, res) => {
  const userId = req.params.id;
  const { privileges } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Filtrar privilegios para evitar duplicados
    const newPrivileges = privileges.filter(privilege => !user.privileges.includes(privilege));

    if (newPrivileges.length === 0) {
      return res.status(400).json({ message: 'El usuario ya tiene todos los privilegios especificados' });
    }

    user.privileges = [...user.privileges, ...newPrivileges];
    await user.save();

    res.json({ message: 'Privilegios actualizados correctamente', privileges: user.privileges });
  } catch (error) {
    console.error('Error al actualizar privilegios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
