const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toBe(expected)
})

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toBe(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'http://blog.boot.dev/path/'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toBe(expected)
})

test('normalizeURL strip protocol', () => {
    const input = 'http://blog.boot.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toBe(expected)
})

test('normalizeURL capital letters', () => {
    const input = 'https://BLOG.boot.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(input)
    expect(actual).toBe(expected)
})

test('getURLsFromHTML absolute', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
        </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/']
    const actual = getURLsFromHTML(htmlBody, baseURL)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute with path', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/path/']
    const actual = getURLsFromHTML(htmlBody, baseURL)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/path/']
    const actual = getURLsFromHTML(htmlBody, baseURL)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple links', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev Path One</span></a>
            <a href="/path2/"><span>Go to Boot.dev Path Two</span></a>
            
        <body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    const actual = getURLsFromHTML(htmlBody, baseURL)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid URL', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="invalid"><span>Go to Boot.dev</span></a>
        </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const expected = []
    const actual = getURLsFromHTML(htmlBody, baseURL)
    expect(actual).toEqual(expected)
})
