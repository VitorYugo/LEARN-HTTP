 const {JSDOM} = require('jsdom')
 
 function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for (const link of links){
        if(link.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            }
            catch (error) {
                console.log(`${baseURL}${link.href} é invalido`)
            }
        } else {
            //absolute
            try{
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            }
            catch (error) {
                console.log(`${link.href} é invalido`)
            }
        }
    }
    return urls
 }
 
 function normalizeURL(url){
    const urlObj = new URL(url)
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0, -1)
    }
    return hostpath
 }

 module.exports = {normalizeURL, getURLsFromHTML}