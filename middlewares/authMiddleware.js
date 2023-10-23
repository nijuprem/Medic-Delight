const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // console.log(req.cookies.jwttoken);
    // const token = req.headers["authorization"].split(" ")[1];
    const token = req.cookies.jwttoken;
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          success: false,
          message: "Authorization Failed here",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    // console.log(`Authentication Error`);
    res.status(401).send({
      success: false,
      message: "Authorization Failed",
    });
  }
};
