/*
 * 
 * 
 * 
 * CTC Carousel JS
 *  Images  carousel library written in vanilla js
 * https://ujwolbastakoti.wordpress.com/
 * MIT license
 * 
 * 
 * 
 */

class ctcCarousel {


    constructor(elSelector, autoPlaySettings, otherSettings) {

        window.onload = () => {

            let selectedEl = document.querySelectorAll(elSelector);

            selectedEl.forEach((el, i) => {

                let currentOpacity = el.style.opacity;
                el.style.opacity = '0';
                this.createCarouselDiv(el, i, autoPlaySettings, otherSettings);

                if (null === currentOpacity || '0' === currentOpacity) {
                    el.style.opacity = '';
                } else {
                    el.style.opacity = currentOpacity;
                }
            });

        }

    }

    //Create carousel div
    createCarouselDiv(el, carouselNum, autoPlaySettings, otherSettings) {

        let divImgs = '';
        let elWidth = el.offsetWidth;
        let elHeight = el.offsetHeight;
        let navButtonWidth = elWidth * 0.03;
        let navButtonHeight = elHeight * 0.22;
        var carouselImgs = el.querySelectorAll('img');
        let fontSize = 58;

        if (navButtonWidth > 50) {
            navButtonWidth = 50;
        } else if (navButtonWidth < 50 && navButtonWidth > 20) {
            navButtonWidth = 30;

        } else if (navButtonWidth < 20) {
            navButtonWidth = 20;
        }

        if (navButtonHeight > 100) {
            navButtonHeight = 100;
            fontSize = 100;
        } else if (navButtonHeight < 100 && navButtonHeight > 50) {
            fontSize = 85;
            navButtonHeight = 80;
        } else if (navButtonHeight < 50) {
            navButtonHeight = 50;
            fontSize = 45;
        }

        let leftNav = document.createElement('div');
        leftNav.id = 'ctcCarouselLeftNav-' + carouselNum;

        leftNav.style = `height:${navButtonHeight}px;opacity:0;text-align:bottom;margin-top:${(elHeight -navButtonHeight)/2}px;float:left;color:rgba(0,0,0,0.7);display:flex;font-size:${fontSize}px;width${navButtonWidth}px;background-color:rgba(255, 255 , 255, 1);`;
        leftNav.innerHTML = '<span title="Previous" id= "leftNav-' + carouselNum + '" >&#8249;</span>';

        let rightNav = document.createElement('div');
        rightNav.id = 'ctcCarouselRightNav-' + carouselNum;
        rightNav.style = `height:${navButtonHeight}px;opacity:0;text-align:center;float:right;margin-top:${(elHeight - navButtonHeight) / 2}px;color:rgba(0,0,0,0.7);display:flex; font-size:${fontSize}px;width:${navButtonWidth}px;background-color:rgba(255, 255 , 255, 1);`;
        rightNav.innerHTML = '<span title="Next" id="rightNav-' + carouselNum + '" >&#8250;</span>';

        let carouselDiv = document.createElement('div');
        carouselDiv.id = "ctcCarouselDiv-" + carouselNum;
        carouselDiv.classList = 'ctcCarouselDiv';
        carouselDiv.style = `width:${elWidth}px;height:${elHeight}px;margin-left:auto;margin-right:auto;display:block`;

        carouselImgs.forEach((img, i) => {

            img.style.display = 'none';
            img.setAttribute('data-carousel-' + carouselNum + '-img', i);

            if (i === 0) {

                let carouseLImgDiv = document.createElement('div');
                carouseLImgDiv.id = 'ctcCarouseLImgDiv-' + carouselNum;
                carouseLImgDiv.style = `box-shadow: 1px 1px 15px rgba(0,0,0,0.7);transition: width 0.5s;background :rgba(0, 0 , 0, 0.8) url("${img.src}") no-repeat center; background-size:contain;height:${elHeight}px;width:${elWidth}px;`;
                carouseLImgDiv.setAttribute('onmouseenter', 'this.querySelectorAll("div").forEach(nav => nav.style.opacity ="1" )');
                carouseLImgDiv.setAttribute('onmouseleave', 'this.querySelectorAll("div").forEach(nav => nav.style.opacity ="0" )');

                if (null !== img.getAttribute('title')) {
                    carouseLImgDiv.title = img.getAttribute('title');
                }

                carouseLImgDiv.appendChild(leftNav);
                carouseLImgDiv.appendChild(rightNav);
                carouselDiv.appendChild(carouseLImgDiv);

                let leftNavSpan = leftNav.getElementsByTagName('span')[0];
                leftNavSpan.style = `width:${navButtonWidth}px;box-shadow: -1px 1px 5px rgba(255,255,255,0.7);cursor:pointer;color:rgba(0,0,0,0.8);text-shadow: -2px 2px 5px rgba(0,0,0,1); background :rgba(255, 255 , 255, 0.3) url("${carouselImgs[0].src}") no-repeat top; background-size:contain;`;
                leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (carouselImgs.length - 1) + ',' + (carouselImgs.length - 1) + ',' + carouselNum + ');');
                leftNavSpan.setAttribute('onmouseenter', "this.style.textShadow ='-4px 4px 10px rgba(0,0,0,0.9)';");
                leftNavSpan.setAttribute('onmouseleave', "this.style.textShadow = '-2px 2px 5px rgba(0,0,0,1)';");


                let rightNavSpan = rightNav.getElementsByTagName('span')[0];
                rightNavSpan.style = `width:${navButtonWidth}px;box-shadow: -1px 1px 5px rgba(255,255,255,0.7);cursor:pointer;color:rgba(0,0,0,0.8);text-shadow: -2px 2px 5px rgba(0,0,0,1);background :rgba(255, 255 , 255, 0.3) url("${carouselImgs[carouselImgs.length - 1].src}") no-repeat top; background-size:contain;`;
                rightNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(1,' + (carouselImgs.length - 1) + ',' + carouselNum + ');');
                rightNavSpan.setAttribute('onmouseenter', 'this.style.textShadow="-4px 4px 10px rgba(0,0,0,0.9)";');
                rightNavSpan.setAttribute('onmouseleave', "this.style.textShadow = '-2px 2px 5px rgba(0,0,0,1)';");
            }

        });



        if (undefined != autoPlaySettings) {

            if (autoPlaySettings.autoPlay) {
                if (undefined != autoPlaySettings.autoPlayInverval) {
                    var interval = autoPlaySettings.autoPlayInverval;
                } else {
                    var interval = 2000;
                }
                if (undefined != autoPlaySettings.autoPlaySelector) {
                    let selectedEl = document.querySelectorAll(autoPlaySettings.autoPlaySelector);
                    selectedEl.forEach((autoPlayEl) => {

                        if (autoPlayEl === el) {
                            setInterval(() => {
                                document.getElementById('rightNav-' + carouselNum).click();
                            }, interval);
                        }
                    });
                } else {
                    setInterval(() => {
                        document.getElementById('rightNav-' + carouselNum).click();
                    }, interval);
                }

            }

        }


        el.appendChild(carouselDiv);

    }


    static setCarouselMainImg(imgNum, imgCount, carouselNum) {

        let carouseLImgDiv = document.getElementById('ctcCarouseLImgDiv-' + carouselNum);
        let leftNavSpan = document.getElementById('leftNav-' + carouselNum);
        let rightNavSpan = document.getElementById('rightNav-' + carouselNum);

        if (imgNum === 0) {

            var newCarouselImg = document.querySelector('img[data-carousel-' + carouselNum + '-img = "0"]');
            let prevImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + imgCount + '"]').src;
            let nextImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "1"]').src

            rightNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(1,' + imgCount + ',' + carouselNum + ');');
            rightNavSpan.style.backgroundImage = ` url("${nextImgSrc}")`;

            leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + imgCount + ',' + imgCount + ',' + carouselNum + ');');
            leftNavSpan.style.backgroundImage = ` url("${prevImgSrc}")`;

        } else if (imgNum > imgCount) {
            var newCarouselImg = document.querySelector('img[data-carousel-' + carouselNum + '-img = "0"]');
            let prevImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + (imgCount - 1) + '"]').src;
            let nextImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "1"]').src;

            rightNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(1,' + imgCount + ',' + carouselNum + ');');
            rightNavSpan.style.backgroundImage = ` url("${nextImgSrc}")`;

            leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (imgCount - 1) + ',' + imgCount + ',' + carouselNum + ');');
            leftNavSpan.style.backgroundImage = ` url(${prevImgSrc})`;

        } else {
            var newCarouselImg = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + imgNum + '"]');
            let prevImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + (imgNum - 1) + '"]').src;


            rightNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (imgNum + 1) + ',' + imgCount + ',' + carouselNum + ');');
            if (imgNum === imgCount) {
                let nextImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "0"]').src;
                rightNavSpan.style.backgroundImage = `url("${nextImgSrc}")`;
            } else {
                let nextImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + (imgNum + 1) + '"]').src;
                rightNavSpan.style.backgroundImage = `url("${nextImgSrc}")`;
            }

            leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (imgNum - 1) + ',' + imgCount + ',' + carouselNum + ');');
            leftNavSpan.style.backgroundImage = ` url("${prevImgSrc}")`;

        }

        carouseLImgDiv.style.backgroundImage = ` url("${newCarouselImg.src}")`;


        if (null !== newCarouselImg.getAttribute('title')) {
            carouseLImgDiv.title = newCarouselImg.getAttribute('title');
        }

    }

}