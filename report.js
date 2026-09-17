function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}

function printReport(pages) {
    console.log("++++++++++++")
    console.log("report")
    const sortedpages = sortPages(pages)
    for (const sortedpage of sortedpages){
        const url = sortedpage[0]
        const hit = sortedpage[1]
        console.log(`found${hit} links to page: ${url}`)
    }
}

module.exports = {
    sortPages,
    printReport
}