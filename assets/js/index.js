var 
    doms = {},
    indexes = [],
    navbar = null
;

async function onDocumentLoad() {
    doms['topbg'] = document.querySelector('.top-background');

    doms['topbg'].addEventListener('animationend', () => {
        for(let dom of document.querySelectorAll('.invisible')) {
            dom.classList.remove('invisible');
            dom.classList.add('loaded');
        }
    });

    document.querySelectorAll('.nav li a').forEach(e => {
        e.addEventListener('click', () => smoothScrollTo(e));
        indexes.push({
            e,
            target: document.querySelector( 
                e.getAttribute('target') 
            )
        });
    });
    
    document.body.onscroll = onScroll;

    navbar = document.getElementById('nav-main');
}

async function wait(ms) {
    const now = Date.now();
    while(Date.now() <= now + ms) {}
}

document.addEventListener("DOMContentLoaded", () => onDocumentLoad());

function smoothScrollTo(element) {
    const target = document.querySelector( 
        element.getAttribute('target') 
    );
    if(target) {
        window.scrollTo({
            top: target.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    }
}

function onScroll() {
    for(let i = 0; i < indexes.length; i++) {
        const obj = indexes[i];

        if(isLooking(obj.target)) {
            defineSelectedIndex(obj.e);
            break;
        }
    }
    if(window.scrollY <= 0) {
        navbar.classList.remove('bg');
    } else {
        navbar.classList.add('bg');
    }

    const toDisplay = document.body.getElementsByClassName("wdisplayed");

    for(let e of toDisplay) {
        if(canSee(e)) {
            e.classList.remove("wdisplayed");
            e.classList.add("displayed");
        }
    }
}

function defineSelectedIndex(obj) {
    for(let i = 0; i < indexes.length; i++) {
        const e = indexes[i];
        if(obj == e.e) {
            obj.setAttribute('class', 'selected');
            continue;
        }
        e.e.setAttribute('class', '');
    }
}

function isLooking(obj) {
    return window.scrollY >= obj.offsetTop - navbar.offsetHeight &&
    window.scrollY <= obj.offsetTop + obj.offsetHeight - navbar.offsetHeight;
}

function canSee(obj, offsetPercentage = 100) {
    return obj.offsetTop + percentage(obj.offsetHeight, offsetPercentage) >= window.scrollY + navbar.offsetHeight && 
    obj.offsetTop <= window.scrollY + window.innerHeight + navbar.offsetHeight;
}

function percentage(value, percentage) {
   return value * (percentage / 100);
}

function copyEmail() {
    const copyText = document.getElementById("tocopy");
    copyText.select();
    document.execCommand("copy");
}