$(document).ready(() => {
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");

    var qtyCart = $("#qty");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");
    var profile = $("#profile");
    var flag = false;
    token = localStorage.getItem('tokenSession');

    if (token == null || token.length == 4) {
        profile.css({"display":"none"})
        flag = false

    } else {
        flag = true
        getDataClient(token).then((data) => {
        });
        logout.text("Cerrar Sesión");
        var cart = "";
        var qtyProds = 0;
        var toPay = 0;
        getCart(token).then((response) => {
            response.products.forEach(element => {
                qtyProds += element.qty
                toPay +=parseInt(element.product.price)*parseInt(element.qty)
                cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image);
            });
            if (qtyProds > 1) {
                qtyTotal.text(qtyProds + " Artículos");
            } else {
                qtyTotal.text(qtyProds + " Artículo");
            }
            subtotal.text("Subtotal: $" + toPay + " .00")
            qtyCart.text(response.products.length)
            cartList.html(cart);
        });
    }

    logout.click(() => {
        if (flag) {
            closeSession(token).then((data) => {
                if (data) {
                    localStorage.removeItem('tokenSession');
                    user.val("")
                    email.val("")
                    alert("Haz cerrado sesión")
                    window.location.href="./index.html"
                }
            });
        } else {
            window.location.href="./login.html"
        }
    });

})

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

const addToCart = (token, productId, qty) => {
    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/cart',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: { productId: productId, qty: qty },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

const closeSession = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/logout',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            if (data) {
                return data;
            }
        }
    })
}

const getDataClient = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/login',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            client = data.client
            user.append(data.client.name)
            email.append(data.client.email)
            return data;
        }
    });
}


