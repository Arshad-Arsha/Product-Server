// import jwt from "jsonwebtoken";

// export const userAuthorization = (allowedRoles = []) => {
//   return (req, res, next) => {
//     try {
//       const token = req.cookies.token;

//       if (!token) {
//         return res.status(401).json({ success: false, message: "Please login" });
//       }

//       // Verify token
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);

//       // Check user role
//       if (allowedRoles.length && !allowedRoles.includes(decoded.userRole)) {
//         return res.status(403).json({ success: false, message: "Access denied" });
//       }

//       // Attach userId to request
//       req.userId = decoded.userId;
//       req.userRole = decoded.userRole;
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401).json({ success: false, message: "Invalid or expired token" });
//     }
//   };
// };
import jwt from "jsonwebtoken";

export const userAuthorization = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token;

    
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Please login"
        });
      }

   
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decoded.userRole)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      req.userId = decoded.userId;
      req.userRole = decoded.userRole;

      next();
    } catch (error) {
      console.log("Authorization Error:", error.message);

      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
  };
};