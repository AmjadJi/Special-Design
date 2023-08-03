// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null){
document.documentElement.style.setProperty('--main--color',localStorage.getItem("color_option"));

        //Remove active class from all childrens 
        document.querySelectorAll(".colors-list li").forEach(element =>{

            element.classList.remove("active");

            //add active class on element with data-color === local storage item
            if (element.dataset.color === mainColors){

                // add active class
                element.classList.add("active")
            }

})}

let backgroundOption = true;

let backgroundInterval; 

// Check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")

// Check if random background local storage is not empty
if( backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){

        backgroundOption = true;
    }
    else{
        backgroundOption = false
    }

//  remove active class from all spans 
document.querySelectorAll(".random-backgrounds span").forEach(element => {

    element.classList.remove("active");
})

if (backgroundLocalItem === 'true'){
    
    document.querySelector(".random-backgrounds .yes").classList.add("active")
}else{
    document.querySelector(".random-backgrounds .no").classList.add("active")
}
}
// toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick=function(){

    // Toggle Class spin for rotation on slef
    this.classList.toggle("spin")

    // Toggle Class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open")
}


 //switch colors 
const colorsLi = document.querySelectorAll(".colors-list li")

// Loop on all list items 
colorsLi.forEach(li => {

    //click on every list items 
    li.addEventListener("click",(e) => {

        // set color on root 
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color);

        //Remove active class from all childrens 
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{

            element.classList.remove("active");
        })

        //add active class on self 
        e.target.classList.add("active");
    })
})



//switch random background
const randomBackEl = document.querySelectorAll(".random-backgrounds span")

// Loop on all list items 
randomBackEl.forEach(span => {

    //click on every list items 
    span.addEventListener("click",(e) => {

        //Remove active class from all childrens 
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{

            element.classList.remove("active");
        })

        //add active class on self 
        e.target.classList.add("active");

        if (e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizImgs();
            localStorage.setItem("background_option", true)
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false)
        }

    })
})



// toggle nav-bullets
const bullets = document.querySelector(".nav-bullets")

//hide and show bullets
const hideBullets = document.querySelectorAll(".bullets span")

let bulletsStorage = localStorage.getItem("bullet-option")

if (bulletsStorage !== null){
    
    hideBullets.forEach(span =>{

        span.classList.remove("active");
    })

    if(bulletsStorage === 'yes'){
        bullets.classList.remove("hide")
        document.querySelector(".bullets .yes").classList.add("active")
    }else{
        bullets.classList.add("hide")
        document.querySelector(".bullets .no").classList.add("active")
    }
}

// Loop on all list items 
hideBullets.forEach(span => {

    //click on every list items 
    span.addEventListener("click",(e) => {

        //Remove active class from all childrens 
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{

            element.classList.remove("active");
        })

        //add active class on self 
        e.target.classList.add("active");

        if (e.target.dataset.bullets === "yes"){
        bullets.classList.remove("hide")
        localStorage.setItem("bullet-option",'yes')
        }
        else{
            bullets.classList.add("hide")
            localStorage.setItem("bullet-option",'no')
        }

    })
})




// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")

// Get Array Of Imgs
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg"];




function randomizImgs (){

    if (backgroundOption === true){

        backgroundInterval = setInterval(()=>{

            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
        
            landingPage.style.backgroundImage = 'url("imgs/'+imgsArray[randomNumber]+'")'
        
        
        },5000);
    }

}
randomizImgs();


// select skills selector
let ourSkills = document.querySelector (".skills")

window.onscroll = function () {

    // skills offset top 
    // offsetTop = الطول فوق السكيلز سيكشن
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height 
    //offsetHehigt = طول السكيلز سيكشن
let skillsOuterheight = ourSkills.offsetHeight

// window height
// window.innerHeight = طول الصفحة دون احتساب شريط الادوات وما الى ذلك
let windowHeight = this.innerHeight

// window scrolltop
// window.pageYOFFset = تقيس عملية السكرول بالبكسلات
let windowScrollTop = this.pageYOffset


if (windowScrollTop > (skillsOffsetTop + skillsOuterheight - windowHeight - 190)){

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill =>{

        skill.style.width = skill.dataset.progress;

        
    });
}else {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill =>{

        skill.style.width = null;

        
    });
}


}

// create popup with the image

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img =>{


    img.addEventListener('click',(e) =>{

        // creat overlay element 
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className='popup-overlay';

        //append overlay to the body 
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement("div");

        // add class to the popup box 
        popupBox.className = 'popup-box'

        if(img.alt !== null){

            //create heading 
            let imgHeading = document.createElement("h3");

            // creat text for heading 
            let imgtext =document.createTextNode(img.alt);

            // append the text to the heading 
            imgHeading.appendChild(imgtext);

            // appened the heading to popup box 
            popupBox.appendChild(imgHeading);
        }

        //create the image 
        let popupImage= document.createElement("img")

        //set image source
        popupImage.src = img.src

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append popup box to body 
        document.body.appendChild(popupBox)

        // create the close span 
        let closeButton = document.createElement("span")

        // create the close button text 
        let closeButtonText = document.createTextNode("X");

        // append text to close button 
        closeButton.appendChild(closeButtonText);

        // add class to close button 
        closeButton.className= 'close-button';

        // add close button to the popup box
        popupBox.appendChild(closeButton)
    })
})

// close popup
document.addEventListener("click", (e) => {

    if(e.target.className == 'close-button'){

        // remove the current popup 
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
})

// Select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

// Select Links
const allLinks = document.querySelectorAll(".links a")


function scroll(elements){
elements.forEach(ele => {

    ele.addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'
        })
    })
})}

scroll(allBullets)
scroll(allLinks)

// reset button 
document.querySelector(".reset-options").onclick = function(){

    localStorage.clear();
    location.reload()
}

let toggleBtn = document.querySelector(".links-container i")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function(){

    tLinks.classList.toggle("show");
}

document.addEventListener("click", (e) => {

    

    if(e.target !== toggleBtn && e.target !== tLinks){

    if(tLinks.classList.contains("show")){

        tLinks.classList.toggle("show");

    }}
})


