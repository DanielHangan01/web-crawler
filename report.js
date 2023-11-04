function printReport(pages) {
    console.log('============================================')
    console.log('------------------REPORT--------------------')
    console.log('============================================')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const cnt = sortedPage[1]
        console.log(`Found ${cnt} internal links to ${url}`)
    }
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((pageA, pageB) => {
        return pageB[1] - pageA[1]
    })
    return pagesArray
}

module.exports = {
    printReport
}