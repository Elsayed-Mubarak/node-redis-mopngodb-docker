/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 09:48:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const createError = require ('http-errors');

const Team = require ('../team.model');
const Email = require ('../../../modules/email');
const catchAsync = require ('../../../utils/catchAsync');

sendVerification = catchAsync (async (req, res, next) => {
  const team = await Team.findOne ().byID (req.userData._id);
  if (team && team.isVerified)
    return next (createError (409, 'Team is already verified'));

  // if otp next resend time didn't expire
  let timeInSeconds = (team.otpNextResendAt - new Date ()) / 1000;
  const responseBody = {
    timeInSeconds,
    email: team.email,
    message: 'To update email or resend verification please try again later',
  };

  let otpNextDate = new Date (team.otpNextResendAt);
  let milliseconds = otpNextDate.getTime ();

  if (milliseconds > Date.now ()) {
    let timeNextOpt = Math.trunc (
      (new Date (team.otpNextResendAt) - Date.now ()) / (1000 * 60)
    );
    responseBody.message = `Try again later after ${timeNextOpt + 1} minute(s)`;
    return res.status (400).json (responseBody);
  }

  team.updateOtp ();
  await team.save ();

  await new Email (team, team.otp).sendWelcome ();
  timeInSeconds = (team.otpNextResendAt - new Date ()) / 1000;
  responseBody.message = 'Please Check your Email';

  responseBody.timeInSeconds = timeInSeconds;

  return res.status (200).send (responseBody);
});

module.exports = sendVerification;
