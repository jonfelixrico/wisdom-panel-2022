import { Router } from 'express'
import { URL } from 'url'

function generateRedirectUrl(query: Record<string, string>) {
  const url = new URL('http://localhost:9080/auth/oauth/discord/callback')

  const params = url.searchParams
  for (const key in query) {
    if (query[key]) {
      params.append(key, query[key] as string)
    }
  }
  params.append('code', 'dummy')

  return url.toString()
}

export function authController(app: Router) {
  const router = Router()

  router.get('', (req, res) => {
    // this is to prevent the silly UX of the auth flow happening if the user attempts to start it
    if (req.session.isAuthenticated) {
      res.redirect('http://localhost:9080')
      return
    }

    req.session.isAuthenticated = true

    res.render('oauth', {
      url: generateRedirectUrl(req.query as Record<string, string>),
      layout: false,
    })
  })

  app.use('/auth/oauth/discord', router)
}
