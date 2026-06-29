const NEED_BG_VERSION = 17 // minimum version of bg script we need

let bgPage = null
let boxes = {}
let tab_ins = {}

// section elements
let sec_color_boxes = null
let sec_color_history = null
let sec_content = null

// palettes
let sec_color_palette = null
let span_palette_name = null

// plus
let badge = null

// cpicker elements
let cpicker = null
let cpicker_input = null

ready(init) // call init when ready

/**
 * Call function when document is ready
 *
 * @param {function} fn function to call when document is ready
 */
function ready(fn) {
    if (document.readyState != 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

/**
 * Init of all things needed in popup
 */
function init() {
    console.group('popup init')
    console.info('document ready')

    initTabs()
    initExternalLinks()

    console.info('getting background page')
    // No bg page in MV3
    gotBgPage(null);

    console.groupEnd('popup init')

    sec_content = document.getElementById('content')
    sec_color_boxes = document.getElementById('color-boxes')
    sec_color_history = document.getElementById('color-history')
}

/**
 * Workaround around wrong output from color library
 *
 * FIXME: fix directly in library later
 *
 */
function hslFixed(hsl_html) {
    const parts = hsl_html.split(/[,)]/)
    return `${parts[0]},${parts[1]}%,${parts[2]}%)`
}

async function initPlus() {
    
}

/**
 * Init links on tabs
 */
function initTabs() {
    for (let n of document.getElementsByClassName('ed-tab')) {
        n.onclick = () => {
            switchTab(n.id)
        }
    }

    for (let n of document.getElementsByClassName('ed-tab-in')) {
        tab_ins[n.id] = n
    }

    console.info('tabs initialized')
}

/**
 * Init function which activates external links.
 *
 * External link is one with class set to 'ed-external' and data-url
 * attribute present.
 *
 * Because we are using this from popup, we can't use simple
 * href attribute, we will create new tab with help of chrome api.
 */

function initExternalLink(n) {
    if (n.dataset.url) {
        n.onclick = () => {
            chrome.tabs.create({
                url: n.dataset.url,
            })
        }
    }
}
function initExternalLinks() {
    for (let n of document.getElementsByClassName('ed-external')) {
        initExternalLink(n)
    }
    console.info('external links initialized')
}

/**
 * Callback - second phase of popup initialization after we got
 * connection to background page
 *
 * @param {object} backgroundPage remote object for background page
 */
function gotBgPage(backgroundPage) {
    // No more bg page in MV3
    bgPageReady();
}

async function getCurrentTabAsync() {
    return (await chrome.tabs.query({
        active: true,
    }))[0];
}

async function bgPageReady() {
    // init pick button with selected tab
    const tab = await getCurrentTabAsync();
    if (!tab) { return; }

    initPickButton(tab);

    initColorBoxes()
    initColorHistory()
    initPlus()
}

/**
 * Add Pick Button with enabled or disabled state and appropriate message
 *
 */
function pickButton(tab, enabled, message = '') {
    let pick_el = document.getElementById('pick')
    if (enabled) {
        pick_el.onclick = async () => {
            await sendMesssageWithResAsync("useTab", {
                params: [tab],
            });
            await sendMesssageWithResAsync("activate");
            window.close()
        }
    } else {
        let message_el = document.getElementById('pick-message')
        message_el.innerHTML = `<h3 class="normal">&#128542; Whoops. Can't pick from this page</h3><p class="lh-copy">${message}</p>`
        message_el.style.display = 'block'
        pick_el.style.display = 'none'
    }
}

/**
 * Callback - Init pick button if it is possible
 *
 * We need to check if we are not on one of special pages:
 * - protocol starts with 'chrome'
 * - chrome webstore
 * - local page
 *
 */
function initPickButton(tab) {
    let pickEnabled = true
    let message = ''

    // special chrome pages
    if (tab.url === undefined || tab.url.indexOf('chrome') == 0) {
        pickButton(
            tab,
            false,
            "Chrome doesn't allow <i>extensions</i> to play with special Chrome pages like this one. <pre>chrome://...</pre>",
        )
    }
    // chrome gallery
    else if (tab.url.indexOf('https://chrome.google.com/webstore') == 0) {
        pickButton(tab, false, "Chrome doesn't allow its <i>extensions</i> to play on Web Store.")
    }
    // local pages
    else if (tab.url.indexOf('file') === 0) {
        chrome.extension.isAllowedFileSchemeAccess((isAllowedAccess) => {
            if (isAllowedAccess) {
                pickButton(tab, true)
            } else {
                pickButton(
                    tab,
                    false,
                    '<strong>Eye Dropper</strong> can\'t access local pages unless you grant it the permission. Check <a href="#" id="link-help-file-urls" data-url="https://eyedropper.test/help/file-urls">the instructions how to allow it</a>.',
                )
                initExternalLink(document.getElementById('link-help-file-urls'))
            }
        })
    } else {
        pickButton(tab, true)
    }
}

function initColorBoxes() {
    boxes = {
        current: document.getElementById('box-current'),
        new: document.getElementById('box-new'),
    }

    drawColorBoxes()
}

function sendMesssageWithResAsync(op, msg) {
    msg ??= {};
    msg.op = op;

    return new Promise(r => {
        chrome.runtime.sendMessage(msg, r);
    });
}

async function drawColorBoxes() {
    colorBox('current', await sendMesssageWithResAsync("getColor"));
    colorBox('new', await sendMesssageWithResAsync("getColor"));
}

async function clearPalette() {
    const palleteName = await sendMesssageWithResAsync("getPaletteName");

    mscConfirm({
        title: 'Wipe It?',
        subtitle: `Really clear palette ${palleteName}?`,
        okText: 'Yes, Wipe It!',
        cancelText: 'No',
        onOk: () => {
            console.info('Clearing color history')
            chrome.runtime.sendMessage(
                {
                    type: 'clear-history',
                },
                () => {
                    console.info('History cleared')
                    drawColorHistory()
                    drawColorBoxes()
                },
            )
        },
    })
}

function destroyPalette(palette_name) {
    mscConfirm({
        title: `Destroy Palette '${palette_name}'?`,
        subtitle: `Really destroy palette ${palette_name}?`,
        okText: 'Yes, Destroy It!',
        cancelText: 'No',
        onOk: async () => {
            const palName = await sendMesssageWithResAsync("getPaletteName");
            let destroying_current = palette_name === palName;
            await sendMesssageWithResAsync("destroyPalette", {
                params: [palette_name]
            });
            if (destroying_current) {
                switchColorPalette('default')
            } else {
                drawColorPalettes()
            }
        },
    })
}

async function drawColorHistory() {
    console.info('Drawing color history')
    // find element for colors history squares and instructions
    let history_el = document.getElementById('colors-history')
    let instructions_el = document.getElementById('colors-history-instructions')
    let toolbar_el = document.getElementById('colors-history-toolbar')

    let history_tool_noempty_els = document.getElementsByClassName('eb-history-tool-noempty')

    // first load history from palette and assemble html
    let html = ''
    let palette = await sendMesssageWithResAsync("getPalette");
    for (let color of palette.colors) {
        html += colorSquare(color.h)
    }
    history_el.innerHTML = html

    // attach javascript onmouseover and onclick events
    for (let n of document.getElementsByClassName('colors-history-square')) {
        n.onmouseover = () => {
            colorBox('new', n.dataset.color)
        }

        n.onclick = async () => {
            colorBox('current', n.dataset.color)
            await sendMesssageWithResAsync("setColor", {
                params: [n.dataset.color, false],
            });
            changeColorPicker(n.dataset.color)
        }
    }

    if (palette.colors.length > 0) {
        instructions_el.innerHTML = 'Hover over squares to preview.'
        for (n of history_tool_noempty_els) {
            n.style.display = ''
        }
    } else {
        instructions_el.innerHTML = 'History is empty, try to pick some colors first.'
        for (n of history_tool_noempty_els) {
            n.style.display = 'none'
        }
    }

    history_el.onmouseenter = () => {
        instructions_el.innerHTML = 'Click on square to select and copy to clipboard.'
    }
    history_el.onmouseleave = () => {
        instructions_el.innerHTML = 'Hover over squares to preview..'
    }
}

function initColorHistory() {
    drawColorHistory()

    // attach events to history buttons
    document.getElementById('colors-history-clear').onclick = () => {
        clearPalette()
    }

    // export colors history
    document.getElementById('colors-history-export').onclick = () => {
        exportHistory()
    }

    // color palette switching
    drawColorPaletteSwitching()
}

function drawColorPaletteSwitching() {
    let colors_palette_change = document.getElementById('colors-palette-change')

    sec_color_palette = document.getElementById('colors-palette')
    span_palette_name = document.getElementById('palette-name')

    colors_palette_change.onclick = () => {
        sec_color_palette.style.display =
            sec_color_palette.style.display === 'none' ? 'inline-block' : 'none'
    }

    drawColorPalettes()
}

async function drawColorPalettes() {
    let palettes =
        '<a href="#" class="dib link dim ph2 ml1 white bg-dark-green br1 b--dark-green mb1" id="new-palette">new</a>'

    let palette_name = await sendMesssageWithResAsync("getPaletteName");

    // change palette name in popup display and set data-palette attribute
    span_palette_name.innerHTML = palette_name
    span_palette_name.dataset.palette = palette_name

    const paletteNames = await sendMesssageWithResAsync("getPaletteNames");
    for (let palette of paletteNames) {
        palettes += `<span class="nowrap dib"><a href="#" class="ed-palette dib link dim pl2 pr1 ml1 white bg-light-purple br1 b--light-purple mb1" data-palette="${palette}">${palette}`

        let colors = (await sendMesssageWithResAsync("getPalette", {
            params: [palette],
        })).colors.length

        if (colors > 0) {
            palettes += `<span class="dib pink pl1">${colors}</span>`
        }

        if (palette !== 'default') {
            palettes += `
                <a class="ed-palette-destroy link dib w1 hint--top hint--no-animate hint--rounded" aria-label="Destroy Palette ${palette}!" data-palette="${palette}" href="#">
                <svg class="dim v-mid" viewBox="0 0 1792 1792" style="fill:gray;width:14px;">
                <use xlink:href="/img/icons.svg#fa-ban">
                </svg>
                </a>`
        }
        palettes += '</a></span>'
    }

    sec_color_palette.innerHTML = palettes

    // Support for palette click
    for (let n of document.getElementsByClassName('ed-palette')) {
        n.onclick = () => {
            let palette = n.dataset.palette
            console.info(`Asked to switch to palette ${palette}`)
            if (palette !== palette_name) {
                switchColorPalette(palette)
            }
        }
    }

    // Support for palete destroy click
    for (let n of document.getElementsByClassName('ed-palette-destroy')) {
        n.onclick = () => {
            let palette = n.dataset.palette
            console.info(`Asked to destroy palette ${palette}`)
            destroyPalette(palette)
        }
    }

    document.getElementById('new-palette').onclick = () => {
        mscPrompt({
            title: 'Name the Color Palette',
            // subtitle: "No worries, you can rename it any time.",
            okText: 'Create Palette',
            cancelText: 'Cancel',
            placeholder: 'palette',
            onOk: (name) => {
                createColorPalette(name)
            },
        })
    }
}

async function createColorPalette(name) {
    if (name !== null) {
        const pallette = await sendMesssageWithResAsync("createPalette", {
            params: [name,]
        });
        switchColorPalette(pallette.name)
    }
}

async function switchToDefaultPalette() {
    switchColorPalette(await sendMesssageWithResAsync("defaultPalette"));
}

async function switchColorPalette(palette) {
    console.info(`Switching to palette ${palette}`)
    await sendMesssageWithResAsync("changePalette", {
        params: [palette],
    });
    console.info('Redrawing history and boxes')
    drawColorPalettes()
    drawColorHistory()
}

async function exportHistory() {
    const pallette = await sendMesssageWithResAsync("getPalette");
    let history = pallette.colors
    let csv = ''

    const plus = await sendMesssageWithResAsync("plus");
    const colorSrc = await sendMesssageWithResAsync("color_sources");
    if (plus) {
        csv += '"RGB Hex","Date","Source","RGB Hex3","HSL","RGB","HTML Keyword"'
        csv += '\n'

        for (let color of history) {
            let d = typeof color.t === 'function' ? new Date(color.t()) : new Date(color.t)
            let datestring = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
                '0' + d.getDate()
            ).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${(
                '0' + d.getSeconds()
            ).slice(-2)}`

            csv += `"${color.h}","${datestring}","${colorSrc[color.s]}"`
            // FIXME: add name ,"${color.n}"

            color = pusher.color(color.h)
            let formats = [
                color.hex3(),
                hslFixed(color.html('hsl')),
                color.html('rgb'),
                color.html('keyword'),
            ]
            for (let format of formats) {
                csv += `,"${format}"`
            }
            csv += '\n'
        }
    } else {
        csv += '"RGB Hex","RGB Hex3","HSL","RGB","HTML Keyword"'
        csv += '\n'

        for (let color of history) {
            let d = typeof color.t === 'function' ? new Date(color.t()) : new Date(color.t)
            let datestring = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
                '0' + d.getDate()
            ).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${(
                '0' + d.getSeconds()
            ).slice(-2)}`

            csv += `"${color.h}"`

            color = pusher.color(color.h)
            let formats = [
                color.hex3(),
                hslFixed(color.html('hsl')),
                color.html('rgb'),
                color.html('keyword'),
            ]
            for (let format of formats) {
                csv += `,"${format}"`
            }
            csv += '\n'
        }
    }

    let data = 'data:text/csv;base64,' + btoa(csv)

    console.group('csvExport')
    console.log(csv)
    console.groupEnd('csvExport')

    let link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', 'export.csv')
    link.click()
}

/**
 * Handle tab switching
 *
 * TODO: handle ajax loading
 * TODO: handle pamatovani si jestli uz je nacteny nebo ne
 *
 * FIXME: change to something sane and not so ugly
 *
 * @param {string} tabId id of tab to switch to
 *
 */
function switchTab(tabId) {
    // on button-about hide history and color boxes
    if (tabId === 'button-about') {
        sec_color_boxes.style.display = 'none'
        sec_color_history.style.display = 'none'

        // display them on others
    } else {
        sec_color_boxes.style.display = 'block'
        sec_color_history.style.display = 'block'
    }

    // color picker tab
    if (cpicker) {
        cpicker.destroy()
    }

    for (let tab_id in tab_ins) {
        if (
            (tab_id.match(/-active$/) && tab_id !== `${tabId}-active`) ||
            (tab_id.match(/-link$/) && tab_id === `${tabId}-link`)
        ) {
            tab_ins[tab_id].style.display = 'none'
        } else {
            tab_ins[tab_id].style.display = 'inline-block'
        }
    }

    loadTab(tabId)
}

function loadTab(tabId) {
    console.group('tabSwitch')
    let content_found = false
    for (let n of document.getElementsByClassName('content-page')) {
        console.info(`found tab content ${n.id}`)
        if (n.id === `${tabId}-content`) {
            n.style.display = 'block'
            content_found = true
            console.info(`Found content for ${n.id}, switching.`)
        } else {
            n.style.display = 'none'
            console.info(`Hiding content for tab ${n.id}`)
        }
    }

    if (!content_found) {
        console.info('XMLHttp: No content found, loading through AJAX')
        let request = new XMLHttpRequest()
        request.open('GET', `/${tabId}.html`)

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                sec_content.insertAdjacentHTML('afterend', request.responseText)

                initExternalLinks()
                if (tabId === 'tab-cp') {
                    loadColorPicker()
                }
            } else {
                console.error(`Error loading ${tab.id} content through AJAX: ${request.status}`)
            }
        }

        request.send()
    } else {
        // color picker tab
        if (tabId === 'tab-cp') {
            showColorPicker()
        }
    }
    console.groupEnd('tabSwitch')
}

function colorBox(type, color) {
    if (boxes[type]) {
        color = pusher.color(color)

        let formats = [
            color.hex6(),
            color.hex3(),
            color.html('keyword'),
            hslFixed(color.html('hsl')),
            color.html('rgb'),
        ]

        let html = ''
        for (let value of formats) {
            html += `<span class="mr1 bg-white br1 ph1 mb1 dib"><code>${value}</code></span>`
        }
        boxes[type].innerHTML = html

        boxes[type].style = `background: ${color.hex6()}`
    }
}

function colorSquare(color) {
    return `<div class="fl dib dim mr1 br1 mb1 ba b--gray colors-history-square" data-color="${color}" style="background-color: ${color}">&nbsp;</div>`
}

function loadColorPicker() {
    let cpicker_script = document.createElement('script')
    cpicker_script.onload = async () => {
        console.info('Showing cpicker')
        cpicker_input = document.getElementById('colorpicker-input')

        const color = await sendMesssageWithResAsync("getColor");
        cpicker_input.value = color;

        showColorPicker()
    }
    cpicker_script.src = '/inc/color-picker/color-picker.js'
    document.head.appendChild(cpicker_script)

    document.getElementById('colorpicker-select').onclick = async () => {
        let color = cpicker.target.value.toLowerCase()
        colorBox('current', color)
        await sendMesssageWithResAsync("setColor", {
            params: [color, true, 2],
        });
        drawColorHistory()
    }
}

function showColorPicker() {
    // create new cpicker instance
    cpicker = new CP(cpicker_input)

    // function to update color in picker and color box on cp change
    function update(cpicker_color) {
        colorBox('new', `#${cpicker_color}`)
        cpicker.target.value = `#${cpicker_color}`
    }

    // attach to update function
    cpicker.on('start', update)
    cpicker.on('drag', update)

    // move color picker panel from 'body' to 'colorpicker' element
    cpicker.on('enter', () => {
        document.getElementById('colorpicker').appendChild(cpicker.picker)
    })

    // we need to update picker also when playing with input field
    // we need try/catch because when hand editing input field, color can be
    // invalid and pusher library can't handle wrong syntax
    function update_from_input() {
        try {
            let color = cpicker.target.value.toLowerCase()
            colorBox('new', color)
            cpicker.set(color)
        } catch (err) { }
    }

    cpicker.target.onkeyup = update_from_input
    cpicker.target.oncut = update_from_input
    cpicker.target.onpaste = update_from_input
    cpicker.target.oninput = update_from_input

    // display cpicker
    cpicker.enter()
}

function changeColorPicker(color) {
    if (cpicker) {
        cpicker.target.value = color
        cpicker.set(color)
    }
}
