import { Router } from 'express'
import path from 'path'

/*
 * This is for mocking avatar URLs.
 */

export function avatarController(app: Router) {
  app.get('/dummy-avatar', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/dummy-avatar.png'))
  })
}
