import { Request, Response } from 'express'
import config from 'config'
import { validatePassword } from '../service/user.service'
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service'
import { signJwt } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the user's password
  const user = await validatePassword(req.body)

  if (!user) return res.status(401).send('Invalid email or password')
  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '')
  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTTL') }
  )
  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTTL') }
  )

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id

  console.log('userId', userId)

  const sessions = await findSessions({
    user: userId,
    valid: true,
  })

  console.log('sessions', sessions)
  return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session

  await updateSession({ _id: sessionId }, { isValid: false })

  return res.send({
    accessToken: null,
    refreshTokenL: null,
  })
}
