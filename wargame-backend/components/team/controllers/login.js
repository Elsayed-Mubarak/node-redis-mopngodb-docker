/**
 * @description      :
 * @author           : dev1
 * @group            :
 * @created          : 01/06/2021 - 09:51:37
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/06/2021
 * - Author          : dev1
 * - Modification    :
 **/
const createError = require('http-errors')

const Team = require('../team.model')
const { login: loginSchema } = require('../team.validation')
const securityModule = require('../../../security')
const catchAsync = require('../../../utils/catchAsync')
const Config = require('../../../config')

login = catchAsync(async (req, res, next) => {
  // request validation
  const { error, value } = loginSchema.validate(req.body)
  if (error)
    return res
      .status(400)
      .json({ message: error.message.replace(/"/g, ''), status: 400 })
  // select (email,pass,isVerified,userID,role_id) from team where email is ...
  const team = await Team.findOne()
    .byEmail(value.email)
    .select('email password isVerified userID role _id')
    .orFail((err) => {
      return next(createError(401, 'Invalid email or password'))
    })
  // if the pass that user enterd not the same on db
  const isPasswordValid = await team.isPasswordValid(value.password)
  if (!isPasswordValid)
    return next(createError(401, 'Invalid email or password'))
  // if isVerified is true
  if (!team.isVerified)
    return res.status(201).json({
      token: team.signTempJWT(),
      verified: false,
      message: 'Email  not verified please check email address',
    })

  let token = await securityModule.buildTicket(team)
  req.session.user_sid = { userId: team.userID, role: team.role }
  req.session.save()

  res.cookie('lang', 'en', {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    signed: false,
  })

  res.cookie('auth_token', token, {
    httpOnly: true,
    maxAge: Config.ticketValidationInDays * 24 * 60 * 60 * 1000,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    signed: true,
  })

  return res.status(200).json({
    token,
    verified: true,
  })
})

module.exports = login
