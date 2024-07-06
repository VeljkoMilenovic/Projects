let allTotal =0;

function addToCart(element) {
    let glavniEl = element.closest('.col-lg-3');
    let price = parseInt(glavniEl.querySelector('.price').innerText);
    let name = glavniEl.querySelector('h3').innerText;
    let imgEl = glavniEl.querySelector('img');
    let quantity = parseInt(glavniEl.querySelector('input').value);
    let cartItems = document.querySelector('.cart-items');

    if (quantity > 0) {
        let total = price * quantity;
        allTotal += total;

        let cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `<img src="${imgEl.src}" style="max-width: 100px; max-height: 100px;"><hr>
                                - Proizvod: <em><b>${name}</b></em><hr> - 
                                Cena uređaja: <b>${price}€</b><hr> - 
                                Količina: <b>${quantity}</b><hr> - 
                                Ukupno za plaćanje: <b>${total}€</b><hr>
                                <button class="button" onclick="removeFromCart(this, ${total})">Ukloni iz korpe</button><hr><br>`;

        cartItems.appendChild(cartItemDiv);

        window.location.href = 'korpa.html';

        document.querySelector('.total').innerText = `Ukupno za plaćanje: ${allTotal}€`;
       
 
        let cartItem = { name, price, quantity, total, imgSrc: `imgs/${name.toLowerCase().replace(/\s/g, '-').replace(/\//g, '-')}.png` };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        alert('Odaberite količinu! ');
    }
 
} 
function removeFromCart(button, price) {

    let ukupnoElements = document.querySelectorAll('#ukupno');

    ukupnoElements.forEach(element => {

        allTotal += parseFloat(element.innerText);
    });
    let cartItems = document.querySelector('.cart-items');
    let removedItem = button.parentNode;
    cartItems.removeChild(removedItem);
    if (cartItems.children.length === 0) {
        document.querySelector('.cart-items').innerText = 'Korpa je prazna.';
    }
    console.log(allTotal);
    allTotal -= price;
    console.log(allTotal);
    document.querySelector('.total').innerText = `Ukupno za plaćanje: ${allTotal}€`;

    // Uklanjanje stavke iz lokalnog skladišta
    let itemName = removedItem.querySelector('em b').innerText;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    allTotal=0;
}


var telefoni = {
    iphone: [
        { slika: "imgs/iphone-15-pro-max,-256gb,-black-titanium.png", naslov: "iPhone 15 Pro Max, 256gb, Black Titanium", cena: "720€" },
        { slika: "imgs/iphone-15,-128gb,-black-titanium.png", naslov: "iPhone 15, 128GB, Black Titanium ", cena: "850€" },
        { slika: "imgs/iphone-14-pro-max-256gb,-deep-purple.png", naslov: "iPhone 14 Pro Max 256gb, Deep Purple", cena: "880€" },
        {slika: "imgs/iphone-13-pro,-128gb,-green.png", naslov: "iPhone 13 Pro, 128GB, Green", cena: "710€" }
    ],
    samsung: [
        { slika: "imgs/samsung-s23-ultra,-8-256gb,-white.png", naslov: "SAMSUNG S23 Ultra, 8/256gb, White", cena: "990€" },
        { slika: "imgs/samsung-galaxy-a54-5g,-8-256gb,-light-green.png", naslov: "Samsung Galaxy A54 5G, 8/256gb, Light Green", cena: "400€" },
        { slika: "imgs/samsung-galaxy-z-fold2-5g,-256gb,-mystic-bronze.png", naslov: "SAMSUNG Galaxy Z Fold2 5g, 256gb, Mystic Bronze", cena: "420€" },
        { slika: "imgs/samsung-galaxy-s23-plus-5g,-8-512gb,-phantom-black.png", naslov: "SAMSUNG Galaxy S23 Plus 5G, 8/512GB, Phantom Black", cena: "700€" },

    ],
    xiaomi: [
        { slika: "imgs/xiaomi-13,-8-256gb,-light-green.png", naslov: "XIAOMI 13, 8/256gb, Light Green", cena: "600€" },
        { slika: "imgs/xiaomi-13-lite,-8-256gb,-sky-blue.png", naslov: "XIAOMI 13 Lite, 8/256gb, Sky Blue", cena: "410€" },
        { slika: "imgs/xiaomi-13-pro,-12-512gb,-white.png", naslov: "XIAOMI 13 Pro, 12/512gb, White", cena: "1080€" },

    ],
    huawei: [
        { slika: "imgs/huawei-p60-pro,-8-256gb,-glass-black.png", naslov: "HUAWEI P60 Pro, 8/256gb, Glass Black", cena: "550€" },
        { slika: "imgs/huawei-mate-50-pro,-8-256gb,-silver.png", naslov: "HUAWEI Mate 50 Pro, 8/256gb, Silver ", cena: "905€" },
        { slika: "imgs/huawei-nova-9,-8-128gb,-blue.png", naslov: "HUAWEI Nova 9, 8/128gb, Blue", cena: "360€" },
        
    ],
    google: [
        { slika: "imgs/google-pixel-8-pro,-12-256gb,-blue.png", naslov: "GOOGLE Pixel 8 Pro, 12/256gb, Blue", cena: "999€" },
        { slika: "imgs/google-pixel-7-pro,-8-128gb,-snow-white.png", naslov: "GOOGLE Pixel 7 Pro, 8/128gb, Snow White", cena: "530€" },
        { slika: "imgs/google-pixel-7a,-8-256gb,-obsidian-black.png", naslov: "GOOGLE Pixel 7a, 8/256gb, Obsidian Black", cena: "510€" },
    ],
    honor: [
        { slika: "imgs/honor-magic5-lite,-8-256gb,-midnight-black.png", naslov: "HONOR Magic5 Lite, 8/256GB, Midnight Green", cena: "420€" },
        { slika: "imgs/honor-x8,-6-128gb,-midnight-black.png", naslov: "HONOR X8, 6/128gb, Midnight Black", cena: "240€" },
    ],
};

function updateModel() {
    var markaDropdown = document.getElementById("marka");
    var telefoniContainer = document.getElementById("telefoniContainer");

    
    telefoniContainer.innerHTML = "";

    var selectedMarka = markaDropdown.value;

   
    if (selectedMarka !== "0") {
        var modeli = telefoni[selectedMarka];
        for (var i = 0; i < modeli.length; i++) {
            var telefon = modeli[i];
            addPhoneCard(telefon);
        }
    }
    if(selectedMarka === "0"){
        document.getElementById("telefoni").style.display="block";
    }
    else{document.getElementById("telefoni").style.display="none";}
}

function addPhoneCard(telefon) {
    var telefoniContainer = document.getElementById("telefoniContainer");

    var phoneCardDiv = document.createElement("div");
    phoneCardDiv.className = "col-lg-3 phone-card";

    var goreDiv = document.createElement("div");
    goreDiv.className = "gore";

    var imgElement = document.createElement("img");
    imgElement.src = telefon.slika;
    imgElement.alt = telefon.naslov;

    var h3Element = document.createElement("h3");
    h3Element.textContent = telefon.naslov;

    var pElement = document.createElement("p");
    pElement.className = "price";
    pElement.textContent = telefon.cena;

    goreDiv.appendChild(imgElement);
    goreDiv.appendChild(h3Element);
    goreDiv.appendChild(pElement);

    var actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    var inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.name = "quantity";
    inputElement.value = "0";
    inputElement.min = "0";

    var buttonElement = document.createElement("button");
    buttonElement.textContent = "Dodaj u korpu";
    buttonElement.onclick = function () { addToCart(this); };

    actionsDiv.appendChild(inputElement);
    actionsDiv.appendChild(buttonElement);

    phoneCardDiv.appendChild(goreDiv);
    phoneCardDiv.appendChild(actionsDiv);

    telefoniContainer.appendChild(phoneCardDiv);
}


function searchPhones() {

    let searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    let phoneCards = document.querySelectorAll('.phone-card');

    
    phoneCards.forEach(card => {
        let phoneName = card.getAttribute('data-name').toLowerCase();
        let parentDiv = card.parentNode;
    
        if (phoneName.includes(searchTerm)) {
            parentDiv.style.display ="block";
        } else {
            parentDiv.style.display = 'none';
        }
    });
    
}


document.querySelector('.search-bar input').addEventListener('input', searchPhones);


/*function postaviVisinu() {
    $(".phone-card").each(function () {
        var slika = $(this).find(".gore").height();
        var opis = 550 - slika - 16;
        $(this).find(".actions").css("height", opis);
        $(this).find(".actions").css("align-items", "end");
    });
}*/

$(document).ready(postaviVisinu);

$(window).resize(function () {
    postaviVisinu();
    
})


