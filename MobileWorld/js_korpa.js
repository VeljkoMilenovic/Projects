document.addEventListener('DOMContentLoaded', function() {
    let cartItems = document.querySelector('.cart-items');
    let totalElement = document.querySelector('.total');

    // Hvatanje informacija o proizvodima iz lokalnog skladišta
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Prikazivanje informacija na stranici
    cart.forEach(cartItem => {
        let cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `<img src="${cartItem.imgSrc}" style="max-width: 200px; max-height: 200px;"><hr>
                                - Proizvod: <em><b>${cartItem.name}</b></em><hr> - 
                                Cena uređaja: <b>${cartItem.price}€</b><hr> - 
                                Količina: <b>${cartItem.quantity}</b><hr> - 
                                Ukupno za plaćanje: <b><span id="ukupno">${cartItem.total}</span>€</b><hr>
                                <button class="button" onclick="removeFromCart(this, ${cartItem.total})">Ukloni iz korpe</button><hr><br>`;

        cartItems.appendChild(cartItemDiv);
    });

    // Prikazivanje ukupnog iznosa
    let allTotal = cart.reduce((sum, cartItem) => sum + cartItem.total, 0);
    totalElement.innerText = `Ukupno za plaćanje: ${allTotal}€`;
});


