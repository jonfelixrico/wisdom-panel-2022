import type {
  Express,
  NextFunction,
  Response,
  Request,
  RequestHandler,
} from 'express'
import session from 'express-session'

// Session setup
declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean
  }
}

interface AuthlessRoute {
  path: RegExp
  methods?: string[]
}

const PUBLIC_ROUTES: AuthlessRoute[] = [
  {
    path: /auth/,
  },
]

function isPublic(req: Request) {
  for (const { path, methods } of PUBLIC_ROUTES) {
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

const authGuard: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.isAuthenticated || isPublic(req)) {
    next()
  } else {
    console.log('Unauthenticated access to %s', req.path)
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
