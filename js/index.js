const token = localStorage.getItem('tokenSession');

$(document).ready(() => {
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");
    var signup = $("#signup");
    var profile = $("#profile");
    var summary = $("#summary");
    var no_products = $("#no_products");

    var flag = false;

    if (token == null || token.length == 4) {
        profile.css({ "display": "none" });
        flag = false;
        summary.css({ "display": "none" });
        $("#cart_buttons").css({ "display": "none" });
    } else {
        flag = true
        no_products.css({ "display": "none" })
        getDataClient(token);
        signup.text("")
        logout.text("Cerrar Sesión");
        
    }

    logout.click(() => {
        if (flag) {
            closeSession(token).then((data) => {
                if (data) {
                    localStorage.removeItem('tokenSession');
                    user.val("")
                    email.val("")
                    alert("Haz cerrado sesión")
                    window.location.href = "./index.html"
                }
            });
        } else {
            window.location.href = "./login.html"
        }
    });

    signup.click(() => {
        if (!flag) {
            window.location.href = "./Crearcuenta.html"
        }
    });

})

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



