import { Router } from 'express'
import { URL } from 'url'

export function authController(app: Router) {
  const router = Router()

  router.get('/auth/oauth/discord', (req, res) => {
    const redirectUrl = new URL(
      'http://localhost:8080/auth/oauth/discord/callback'
    )

    const query = redirectUrl.searchParams
    query.append('code', 'dummy')

    res.redirect(redirectUrl.toString())
  })

  router.post('/auth/oauth/discord', (req, res) => {
    // TODO add session
    res.end()
  })

  app.use('/auth', router)
}
