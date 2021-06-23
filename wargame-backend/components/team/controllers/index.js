/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 09:56:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const signup = require ('./signup');
const sendVerification = require ('./send-otp');
const verify = require ('./verify');
const login = require ('./login');
const updatePassword = require ('./update-password');
const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');
const updateName = require('./update-name');

module.exports = {
  signup,
  sendVerification,
  verify,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateName
};
