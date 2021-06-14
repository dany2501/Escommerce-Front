$(document).ready(() => {
    var order = $("#order");
    var terms = $("#terms-container");
    var payment_method = $("#payment_method");
    var address = $("#address-container");
    var addAddress =$("#addAddress");
    var token = localStorage.getItem('tokenSession')
    var terminos = $("#terminos");
    var flag = false;
    var paymentId=$("#paymentId");
    var addressId = $("#addressId");


    payment_method.css({"display":"none"});
    order.click(() => {
        if (flag) {
            if (terminos.is(":checked")) {
                createOrder(token,addressId.val(),paymentId.val()).then((response)=>{
                    console.log(response);
                    if(response != null){
                        if(response.success){
                            $("#compra").modal("show");
                            window.setTimeout(function(){
                                // Move to a new location or you can do something else
                                window.location.href = "index.html";
                        
                            }, 7000);
                        }else{
                            alert(response.error.message);
                        }
                    }
                });
                //
            } else {
                alert("Primero debes aceptar los términos y condiciones");
                terminos.focus()
            }
        }else{
            flag=true;
            addAddress.css({"display":"none"})
            address.css({"display":"none"})
            payment_method.css({"display":"block"});
            order.text("Confirmar orden")
        }


    });


    //

});


const createOrder = (token, addressId, paymentId) => {
    console.log(addressId);
    console.log(paymentId);
    return $.ajax({
        method: "POST",
        url: 'http://148.204.59.115:5001/order',
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