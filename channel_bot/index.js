import { By, Builder, Browser, Key, until } from 'selenium-webdriver'
import escapeHTML from 'escape-html'

const SITE = 'blog.chyk.ink'
const { BOT_TOKEN, CHANNEL_CHAT_ID, STEL_IVS, STEL_SSID, STEL_TOKEN } =
    process.env
const { URL_TO_PROCESS } = process.env

const Message = (() => {
    const FORMAT_CHAR = String.fromCharCode(27)
    const ALL_OFF = `${FORMAT_CHAR}[0m`
    const BOLD = `${FORMAT_CHAR}[1m`
    const BLUE = `${BOLD}${FORMAT_CHAR}[34m`
    const GREEN = `${BOLD}${FORMAT_CHAR}[32m`
    const RED = `${BOLD}${FORMAT_CHAR}[31m`
    const YELLOW = `${BOLD}${FORMAT_CHAR}[33m`
    return {
        plain: (message) => console.log(`${BOLD}   ${message}${ALL_OFF}`),
        msg: (message) =>
            console.log(`${GREEN}==>${ALL_OFF}${BOLD} ${message}${ALL_OFF}`),
        msg2: (message) =>
            console.log(`${BLUE} ->${ALL_OFF}${BOLD} ${message}${ALL_OFF}`),
        warning: (message) =>
            console.log(
                `${YELLOW}==> WARNING:${ALL_OFF}${BOLD} ${message}${ALL_OFF}`
            ),
        error: (message) =>
            console.log(
                `${RED}==> ERROR:${ALL_OFF}${BOLD} ${message}${ALL_OFF}`
            )
    }
})()

const sendHTMLMessageToChannel = async (messageText) => {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHANNEL_CHAT_ID,
            text: messageText,
            parse_mode: 'HTML'
        })
    })
}

const sleep = async (ms) =>
    await new Promise((resolve) => setTimeout(resolve, ms))

const main = async () => {
    const driver = new Builder().forBrowser(Browser.CHROME).build()
    await driver.manage().window().maximize()

    Message.msg('正在爬取博文信息...')
    await driver.get(URL_TO_PROCESS)
    await sleep(1000)

    const pageTitle = await driver.executeScript(() =>
        document.querySelector('.article-title').innerText.trim()
    )
    Message.msg2('文章标题: ' + pageTitle)

    const summary = await driver.executeScript(() => {
        const articleContent = document.querySelector('article > div')
        if (document.querySelectorAll('span#more').length > 0) {
            let summary = ''
            let el = articleContent.firstChild
            while (
                el &&
                !(el.tagName?.toLowerCase() == 'span' && el.id == 'more')
            ) {
                summary += el.innerText + '\n'
                el = el.nextSibling
            }
            summary = summary.replace('\nundefined', '').trim()
            return summary
        } else {
            return (
                articleContent.innerText
                    .slice(0, 150)
                    .replaceAll('\n\n', '\n') + '...'
            )
        }
    })
    Message.msg2('文章摘要: ' + summary)

    Message.msg(`正在生成 ${URL_TO_PROCESS} 的链接预览...`)

    Message.msg('正在登录 Telegram Instant View...')
    await driver.get('https://instantview.telegram.org/docs/')
    for (const cookie of [
        { name: 'stel_ivs', value: STEL_IVS },
        { name: 'stel_ssid', value: STEL_SSID },
        { name: 'stel_token', value: STEL_TOKEN }
    ]) {
        await driver.manage().addCookie(cookie)
    }

    Message.msg('正在打开网页...')
    await driver.get(
        `https://instantview.telegram.org/my/${SITE}/?url=${encodeURIComponent(URL_TO_PROCESS)}`
    )
    try {
        await driver
            .findElement(By.className('popup'))
            .findElement(By.css('section'))
        // 存在
        Message.error('token 已经失效。')
        process.exitCode = 1
        return
    } catch (e) {}

    const statusWrap = await driver.findElement(By.id('status-wrap'))
    await driver.wait(
        until.elementTextIs(statusWrap, 'Instant View successfully generated')
    )
    const shareURLButton = await driver.findElement(By.id('url-share'))
    const shareURL = decodeURIComponent(
        new URLSearchParams(
            new URL(await shareURLButton.getAttribute('href')).search
        ).get('url')
    )
    Message.msg('获取到 Instant Preview URL: ' + shareURL)

    await driver.executeScript(() =>
        document.querySelector('#url-mark-btn').click()
    )
    await sleep(500)
    Message.msg2('成功登记更改。')

    await driver.quit()

    Message.msg('正在发送 Telegram 消息...')
    const messageText = `<a href="${shareURL}"><strong>${escapeHTML(pageTitle)}</strong></a>

${escapeHTML(summary)}

${URL_TO_PROCESS}

#博客`

    try {
        await sendHTMLMessageToChannel(messageText)
    } catch (e) {
        if (e.code == 'UND_ERR_CONNECT_TIMEOUT')
            await sendHTMLMessageToChannel(messageText)
    }

    Message.msg('推送完成。')
}

main()
