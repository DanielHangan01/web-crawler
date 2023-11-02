function normalizeURL(urlString) {
    const myURL = new URL(urlString)
    const host = myURL.hostname
    let path = myURL.pathname
    if (path.length > 0 && path.slice(-1) === '/') {
        path = path.slice(0, -1)
    }
    return `${host}${path}`
}

module.exports = {
    normalizeURL
  }