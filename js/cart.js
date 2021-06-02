var cart = "";
var qtyProds = 0;
var toPay = 0;

$(document).ready(() => {

    var cartList = $("#cart-list");
    var qtyCart = $("#qty");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");
    var deleteProd = $("#delete");

    if (token == null || token.length == 4) {
        flag = false

    } else {
        flag = true
    }

    getCart(token).then((response) => {
        if (response.success && response.products != null && response.products != 0) {

            response.products.forEach(element => {
                qtyProds += element.qty
                toPay += parseInt(element.product.price) * parseInt(element.qty)
                cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image);
            });
            if (qtyProds > 1) {
                qtyTotal.text(qtyProds + " Artículos");
            } else {
                qtyTotal.text(qtyProds + " Artículo");
            }
            subtotal.text("Subtotal: $" + toPay + ".00")
            qtyCart.text(qtyProds)
            cartList.html(cart);
        } else {
            $("#cart_buttons").css({ "display": "none" })
        }
    });

    deleteProd.click(()=>{
        console.log("Delete")
        deleteCart(token).then((response)=>{
            if (response.success){
                alert("Carrito vaciado!")
                window.location.reload()
            }
        })
    });

});


const cardCart = (name, price, qty, img) => {
    finalPrice = parseInt(price) * parseInt(qty)
    return (`<div class="product-widget">
        <div class="product-img">
            <img src=${img} style="width:50; height:50;" alt="">
        </div>
        <div class="product-body">
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price"><span class="qty">${qty}x</span>$${finalPrice}.00</h4>
        </div>
        <button class="delete"><i class="fa fa-close"></i></button>
    </div>`)
}

const getCart = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/cart',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            console.log(data)
            return data;
        }
    });
}

const deleteCart = (token)=>{
    return $.ajax({
        method: "DELETE",
        url: 'http://localhost:5001/cart',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}