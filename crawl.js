const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const myURL = new URL(urlString)
    const host = myURL.hostname
    let path = myURL.pathname
    if (path.length > 0 && path.slice(-1) === '/') {
        path = path.slice(0, -1)
    }
    return `${host}${path}`
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

async function crawlPage(currentURL) {
    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }