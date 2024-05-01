import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env['PORT'],
  dbUri: process.env['MONGO_URI'],
  saltWorkFactor: process.env['SALT_WORK_FACTOR'],
  accessTokenTTL: process.env['ACCESS_TOKEN_TTL'],
  refreshTokenTTL: process.env['REFRESH_TOKEN_TTL'],
  publicKey: process.env['ACCESS_TOKEN_PUBLIC_KEY'],
  privateKey: process.env['ACCESS_TOKEN_PRIVATE_KEY'],
}
