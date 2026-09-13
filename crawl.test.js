const {normalizeURL} = require('./crawl.js')
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