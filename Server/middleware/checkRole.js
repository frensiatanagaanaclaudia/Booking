//checkrole(admin) krna pake next jadi ga pake req res
const CheckRole = (...roles) => {
  // ini krna express ttep hrus pake
  return (req, res, next) => {
    //ini dari DB
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({message : "Error Forbidden Role "}); //forbidden
    }
    next();
  };
};
module.exports = CheckRole;
