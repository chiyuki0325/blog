'use strict';
const bilicard_js = require('../source/cdn/bilicard.js')

const micromatch = require('micromatch');

function isMatch(path, patterns) { //From Hexo processor
    if (!patterns) return false;
    return micromatch.isMatch(path, patterns);
}

hexo.extend.tag.register("bilicard", async (args) => {
    return await bilicard_js(args[0]);
}, { async: true });

hexo.extend.filter.register('after_post_render', (data) => {
    //Hexo bilicard plugin,originally by MaxChang3, fixed by YidaozhanYa

    //生成 skipRenderList 数组，并包含配置文件中的 skip_render
    const skipRenderList = [
        '**/*.js',
        '**/*.css'
    ];

    var skip_render = hexo.config.skip_render;
    if (Array.isArray(skip_render)) {
        skipRenderList.push(...skip_render);
    } else if (typeof skip_render === 'string') {
        if (skip_render.length > 0) {
            skipRenderList.push(skip_render);
        }
    }

    //遍历 skipRenderList 并判断是否是跳过渲染的文件
    for (var regexp of skipRenderList) {
        if (isMatch(data.permalink, regexp)) {
            return data;
        }
    }

    data.content += '<link rel="stylesheet" href="/cdn/bilicard.css" type="text/css">';
    return data;
});
