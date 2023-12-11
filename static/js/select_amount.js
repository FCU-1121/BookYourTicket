let ticketAmounts = {
    "adult": 1,
    "child": 0,
    "senior": 0,
    "student": 0
};

let total = 1;


function updateTotal() {
    ticketAmounts = {
        "adult": parseInt($('#adult').text()),
        "child": parseInt($('#child').text()),
        "senior": parseInt($('#senior').text()),
        "student": parseInt($('#student').text())
    }

    total = 0;
    for(let i in ticketAmounts) {
        total += ticketAmounts[i];
    }

    $('#total').text(`總票數：${total}`);
}

function increment(ticketType) {
    if(total >= 5) {
        return;
    }
    const element = document.getElementById(ticketType);
    element.innerText = parseInt(element.innerText) + 1;
    updateTotal();
    if(total >= 5) {
        $('.increment').addClass('unenable');
    }
}

function decrement(ticketType) {
    const element = document.getElementById(ticketType);
    const count = parseInt(element.innerText);

    if (count > 0) {
        element.innerText = count - 1;
        updateTotal();
    }
    if(total < 5) {
        $('.increment').removeClass('unenable');
    }
}



/////////// CLICK EVENT ///////////

$('.amount-container').on('click', () => {
    $('.select-amount').addClass('is-active');
});


function amountOk() {

    if(total <= 0) {
        // console.log("OUOb");
        $('.alert-message').addClass('is-active');
        return;
    }

    $('.alert-message').removeClass('is-active');
    $('.select-amount').removeClass('is-active');
    let amountLiList = "";

    for(let i in ticketAmounts) {
        if(ticketAmounts[i] > 0) {
            amountLiList += `
                <li>
                    <img src="../static/icon/${i}.png" alt="${i}">
                    <div class="title">&times${ticketAmounts[i]}</div>
                </li>
                `
        }
    }

    $('.show-amount').html(amountLiList);
}

$('#adult').text(1)
updateTotal();
amountOk();


