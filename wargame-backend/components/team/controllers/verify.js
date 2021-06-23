/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 09:51:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const createError = require('http-errors');
const catchAsync = require('../../../utils/catchAsync');
const Team = require('../team.model');
const {otp: otpSchema} = require('../team.validation');
const securityModule = require('../../../security');
const Config = require('../../../config');

verify = catchAsync(async (req, res, next) => {
  // validate all data felids
  const {error, value} = otpSchema.validate(req.body);
  // there are error in the validation data not valid
  if (error)
    return res
      .status(400)
      .json({message: error.message.replace(/"/g, ''), status: 400});

  const team = await Team.findOne(
    {_id: req.userData._id},
    '-otpNextResendAt -__v -createdAt -updatedAt -forgotPasswordNextResetAt -forgotPasswordResetCounter'
  );
  // if otp !== the code sent
  if (team.otp !== value.otp) return next(createError(400, 'Invalid code'));

  team.isVerified = true;
  team.otpRequestCounter = 0;
  await team.save();

  // remove data from user
  team.otpRequestCounter =
    team.password =
    team.otp =
    team.updatedAt =
      undefined;

  let token = await securityModule.buildTicket(team);
  req.session.user_sid = {userId: team.userID, role: team.role};
  req.session.save();

  res.cookie('lang', 'en', {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    signed: false,
  });

  res.cookie('auth_token', token, {
    httpOnly: true,
    maxAge: Config.ticketValidationInDays * 24 * 60 * 60 * 1000,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    signed: true,
  });
  return res.status(200).json({
    token,
    verified: true,
  });
});

module.exports = verify;
