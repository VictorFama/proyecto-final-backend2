// devuelve datos de la sesion actual asi se ve en postman para la evidencia
const getSession = (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    sessionID: req.sessionID,
    user: req.user || null,
  });
};

module.exports = { getSession };
