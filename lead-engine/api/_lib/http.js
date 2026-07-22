export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export function methodGuard(req, res, ...allowed) {
  if (!allowed.includes(req.method)) {
    json(res, 405, { error: `Method ${req.method} not allowed` })
    return false
  }
  return true
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
