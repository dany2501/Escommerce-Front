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


    var items = document.querySelectorAll('.dir');

    items.forEach(element => {

        console.log(element)

    });

    document.querySelector('#payments').addEventListener('click', e => {
        console.log(e.target);
        action = e.target.id.split('-')
        console.log(action[0]);
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
            //$("#payment_method").css({ "display": "none" });
        } else {
            flag = true;
            choose.text("Ver lista")
            //$("#payment_method").css({ "display": "block" });
            $("#payments").css({ "display": "none" });
        }

    });


    getList(token).then((response) => {
        if (response != null) {
            if (response.success && response.payment.length != 0) {
                response.payment.forEach(element => {

                    //$("#payment_method").css({ "display": "none" });
                    card += payment(element.id, element.name, element.digits, element.month, element.year);
                });
                container.html(card);
            } else {

                $("#payment_detail").css({ "display": "block" });
                $("#choose").css({ "display": "none" });
                $("#title").css({ "display": "none" })
                container.css({ "display": "none" })
            }
        }
    });

});


const getList = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/payment',
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
        url: 'http://localhost:5001/payment',
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
    <div class="direcciones">
    <label><input type="radio"></label>
    <button class="delete2" id=delete-${id}><i class="fa fa-close" id=delete-${id}></i></button>
        <h3 class="titulo">Tarjeta</h3>
        <br>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i> Titular: ${name}</li>
            <li><i class="fa fa-angle-right"></i> Número de tarjeta: XXXX-XXXX-XXXX-${card}</li>
        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Mes de vencimiento: ${month}</li>
            <li><i class="icono fa fa-angle-right"></i>Año de vencimiento: ${year}</li>

        </ul>
        <br><br><br>


        <!--<a class="dir" id="selectdir" id=see-${id}> Seleccionar</a>-->
        


    </div><br><br>`);
}