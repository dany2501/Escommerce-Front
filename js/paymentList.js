$(document).ready(() => {

    var token = localStorage.getItem('tokenSession');
    var container = $("#payments");
    var card = "";
    var choose = $("#choose");
    var flag = false;
    var paymentId = $("#paymentId");

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
                        window.location.reload();
                    }
                }

            });
        }else if (action[0] === "payment"){
            paymentId.val(action[1]);
        }
    });

    choose.click(() => {

        if (flag) {
            flag = false;
            choose.text("Agregar nueva tarjeta");
            $("#payments").css({ "display": "block" });
            //$("#payment_method").css({ "display": "none" });
        } else {
            flag = true;
            choose.text("Ver lista");
            //$("#payment_method").css({ "display": "block" });
            $("#payments").css({ "display": "none" });
        }

    });


    getList(token).then((response) => {
        if (response != null) {
            if (response.success && response.payment.length != 0) {
                hasCards = true;
                response.payment.forEach(element => {
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
    <div class="direcciones" style="display:flex; justify-content:space-between;">

        <label><input type="radio" name="payment" id=payment-${id}></label>
        <br>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i> Titular: ${name}</li>
            <li><i class="fa fa-angle-right"></i> N??mero de tarjeta: XXXX-XXXX-XXXX-${card}</li>
        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Mes de vencimiento: ${month}</li>
            <li><i class="icono fa fa-angle-right"></i>A??o de vencimiento: ${year}</li>

        </ul>
        <br><br><br>


        <!--<a class="dir" id="selectdir" id=see-${id}> Seleccionar</a>-->
        


    </div><br><br>`);
}