async function getURL(url) {
    const response = await fetch(url)
    if (response.status !== 200) throw 'Error: ' + response.status
    return await response.json()
}