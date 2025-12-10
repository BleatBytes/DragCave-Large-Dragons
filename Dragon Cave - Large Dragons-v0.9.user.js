// ==UserScript==
// @name         Dragon Cave - Large Dragons
// @namespace    https://github.com/BleatBytes/DragCave-Large-Dragons
// @version      v0.9
// @description  Makes dragons in Dragon Cave appear larger on their View page.
// @author       You
// @match        *://dragcave.net/view/*
// @icon         https://icons.duckduckgo.com/ip2/dragcave.net.ico
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/BleatBytes/DragCave-Large-Dragons/refs/heads/main/Dragon%20Cave%20-%20Large%20Dragons-v0.9.user.js
// @downloadURL    https://raw.githubusercontent.com/BleatBytes/DragCave-Large-Dragons/refs/heads/main/Dragon%20Cave%20-%20Large%20Dragons-v0.9.user.js
// ==/UserScript==

function DOMReady(func) {
    if (document.readyState !== 'loading') {
        func;
    } else {
        document.addEventListener('DOMContentLoaded', func);
    };
};

function calcAt(param){
    var $N = 2; // <- This is by how much you want to enlargen the images. By default ($N = 2), it makes images twice as big.
    let ele = document.querySelector("img[class='spr _6i_2']");
    let ret = ele.getAttribute(param);
    return ret * $N;
};

function bigs(){
    GM_addStyle(`
        img[class='spr _6i_2'] {
            width: ${calcAt("width")}px!important;
            height: ${calcAt("height")}px!important;
            image-rendering: crisp-edges;
        };
    `);
}

DOMReady(bigs());
