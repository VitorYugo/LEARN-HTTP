 function normalizeURL(url){
    const urlObj = new URL(url)
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0, -1)
    }
    return hostpath
 }

 module.exports = {normalizeURL}