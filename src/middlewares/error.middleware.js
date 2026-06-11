// error operacional propio para tirar desde los controllers con su status
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// envuelve un controller async y manda los errores al next sin tener que poner try catch
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// si nada matcheo la ruta cae aca
const notFoundHandler = (_req, res) => {
  res.status(404).json({ status: 'error', message: 'ruta no encontrada' });
};

// manejador central, todo error termina aca
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'error interno del servidor';

  // si no es un error controlado lo logueo para verlo en consola
  if (!err.isOperational) {
    console.error('error no manejado:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { AppError, asyncHandler, notFoundHandler, errorHandler };
