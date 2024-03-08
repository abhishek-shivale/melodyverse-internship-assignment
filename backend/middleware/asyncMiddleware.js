const asyncMiddleware = (functions) => {
  return (req, res, next) => {
    try {
      functions(req, res, next);
    } catch (error) {
      next(error);
      res.status(500).json({
        success: false,
        message: "Error in async middelware",
        error: error,
      });
    }
  };
};

export default asyncMiddleware;
