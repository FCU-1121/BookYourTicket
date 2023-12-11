const sendDetails = data => {
    console.log(data)
    fetch('/myTickets/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderID: data })
        })
        .then(response => response.text())
        .then(htmlContent => {
            document.body.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

if(window.location.href.includes("unpaid")){
    document.getElementsByClassName('left')[0].classList.remove('clicked')
    document.getElementsByClassName('right')[0].classList.add('clicked')
}else{
    document.getElementsByClassName('right')[0].classList.remove('clicked')
    document.getElementsByClassName('left')[0].classList.add('clicked')
}