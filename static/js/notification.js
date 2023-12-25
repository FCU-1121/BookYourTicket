

if(window.location.href.includes("system")){
    document.getElementsByClassName('left')[0].classList.remove('clicked')
    document.getElementsByClassName('right')[0].classList.add('clicked')
}else{
    document.getElementsByClassName('right')[0].classList.remove('clicked')
    document.getElementsByClassName('left')[0].classList.add('clicked')
}