import type {
  Express,
  NextFunction,
  Response,
  Request,
  ErrorRequestHandler,
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
  {
    path: /favicon/,
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

const UNAUTHENTICATED = 'UNAUTHENTICATED'
const authGuard: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.isAuthenticated || isPublic(req)) {
    next()
  } else {
    next(new Error(UNAUTHENTICATED))
  }
}
const authGuardCatcher: ErrorRequestHandler = (err, req, res, next) => {
  if (err?.message == UNAUTHENTICATED) {
    res.sendStatus(401)
  } else {
    next({ err })
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
  app.use(authGuardCatcher)
}
