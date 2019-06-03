class ctcCarousel {


    constructor(elSelector, otherParam) {

        window.onload = () => {

            let selectedEl = document.querySelectorAll(elSelector);

            selectedEl.forEach((el, i) => {

                this.createCarouselDiv(el, i, otherParam);

            });

        }

    }

    //Create carousel div
    createCarouselDiv(el, carouselNum, otherParam) {

        let divImgs = '';
        let elWidth = el.offsetWidth;
        let elHeight = el.offsetHeight;
        var carouselImgs = el.querySelectorAll('img');


        let leftNav = document.createElement('div');
        leftNav.id = 'ctcCarouselLeftNav-' + carouselNum;
        leftNav.style = `margin-top:${ elHeight*0.35 }px;float:left;margin-left:-1px;margin-right:5px;px;color:rgba(0,0,0,0.7);display:inline-block;font-size:105px;width${ elWidth*0.03 }px;px;`;
        leftNav.innerHTML = '<span title="Previous" id= "leftNav-' + carouselNum + '" >&#8249;</span>';

        let rightNav = document.createElement('div');
        rightNav.id = 'ctcCarouselRightNav-' + carouselNum;
        rightNav.style = `margin-top:${ elHeight*0.35 }px;float:right;color:rgba(0,0,0,0.7);display:inline-block; font-size:105px;width:${ elWidth*0.03 }px;`;
        rightNav.innerHTML = '<span title="Next" id="rightNav-' + carouselNum + '" >&#8250;</span>';

        let carouselDiv = document.createElement('div');
        carouselDiv.id = "ctcCarouselDiv-" + carouselNum;
        carouselDiv.classList = 'ctcCarouselDiv';
        carouselDiv.style = `padding:2px;width:${ elWidth }px;height:${ elHeight }px;`;

        carouselImgs.forEach((img, i) => {

            if (i === 0) {

                let carouseLImgDiv = document.createElement('div');
                carouseLImgDiv.id = 'ctcCarouseLImgDiv-' + carouselNum;
                carouseLImgDiv.style = `box-shadow: 1px 1px 15px rgba(0,0,0,0.7);transition: width 0.5s;background :rgba(0, 0 , 0, 0.8) url("${ img.src }") no-repeat center; background-size:contain;display: inline-block;height:${ elHeight }px;width:${ elWidth * 0.93 }px;`;

                if (null !== img.getAttribute('title')) {
                    carouseLImgDiv.title = img.getAttribute('title');
                }

                carouselDiv.appendChild(leftNav);
                carouselDiv.appendChild(carouseLImgDiv);
                carouselDiv.appendChild(rightNav);


                let leftNavSpan = leftNav.getElementsByTagName('span')[0];
                leftNavSpan.style = `box-shadow: 1px 1px 5px rgba(0,0,0,0.7);cursor:pointer;transition: width 0.5s;color:rgba(255,255,255,1);text-shadow: 5px 5px 5px rgba(0,0,0,1); background :rgba(0, 0 , 0, 0.5) url("${carouselImgs[0].src}") no-repeat top; background-size:contain;`;
                leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (carouselImgs.length - 1) + ',' + (carouselImgs.length - 1) + ',' + carouselNum + ');');
                leftNavSpan.setAttribute('onmouseenter', "this.style.textShadow ='5px 5px 15px rgba(0,0,0,0.9)';");
                leftNavSpan.setAttribute('onmouseleave', "this.style.textShadow = '5px 5px 5px rgba(0,0,0,1)';");


                let rightNavSpan = rightNav.getElementsByTagName('span')[0];
                rightNavSpan.style = `box-shadow: -1px 1px 5px rgba(0,0,0,0.7);cursor:pointer;transition: width 0.5s;color:rgba(255,255,255,0.8);text-shadow: 5px 5px 5px rgba(0,0,0,1);background :rgba(0, 0 , 0, 0.5) url("${carouselImgs[carouselImgs.length - 1].src}") no-repeat top; background-size:contain;`;
                rightNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(1,' + (carouselImgs.length - 1) + ',' + carouselNum + ');');
                rightNavSpan.setAttribute('onmouseenter', 'this.style.textShadow="5px 5px 15px rgba(0,0,0,0.9)";');
                rightNavSpan.setAttribute('onmouseleave', "this.style.textShadow = '5px 5px 5px rgba(0,0,0,1)';");
            }

            img.setAttribute('data-carousel-' + carouselNum + '-img', i);
            img.style.display = 'none';
        });

        el.appendChild(carouselDiv);

        if (undefined != otherParam) {
            if (otherParam.autoPlay) {
                if (undefined != otherParam.autoPlayInverval) {
                    var interval = otherParam.autoPlayInverval;
                } else {
                    var interval = 2000;
                }
                if (undefined != otherParam.autoPlaySelector) {
                    let selectedEl = document.querySelectorAll(otherParam.autoPlaySelector);
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
                rightNavSpan.style.backgroundImage = `url("${ nextImgSrc}")`;
            } else {
                let nextImgSrc = document.querySelector('img[data-carousel-' + carouselNum + '-img = "' + (imgNum + 1) + '"]').src;
                rightNavSpan.style.backgroundImage = `url("${ nextImgSrc }")`;
            }

            leftNavSpan.setAttribute('onclick', 'ctcCarousel.setCarouselMainImg(' + (imgNum - 1) + ',' + imgCount + ',' + carouselNum + ');');
            leftNavSpan.style.backgroundImage = ` url("${ prevImgSrc }")`;

        }

        carouseLImgDiv.style.backgroundImage = ` url("${ newCarouselImg.src }")`;

        if (null !== newCarouselImg.getAttribute('title')) {
            carouseLImgDiv.title = newCarouselImg.getAttribute('title');
        }

    }




}