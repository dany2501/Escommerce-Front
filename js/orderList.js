$(document).ready(() => {

    var token = localStorage.getItem('tokenSession');
    var container = $("#orders");
    var card = "";
    getList(token).then((response) => {
        console.log(response);

        if (response != null) {
            if (response.success) {
                if (response.orders.length != 0) {

                    console.log(response);
                    response.orders.forEach(element => {
                        card += order(element.id, element.arrival, element.qty, element.total);

                    });
                    container.html(card);
                } else {

                    $("#title_order").text("Aún no hay ordenes :(")
                }
            }
        } else {
        }
    });

});


const getList = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/order',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

const order = (id, date, qty, amount) => {

    return (`
    <div class="direcciones">
					
        <h3 class="titulo">Orden</h3>
        <br>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i> Número de pedido: ${id}</li>
            <li><i class="fa fa-angle-right"></i> Llegada : ${date}</li>
            


        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>#Artículos:    ${qty}</li>
            <li><i class="icono fa fa-angle-right"></i>$Total: $${amount}.00</li>

        </ul>
        <br><br><br>


    </div> <br>`);
}


