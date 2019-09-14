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


    constructor(elSelector, autoPlaySet, otherSettings) {
        let selectedEl = document.querySelectorAll(elSelector);
        selectedEl.forEach((el, i) => {
            el.style.visibility = 'hidden';
                if (undefined != autoPlaySet && true === autoPlaySet.autoPlay ){
                    this.createCarouselDiv(el, i, 
                        {
                            interval : undefined != autoPlaySet.autoPlayInverval ? autoPlaySet.autoPlayInverval : 2000,
                            auto : undefined != autoPlaySet.autoPlaySelector ? Array.from(document.querySelectorAll(autoPlaySet.autoPlaySelector)).includes(el) : true,
                        }
                        , otherSettings);
                }else{
                    this.createCarouselDiv(el, i, {}, otherSettings);
                }
              
            });
 
        window.addEventListener('resize', ()=>this.adjustOnResize(selectedEl));
    }

    /*
    * Initialize Carousels
    *
    *@param el  The element to turn into carousel
    *@param carouselNum  Carousel number
    *@param autoPlay  Autoplay options
	*@param param2 for future extension
    */
    createCarouselDiv(el, carouselNum, autoPlay, otherSettings) {

        let elWidth = el.offsetWidth;
        let elHeight = el.offsetHeight;
        let carouselImgs = Array.from(el.querySelectorAll('img'));

        carouselImgs.map(x=>x.style.display='none');
     
        let carouselDiv = document.createElement('div');
            carouselDiv.id = "ctc-carousel-" + carouselNum;
            carouselDiv.classList = 'ctcCarouselDiv';
            carouselDiv.style = `width:${elWidth}px;height:${elHeight}px;margin-left:auto;margin-right:auto;display:block`;

        let imgDiv = document.createElement('div');
            imgDiv.addEventListener('mouseenter',   event=> event.target.querySelectorAll("div").forEach(nav => nav.style.opacity ="1") );
            imgDiv.addEventListener('mouseleave',   event=> event.target.querySelectorAll("div").forEach(nav => nav.style.opacity ="0") );
            imgDiv.id = 'ctc-carousel-img-div-' + carouselNum;
            imgDiv.style = `box-shadow: 1px 1px 15px rgba(0,0,0,0.7);transition: 0.3s ease;background :rgba(0, 0 , 0, 0.8) url("") no-repeat center; background-size:contain;height:${elHeight}px;width:${elWidth}px;margin-left:-1px;color:rgba(255,255,255,1);text-align:center;`;

        carouselDiv.appendChild(imgDiv);
        el.appendChild(carouselDiv);
        this.loadImage(0,imgDiv,carouselImgs,carouselNum);

        if(0 !== autoPlay.length && true === autoPlay.auto){
            setInterval(() => imgDiv.querySelector('#next-img-'+carouselNum).click(), autoPlay.interval);
        } 
         el.style.visibility = '';   
    }

    /*
    * Load image on button click
    *
    *@param imgNum  Image number in gallery
    *@param imgDiv  Image div
    *@param imgGal  Array of images
	*@param carouselNum Carousel number
    */
    loadImage( imgNum,imgDiv,imgGal,carouselNum,){
        imgDiv.style.backgroundImage = `url('')`;  
        let loadedImg =  new Image();
        loadedImg.src = imgGal[imgNum].src;
         if(undefined != imgDiv.querySelector(`#img-loading-${carouselNum}`) ){
             imgDiv.removeChild(imgDiv.querySelector(`#img-loading-${carouselNum}`)) 
            }

         let loadingSpan = document.createElement('span');
            loadingSpan.id = `img-loading-${carouselNum}`;
            loadingSpan.style = `font-size:${0.015*imgDiv.offsetWidth}px;width:${0.05*imgDiv.offsetWidth}px;height:${0.07*imgDiv.offsetHeight}px;margin-top:${imgDiv.offsetHeight/2}px;text-align:center;display:inline-block;`; 
            loadingSpan.innerHTML =  `Loading<b>.</b>`;
            
         let loadingInt = setInterval( ()=>{
                switch(loadingSpan.innerHTML){
                    case 'LoadingM<b>.</b>':
                        loadingSpan.innerHTML = 'Loading<b>.</b>'
                      break;
                    case 'Loading<b>.</b>':
                        loadingSpan.innerHTML = 'Loading.<b>.</b>'
                      break;
                    case 'Loading.<b>.</b>':
                        loadingSpan.innerHTML = 'Loading..<b>.</b>'
                    break;
                    case 'Loading..<b>.</b>':
                        loadingSpan.innerHTML = 'Loading...<b>.</b>'
                    break;
                    case 'Loading...<b>.</b>':
                        loadingSpan.innerHTML = 'Loading<b>.</b>'
                    break;		
                    default:
                }
            },350);
            
        imgDiv.appendChild(loadingSpan);  
        
        loadedImg.addEventListener('load',event=>{
                                                    clearInterval(loadingInt);
                                                    if(undefined != loadingSpan){
                                                        imgDiv.removeChild(loadingSpan);
                                                    }
                                                    imgDiv.style.backgroundImage = `url('${imgGal[imgNum].src}')`;    
                                                    imgDiv.title = null !== imgGal[imgNum].getAttribute('title') ? imgGal[imgNum].getAttribute('title') :'';
                                                });  
                                                                                                                                                              
         this.navButton(imgNum,imgDiv,imgGal,carouselNum);                                       
    }

    /*
    * Create navigation button
    *
    *@param imgNum  Image number in gallery
    *@param imgDiv  Image div
    *@param gal  Array of images
	*@param carouselNum Carousel number
    */

    navButton(imgNum,imgDiv,gal,carouselNum){

        let elHeight = imgDiv.offsetHeight;
        let elWidth = imgDiv.offsetWidth;
        let prevImg =  0 === imgNum ? gal.length-1 : imgNum-1;
        let nextImg  =  gal.length-1 === imgNum ? 0 : imgNum+1;
        let navButtonWidth = 0.03 * elWidth  ;
        let navButtonHeight =  0.07*elWidth;

        let prevNav = document.createElement('div');
            prevNav.id = `carousel-${carouselNum}-prev`;
            prevNav.style = `height:${navButtonHeight}px;margin-top:${(elHeight -navButtonHeight)/2}px;float:left;color:rgba(0,0,0,0.7);display:flex;font-size:${0.08 * elWidth}px;width:${navButtonWidth}px;background-color:rgba(255, 255 , 255, 1);`;
         let prevSpan =  document.createElement('span');
             prevSpan.id = `prev-img-${carouselNum}`;
             prevSpan.style = `box-shadow: 1px 1px 15px rgba(0,0,0,0.7);width:${navButtonWidth}px;box-shadow: -1px 1px 5px rgba(255,255,255,0.7);cursor:pointer;color:rgba(0,0,0,0.8);text-shadow: -2px 2px 5px rgba(0,0,0,1); background :rgba(255, 255 , 255, 0.3) url("") no-repeat top; background-size:contain;`;
             prevSpan.title = 'Loading';      
             prevSpan.innerHTML = `&#8249;`;
             prevSpan.addEventListener('mouseenter',event=> event.target.style.textShadow ='-4px 4px 10px rgba(0,0,0,0.9 )') ;
             prevSpan.addEventListener('mouseleave',event=> event.target.style.textShadow ='-2px 2px 5px rgba(0,0,0,1)') ;
            let prevLoadInt = setInterval(()=>{
                prevSpan.innerHTML =   '' == prevSpan.innerHTML ? '&#8249;' : '';
             },500);

            let prevLoadImg = new Image();
                prevLoadImg.src = gal[prevImg].src;
                prevLoadImg.addEventListener('load',()=> {
                                                                prevSpan.style.backgroundImage = `url('${event.target.src}')`;
                                                                clearInterval(prevLoadInt);
                                                                prevSpan.innerHTML = '&#8249;';
                                                                prevSpan.title = null != gal[prevImg].getAttribute('title') ? gal[prevImg].getAttribute('title') :'Previous Image'; 
                                                            });     
             prevNav.appendChild(prevSpan);


        let  nextNav = document.createElement('div');
             nextNav.id = `carousel-${carouselNum}-next`;
             nextNav.style = `text-align:center;margin-right:1px;height:${navButtonHeight}px;float:right;margin-top:${(elHeight - navButtonHeight) / 2}px;margin-right:0px;color:rgba(0,0,0,0.7);display:flex; font-size:${0.08 * elWidth}px;width:${navButtonWidth}px;background-color:rgba(255, 255 , 255, 1);`;
        let nextSpan =  document.createElement('span');
            nextSpan.id = `next-img-${carouselNum}`;
            nextSpan.style = `width:${navButtonWidth}px;box-shadow: -1px 1px 5px rgba(255,255,255,0.7);cursor:pointer;color:rgba(0,0,0,0.8);text-shadow: -2px 2px 5px rgba(0,0,0,1);background :rgba(255, 255 , 255, 0.3) url("") no-repeat top; background-size:contain;`;
            nextSpan.title = 'Next Image';      
            nextSpan.innerHTML = `&#8250;`;
            nextSpan.addEventListener('mouseenter',event=> event.target.style.textShadow ='-4px 4px 10px rgba(0,0,0,0.9 )') ;
            nextSpan.addEventListener('mouseleave',event=> event.target.style.textShadow ='-2px 2px 5px rgba(0,0,0,1)') ;

        let nextLoadInt = setInterval(()=>{
            nextSpan.innerHTML =   '' == nextSpan.innerHTML ? '&#8250;' : '';
             },500);
    

        let nextLoadImg = new Image();
                    nextLoadImg.src = gal[nextImg].src;
        nextLoadImg.addEventListener('load',()=>{
                    nextSpan.style.backgroundImage = `url('${event.target.src}')` ;
                    clearInterval(nextLoadInt);
                    nextSpan.innerHTML = '&#8250;'; 
                    nextSpan.title = null != gal[nextImg].getAttribute('title') ? gal[nextImg].getAttribute('title') :'Next Image'; 
                  
                });    
            nextNav.appendChild(nextSpan);

            prevNav.addEventListener('click',event=>{
                imgDiv.removeChild(prevNav);
                imgDiv.removeChild(nextNav);
                this.loadImage( prevImg,imgDiv,gal,carouselNum)
            });

            nextNav.addEventListener('click',event=>{
                imgDiv.removeChild(nextNav);
                imgDiv.removeChild(prevNav);
                this.loadImage( nextImg,imgDiv,gal,carouselNum)
            });

       imgDiv.appendChild( prevNav);
       imgDiv.appendChild( nextNav);
    }

    /*
    * Adjust carousel on resize
    *
    *@param selectedEl  Selected image gallery
    */
    adjustOnResize(selectedEl){
        selectedEl.forEach((x,i)=>{
            let elWidth = x.offsetWidth;
            let elHeight = x.offsetHeight;
            let carouselDiv = x.querySelector(`#ctc-carousel-${i}`);
            let imgDiv  =  carouselDiv.querySelector(`#ctc-carousel-img-div-${i}`);
            let loadingEl = imgDiv.querySelector(`#img-loading-${i}`);
            let prevNav =  imgDiv.querySelector(`#carousel-${i}-prev`);
            let nextNav =  imgDiv.querySelector(`#carousel-${i}-next`);
            let prevSpan = prevNav.querySelector(`#prev-img-${i}`);
            let nextSpan = nextNav.querySelector(`#next-img-${i}`);
            let navButtonWidth = 0.03 * elWidth;
            let navButtonHeight =  0.07*elWidth;

            imgDiv.style.width = carouselDiv.style.width = `${elWidth}px`;
            imgDiv.style.height = carouselDiv.style.height = `${elHeight}px`;
            nextNav.style.width =  prevNav.style.width = prevSpan.style.width = nextSpan.style.width = `${navButtonWidth}px`;
            nextNav.style.height =  prevNav.style.height = `${navButtonHeight}px`;
            nextNav.style.marginTop =  prevNav.style.marginTop = `${(elHeight - navButtonHeight)/2}px`;
            nextNav.style.fontSize =  prevNav.style.fontSize = `${0.08*elWidth }px`;

            if(undefined !=  loadingEl){
                loadingEl.style = `font-size:${0.015*elWidth}px;width:${0.05*elWidth}px;height:${0.07*elHeight}px;margin-top:${elHeight/2}px;text-align:center;display:inline-block;`; 
               }

        });

    }
}