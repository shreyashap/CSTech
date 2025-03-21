const adminMiddleware = (req, res, next) => {
    try {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  export default adminMiddleware;
  