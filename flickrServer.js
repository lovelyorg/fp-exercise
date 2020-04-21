const http = require('http')
const https = require('https')

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const keyword = RegExp('[^/?keyword=].*').exec(req.url)
  if (keyword) {
    const rst = await httpsGet(
      `https://cn.bing.com/images/search?q=${keyword[0]}&go=Search&qs=ds&form=QBIR`
    )
    res.write(rst)
  }
  res.end()
})

server.listen(8000)

console.log('server on http://127.0.0.1:8000')

async function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        // console.log('statusCode:', res.statusCode)
        // console.log('headers:', res.headers)
        let rawData = ''
        res.on('data', (d) => {
          // process.stdout.write(d)
          rawData += d
        })
        res.on('end', () => {
          // console.log(rawData)
          resolve(rawData)
        })
      })
      .on('error', (e) => {
        console.error('on error', e)
        reject(e)
      })
  })
}
