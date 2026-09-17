const { crawlPage } = require('./crawl.js')
const { prinReport } = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log("no website found")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("too many arguments")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    const pages = await crawlPage(baseURL, baseURL, {})

    console.log("starting crawl")

    printReport(pages)
}

main()