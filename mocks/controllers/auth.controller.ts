import { Router } from 'express'
import { URL } from 'url'

export function authController(app: Router) {
  const router = Router()

  router.get('', (req, res) => {
    const redirectUrl = new URL(
      'http://localhost:9080/auth/oauth/discord/callback'
    )

    const query = redirectUrl.searchParams
    query.append('code', 'dummy')

    res.redirect(redirectUrl.toString())
  })

  router.post('', (req, res) => {
    // TODO add session
    res.end()
  })

  app.use('/auth/oauth/discord', router)
}
