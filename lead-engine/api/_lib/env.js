export function env(name, fallback) {
  const v = process.env[name]
  if (v === undefined || v === '') {
    if (fallback !== undefined) return fallback
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return v
}

export function optionalEnv(name) {
  const v = process.env[name]
  return v === undefined || v === '' ? null : v
}
