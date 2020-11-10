/* eslint-disable prefer-promise-reject-errors */
const { getVideoMeta } = require('tiktok-scraper')
const { fetchJson } = require('../utils/fetcher')
const { promisify } = require('util')
const { instagram, twitter } = require('video-url-link')

const igGetInfo = promisify(instagram.getInfo)
const twtGetInfo = promisify(twitter.getInfo)

/**
 * Get Tiktok Metadata
 *
 * @param  {String} url
 */
const tiktok = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(async (result) => {
            console.log('Get Video From', '@' + result.authorMeta.name, 'ID:', result.id)
            if (result.videoUrlNoWaterMark) {
                result.url = result.videoUrlNoWaterMark
                result.NoWaterMark = true
            } else {
                result.url = result.videoUrl
                result.NoWaterMark = false
            }
            resolve(result)
        }).catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get Instagram Metadata
 *
 * @param  {String} url
 */
const insta = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    const uri = url.replace(/\?.*$/g, '')
    igGetInfo(uri, {})
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * Get Twitter Metadata
 *
 * @param  {String} url
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})


module.exports = {
    tiktok,
    insta,
    tweet,
}
