const bcrypt = require('bcrypt');

// NOTA: Aquí NO hay pool propio, porque en tu server.js ya existe.
// Así que el pool lo pasaremos desde la ruta
exports.login = (pool) => async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, nombre, email, password_hash, activo, 'admin' AS rol 
       FROM clientes 
       WHERE email = $1`, 
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    if (!user.activo) {
      return res.status(403).json({ message: 'Cuenta inactiva' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
