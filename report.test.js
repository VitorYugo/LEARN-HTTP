const { sortPages } = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', () => {
    const input = {
        'https://www.youtube.com/about': 1,
        'https://www.youtube.com/': 3
    }
    const output = sortPages(input)
    const expected = [
        ['https://www.youtube.com/', 3],
        ['https://www.youtube.com/about', 1]
    ]
    expect(output).toEqual(expected)
})

test('sortPages 5', () => {
    const input = {
        'https://www.youtube.com/': 20,
        'https://www.youtube.com/about': 15,
        'https://www.youtube.com/videos': 10,
        'https://www.youtube.com/contact': 5,
        'https://www.youtube.com/login': 1
    }

    const output = sortPages(input)

    const expected = [
        ['https://www.youtube.com/', 20],
        ['https://www.youtube.com/about', 15],
        ['https://www.youtube.com/videos', 10],
        ['https://www.youtube.com/contact', 5],
        ['https://www.youtube.com/login', 1]
    ]

    expect(output).toEqual(expected)
})