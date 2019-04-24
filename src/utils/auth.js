export const AUTH_LEVEL = {
  NOT: 1 << 1,
  NORMAL: 1 << 2,
  STRICT: 1 << 3
}

export function isStrictAuth(authLevel) {
  return authLevel & AUTH_LEVEL.STRICT
}

export function isNotAuth(authLevel) {
  return authLevel & AUTH_LEVEL.NOT
}

export function isNotStrictAuth(authLevel) {
  return authLevel & ~AUTH_LEVEL.STRICT
}
