
async function authenticateToken(req, res, next) {
  console.log(req.headers)

  next();

}

module.exports = authenticateToken;