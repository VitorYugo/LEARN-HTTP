const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    console.log(`active crawl: ${currentURL}`)

    try {
        const baseURLObj = new URL(baseURL)
        const currentURLObj = new URL(currentURL)

        if (baseURLObj.hostname !== currentURLObj.hostname) {
            return pages
        }

        const currentnormalizedURL = normalizeURL(currentURL)

        if (pages[currentnormalizedURL] > 0) {
            pages[currentnormalizedURL]++
            return pages
        }

        pages[currentnormalizedURL] = 1

        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`1 error in fetch in status code ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")

        if (!contentType || !contentType.includes("text/html")) {
            console.log(`2 error in fetch in status code ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            await crawlPage(baseURL, nextURL, pages)
        }
    }
    catch (err) {
        console.log(`invalid link ${err.message}`)
    }

    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []

    const dom = new JSDOM(htmlBody)

    const links = dom.window.document.querySelectorAll('a')

    for (const link of links) {
        if (link.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            }
            catch (error) {
                console.log(`${baseURL}${link.href} é invalido`)
            }
        }
        else {
            try {
                const urlObj = new URL(link.href)

                if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
                    urls.push(urlObj.href)
                }
            }
            catch (error) {
                console.log(`${link.href} é invalido`)
            }
        }
    }

    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)

    const hostpath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }

    return hostpath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}