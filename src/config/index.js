import theme from '@/../config/theme/project.vars'

export default {
  server: process.env.NODE_ENV === 'development' ? '/api' : '/api',
  componentPrefix: 'cool-link',
  baiduMapAK: 'EmKZhKo8K79xQdWigE0G0Xc49tZpAZ4w',
  theme: {
    ...theme,
    color: theme.siteColor
  },
  dict: {
    key: 'definedCode',
    val: 'definedName'
  }
}
