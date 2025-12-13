// ==UserScript==
// @name         Dragon Cave - Large Dragons
// @namespace    https://github.com/BleatBytes/DragCave-Large-Dragons
// @version      v1.1
// @description  Makes dragons in Dragon Cave appear larger on their View page, on a User's page, and on a user's Dragons page.
// @author       Valen
// @match        *://dragcave.net/view/*
// @match        *://dragcave.net/user/*
// @match        *://dragcave.net/dragons
// @match        *://dragcave.net/dragons/*
// @match        *://dragcave.net/group/*
// @icon         https://icons.duckduckgo.com/ip2/dragcave.net.ico
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/BleatBytes/DragCave-Large-Dragons/refs/heads/main/Dragon%20Cave%20-%20Large%20Dragons-v0.9.user.js
// @downloadURL    https://raw.githubusercontent.com/BleatBytes/DragCave-Large-Dragons/refs/heads/main/Dragon%20Cave%20-%20Large%20Dragons-v0.9.user.js
// ==/UserScript==

function viewBig($N = 2){ // $N <- This is by how much you want to enlargen the images. E.g. $N = 2 makes images twice as big.
    const calcAt = function($N, param){
        let ele = document.querySelector('img[class="spr _6i_2"]');
        let ret = ele.getAttribute(param);
        return ret * $N;
    };

    let growthCheck = document.querySelector("._6i_0 section > p").textContent.match(/(will die)/);
    var tinyBabies = true; // <- Makes eggs and hatchlings appear small on View pages. Turn to "false" if you want them to look big too! Note that frozen hatchlings will get big anyways.

    if ((growthCheck && (tinyBabies == false)) || !growthCheck){
        GM_addStyle(`
        img[class='spr _6i_2'] {
            width: ${calcAt($N, "width")}px!important;
            height: ${calcAt($N, "height")}px!important;
            image-rendering: crisp-edges;
        };
    `);
    };
};

function listBig($N = 2){
    let imgs;
    if (location.href.match(/\/(dragons)$/) || location.href.match(/\/(dragons)\S+/)) {
        imgs = document.querySelectorAll("#dragonlist img[class='_11_2']");
    } else if (location.href.match(/\/(user)\S+/)) {
        imgs = document.querySelectorAll("._1l_0 img[class='_11_2']");
    } else if (location.href.match(/\/(group)\S+/)) {
        imgs = document.querySelectorAll("#udragonlist img[class='_11_2']");
    };

    let w;
    let h;
    var tinyBabies = true; // <- Makes eggs and hatchlings appear small on Dragons and User pages. Turn to "false" if you want them to look big too! Note that frozen hatchlings will get big anyways.

    for(var i=0; i < imgs.length; i++){
        let ele = imgs[i];

        w = ele.getAttribute('width');
        h = ele.getAttribute('height');

        if (!w || !h){
            let newImg = new Image();
            newImg.onload = function(){
                const imageWidth = this.width;
                const imageHeight = this.height;
                newImg.src = ele.src;
                w = newImg.width;
                h = newImg.height;
                if (tinyBabies == true) {
                    ele.setAttribute('width', w);
                    ele.setAttribute('height', h);
                } else {
                    ele.setAttribute('width', w * $N);
                    ele.setAttribute('height', h * $N);
                };
            };
        } else {
            ele.setAttribute('width', w * $N);
            ele.setAttribute('height', h * $N);
        };
    };

    GM_addStyle(`
        #dragonlist img[class='_11_2'], ._1l_0 img[class='_11_2'], #udragonlist img[class='_11_2']{
            image-rendering: crisp-edges;
        };
    `);
};


const exec = function() {
    if (location.href.match(/\/(dragons)$/) || location.href.match(/\/(dragons)\S+/) || location.href.match(/\/(user)\S+/) || location.href.match(/\/(group)\S+/)) {
        if (document.readyState !== 'loading') {
            listBig();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                listBig();
            });
        };
    } else if (location.href.match(/\/(view)\S+/)){
        if (document.readyState !== 'loading') {
            viewBig();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                viewBig();
            });
        };
    };
}();
