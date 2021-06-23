const jwt = require("jsonwebtoken");

const config = require("../../config");

// check if ticket exists
function isExists(req) {
  if (req.headers.authorization && req.headers.authorization !== undefined) {
    return true;
  }
  return false;
}

// sign ticket
function signTicket(data) {
  return jwt.sign(data, config.PRIVATEKEY, {
    algorithm: "RS256",
  });
}

function signInfuraData(data) {
  return jwt.sign(data, config.InfuraPrivateKey, {
    algorithm: "RS256",
    header: {
      alg: "RS256",
      typ: "JWT",
      kid: "9752637bb94841ddb6071d7bd2b8585a",
    },
  });
}

function verifyInfuraData(data) {
  return jwt.verify(data, config.InfuraPublicKey, {
    algorithm: "RS256",
  });
}

// return decodedString/false
function verifyTicket(req) {
  return jwt.verify(req.headers.authorization, config.PUBLICKEY, {
    algorithm: "RS256",
  });
}

function verifySocket(token) {
  return jwt.verify(token, config.PUBLICKEY, {
    algorithm: "RS256",
  });
}

module.exports = {
  isExists,
  sign: signTicket,
  verify: verifyTicket,
  signInfuraData,
  verifyInfuraData,
  verifySocket,
};
