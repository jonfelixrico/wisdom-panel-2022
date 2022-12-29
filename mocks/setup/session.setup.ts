import type { Express, NextFunction, Response, Request } from 'express'
import session from 'express-session'

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean
  }
}

interface AuthlessRoute {
  path: RegExp
  methods?: string[]
}

const AUTHLESS_ROUTES: AuthlessRoute[] = [
  {
    path: /auth/,
  },
]

function isRouteAuthless(req: Request) {
  for (const { path, methods } of AUTHLESS_ROUTES) {
    if (!path.test(req.path)) {
      continue
    }

    if (!methods?.length) {
      return true
    }

    return methods.includes(req.method)
  }

  return false
}

function authGuard(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAuthenticated || isRouteAuthless(req)) {
    next()
  } else {
    res.sendStatus(401)
  }
}

export function setupSession(app: Express) {
  app.use(
    session({
      secret: 'mocks',
      saveUninitialized: true,
      resave: false,
    })
  )

  app.use(authGuard)
}
