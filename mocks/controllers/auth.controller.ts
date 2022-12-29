import { Router } from 'express'
import { URL } from 'url'

export function authController(app: Router) {
  const router = Router()

  router.get('', (req, res) => {
    // this is to prevent the silly UX of the auth flow happening if the user attempts to start it
    if (req.session.isAuthenticated) {
      res.redirect('http://localhost:9080')
      return
    }

    const redirectUrl = new URL(
      'http://localhost:9080/auth/oauth/discord/callback'
    )

    const params = redirectUrl.searchParams
    for (const key in req.query) {
      if (req.query[key]) {
        params.append(key, req.query[key] as string)
      }
    }
    params.append('code', 'dummy')

    res.render('oauth', {
      url: redirectUrl.toString(),
      layout: false,
    })
  })

  router.post('', (req, res) => {
    req.session.isAuthenticated = true
    res.end()
  })

  app.use('/auth/oauth/discord', router)
}
