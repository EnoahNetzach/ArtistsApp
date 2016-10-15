const baseUri = document.location.hostname === 'localhost' ? '/' : '/artists-app/'

export default (uri = '') => `${baseUri}${uri}`
