$(document).ready(() => {

    var token = localStorage.getItem('tokenSession');
    var container = $("#payments");
    var card = "";
    var choose = $("#choose");
    var flag = false;

    if (token != null && token.length != 4) {
    } else {
        container.css({ "display": "none" })
    }

    document.querySelector('#payments').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "delete") {
            deletePayment(token, action[1]).then((response) => {

                if (response != null) {
                    if (response.success) {
                        alert("Tarjeta eliminada");
                        window.location.reload();
                    }
                }

            });
        }
    });

    choose.click(() => {

        if (flag) {
            flag = false;
            choose.text("Agregar nueva tarjeta");
            $("#payments").css({ "display": "block" });
            $("#payment_method").css({ "display": "none" });
        } else {
            flag = true;
            choose.text("Ver lista");
            $("#payment_method").css({ "display": "block" });
            $("#payment_detail").css({ "display": "block" });
            $("#payments").css({ "display": "none" });
        }

    });


    getList(token).then((response) => {
        if (response != null) {
            if (response.success && response.payment.length != 0) {
                hasCards = true;
                response.payment.forEach(element => {                    
                    $("#payment_detail").css({ "display": "none" });
                    $("#addPayment").css({ "display": "none" });
                    card += payment(element.id, element.name, element.digits, element.month, element.year);
                });
                container.html(card);
            } else {
                $("#payment_detail").css({ "display": "block" });
                $("#choose").css({ "display": "none" });
                $("#title").css({ "display": "none" });
                container.css({ "display": "none" });

            }
        }
    });

});


const getList = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}
const deletePayment = (token, paymentId) => {
    return $.ajax({
        method: "DELETE",
        url: 'http://143.244.156.198:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ paymentId: paymentId }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

const payment = (id, name, card, month, year) => {

    return (`
    <div class="direcciones" style="display:flex; justify-content:space-between; flex-direction:row;">
        <br>

        <button class="delete2" id=delete-${id}><i class="fa fa-close" id=delete-${id}></i></button>
        <div style="flex-direction:row">
            <ul class="lista-datos" >
                <li><i class="fa fa-angle-right"></i> Titular: <b>${name}</b></li>
                <li><i class="fa fa-angle-right"></i> Número de tarjeta: <b>XXXX-XXXX-XXXX-${card}</b></li>
            </ul>
        </div>
        <div style="flex-direction:row">
            <ul class="lista-datos">
                <li><i class="icono fa fa-angle-right"></i>Mes vencimiento: <b>${month}</b></li>
                <li><i class="icono fa fa-angle-right"></i>Año vencimiento: <b>${year}</b></li>
            </ul>
        </div>
        <br><br><br>
        <!--<a class="dir" id="selectdir" id=see-${id}> Seleccionar</a>-->
    </div><br><br>`);
}