$(document).ready(() => {
    var order = $("#order");
    var terms = $("#terms-container");
    var cartType = parseInt(localStorage.getItem('cartType'));
    var payment_method = $("#payment_method");
    var address = $("#address-container");
    var addAddress =$("#addAddress");
    var token = localStorage.getItem('tokenSession')
    var terminos = $("#terminos");
    var flag = false;
    var paymentId=$("#paymentId");
    var addressId = $("#addressId");
    terminos.css({"display":"none"})


    payment_method.css({"display":"none"});
    order.click(() => {
        if (flag) {
            if (terminos.is(":checked")) {
                createOrder(token,addressId.val(),paymentId.val(),cartType).then((response)=>{
                    if(response != null){
                        if(response.success){
                            $("#compra").modal("show");
                            $("#mensaje").text("Creada exitosamente");
                            $("#orderId").text("Id de seguimiento: "+response.orderId);
                            $("#arrival").text("Fecha estimada de llegada "+response.arrivalDate);
                            
                            window.setTimeout(function(){
                                window.location.href = "historial.html";
                        
                            }, 5000);
                        }else{
                            alert(response.error.message);
                            $("#mensaje").text("Ocurrio un error");
                            $("#orderId").css({"display":"none"})
                            $("#arrival").css({"display":"none"})
                            
                        }
                    }
                });
                //
            } else {
                alert("Primero debes aceptar los términos y condiciones");
                terminos.focus()
            }
        }else{
            if(addressId.val() !="" ){
                flag=true;
                addAddress.css({"display":"none"})
                address.css({"display":"none"})
                payment_method.css({"display":"block"});
                order.text("Confirmar orden");
                $("#changeShipping").css({"display":"none"});
                $("#titleShipping").css({"display":"none"});
                terminos.css({"display":"block"})
                
            }else{
                alert("Primero selecciona un método de envío");
            }

        }


    });


    //

});


const createOrder = (token, addressId, paymentId,cartType) => {
    console.log(addressId);
    console.log(paymentId);
    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/order',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "addressId": addressId, "paymentId": paymentId,"cartType":cartType}),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}