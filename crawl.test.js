const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL', () => {
    const input = 'https://blog.boot.dev/path'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(output).toEqual(expected)
})

test('normalizeURLFinal', () => {
    const input = 'https://blog.boot.dev/path/'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(output).toEqual(expected)
})

test('normalizeURLCapital', () => {
    const input = 'https://blog.BOOT.dev/path/'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(output).toEqual(expected)
})

test('normalizeURLHTTP', () => {
    const input = 'https://blog.boot.dev/path/'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(output).toEqual(expected)
})

test('getURLsFromHTML', () => {
    const input =`
    <html>
        <body>
            <a href = "https://blog.boot.dev/path1/">
            Boot.dev Blog
            </a>
            <a href = "/path2/">
            Boot.dev Blog
            </a>
            <a href = "invalid">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const base = "https://blog.boot.dev"
    const output = getURLsFromHTML(input, base)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(output).toEqual(expected)
})

test('getURLsFromHTMLinvalid', () => {
    const input =`
    <html>
        <body>
            <a href = "invalid">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const base = "https://blog.boot.dev"
    const output = getURLsFromHTML(input, base)
    const expected = []
    expect(output).toEqual(expected)
})