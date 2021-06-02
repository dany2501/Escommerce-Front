$(document).ready(() => {
    var token = localStorage.getItem('tokenSession')
    var product = $("#order_products");
    var toPay = 0;
    var cart = "";
    var pedido = "";
    var cartList = $("#cart-list");
    var qtyCart = $("#qty");
    getCart(token).then((response) => {
        response.products.forEach(element => {
            toPay += parseInt(element.product.price) * parseInt(element.qty)
            cart += cardCart(element.product.name, element.product.price, element.qty,element.product.image);
            pedido += productCard(element.product.name, element.product.price, element.qty);
        });
        pedido += shippingCad(toPay)
        product.html(pedido);
        qtyCart.text(response.products.length)
        cartList.html(cart);
    });
});

const getCart = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/cart',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

const productCard = (name, price, qty) => {
    subPrice = parseInt(price) * parseInt(qty)
    return (`<div class="order-col">
                <div>${qty}x ${name}</div>
                <div>$${subPrice}.00</div>
            </div>`)
}

const shippingCad = (toPay) => {
    return (`<div class="order-col">
        <div>Costo de envío</div>
        <div>$90.00</div>
    </div>
        <div class="order-col">
            <div><strong>TOTAL</strong></div>
            <div><strong class="order-total">$${parseInt(toPay)+90}</strong></div>
        </div>`)
}

const cardCart = (name, price, qty, img) => {
    finalPrice = parseInt(price) * parseInt(qty)
    return (`<div class="product-widget">
        <div class="product-img">
            <img src=${img} alt="">
        </div>
        <div class="product-body">
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price"><span class="qty">${qty}x</span>$${finalPrice}.00</h4>
        </div>
        <button class="delete"><i class="fa fa-close"></i></button>
    </div>`)
}