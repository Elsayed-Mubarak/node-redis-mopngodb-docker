/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 09:52:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const express = require ('express');
const Security = require ('../../security');
const router = express.Router ({caseSensitive: false});

const {
  signup,
  sendVerification,
  verify,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateName
} = require ('./controllers');

router.post ('/signup.json', signup);
router.post ('/login.json', login);

router.post (
  '/verification-code.json',
  Security.validateTempToken,
  sendVerification
);
router.post ('/verify.json', Security.validateTempToken, verify);

router.patch("/update-password", Security.auth(["user"]), updatePassword);
router.post("/forget-password", forgotPassword);
router.post("/reset-password", Security.validateTempToken, resetPassword);

router.patch("/team-name", Security.auth(['user']), updateName);

module.exports = router;
