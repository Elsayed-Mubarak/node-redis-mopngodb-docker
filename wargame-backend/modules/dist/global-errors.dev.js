"use strict";

var multer = require("multer");

var Config = require("./../config");

var Security = require("./../security");

var Error404 = function Error404(req, res, next) {
  if (Config.canUseCustomErrorPages || true) {
    // Handle 404
    res.status(404).json({
      title: "404: File Not Found"
    });
    Security.log404(req);
  }
}; // global errors 500, 400, 401, 409
// 400	BadRequest
// 401	Unauthorized
// 402	PaymentRequired
// 403	Forbidden
// 405	MethodNotAllowed
// 409	Conflict
// 408	RequestTimeout
// 429	TooManyRequests
// 501	NotImplemented
// 503	ServiceUnavailable
// 504	GatewayTimeout
// 423	Locked
// 413	PayloadTooLarge
// 411	LengthRequired


var Error500 = function Error500(error, req, res, next) {
  if (Config.canUseCustomErrorPages) {
    if (error.status === 500 || error.status === undefined) {
      // Handle 500
      return res.status(500).json({
        message: "500: Internal Server Error",
        error: error
      });
    } else {
      return res.status(error.status).json({
        message: error.message,
        error: error
      });
    }
  }

  return res.status(error.status).json({
    message: error.message,
    error: error
  });
};

var MulterError = function MulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(500).json({
      message: err.message
    });
  } else next(err);
};

module.exports = {
  Error404: Error404,
  Error500: Error500,
  MulterError: MulterError
};