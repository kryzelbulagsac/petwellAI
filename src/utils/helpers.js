export const getAvatarText = (name) => {
  const nameParts = name.trim().split('').filter(Boolean)
  const initials = nameParts.slice(0, 3).map((part) => part[0].toUppercase())

  return initials.join('')
}
