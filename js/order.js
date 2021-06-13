$(document).ready(() => {
    var order = $("#order");
    var terms = $("#terms-container");
    var payment_method = $("#payment_method");
    var address = $("#address-container");
    var addAddress =$("#addAddress");
    var token = localStorage.getItem('tokenSession')
    var addressId = localStorage.getItem('tokenSession')
    var flag = false;



    payment_method.css({"display":"none"});
    terms.css({"display":"none"});
    order.click(() => {
        if (flag) {
            if ($("#terminos").is(":checked")) {
                if ($("#pago2").is(":checked")) {
                    if (token != null && addressId != null) {

                        createOrder(token, addressId, 2).then((response) => {

                        });
                    }
                } else {
                    alert("Selecciona un método de pago");
                }
            } else {
                alert("Primero debes aceptar los términos y condiciones");
                $("#terminos").focus()
            }
        }else{
            addAddress.css({"display":"none"})
            address.css({"display":"none"})
            payment_method.css({"display":"block"});
            order.text("Confirmar orden")
        }


    });


    //$("#compra").modal("show")

});


const createOrder = (token, addressId, paymentId) => {
    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/order',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "addressId": addressId, "paymentId": paymentId }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}