$(document).ready(() => {

    var add = $("#addAddress")
    var token = localStorage.getItem('tokenSession');
    var shipping = $("#changeShipping");

    var flag = false;

    $("#addressId").css({ "display": "none" })
    $("#titleShipping").css({ "display": "none" })
    getAddress(token).then((response) => {
        if (response != null) {

            if (response.success) {
                var address = response.address
                if (address != null && address!= "") {
                    localStorage.setItem('addressId', address.id)
                    //$("#addressId").val(address.id);
                    $("#name").val(address.name);
                    $("#lastName").val(address.lastName);
                    $("#street").val(address.street);
                    $("#extNum").val(address.extNum);
                    $("#city").val(address.city);
                    $("#suburb").val(address.suburb);
                    $("#zipCode").val(address.zipCode);
                    $("#phone").val(address.phone);

                } else {
                    add.text("Agregar tarjeta");
                }
            }
        }
    });

    shipping.click(() => {
        if (!flag) {
            var ptp = $("#price_to_pay");
            var price = parseInt(ptp.text().split("$")[1].split(".")[0])-90
            ptp.text("$"+price+".00");
            $("#addNewAddress").css({"display":"none"});
            $("#addresses-container").css({"display":"none"});
            flag = true;
            $("#addressId").val(0);
            $("#address-container").css({ "display": "none" });
            $("#titleShipping").css({ "display": "block" });
            $("#shipping_price").css({"display":"none"});
            shipping.text("Dirección de envío")
        } else {
            var ptp = $("#price_to_pay");
            var price = parseInt(ptp.text().split("$")[1].split(".")[0])+90
            ptp.text("$"+price+".00");
            flag = false;
            $("#shipping_price").css({"display":"block"});
            $("#addNewAddress").css({"display":"block"});
            //$("#addresses-container").css({"display":"block"});
            $("#address-container").css({ "display": "block" });
            $("#titleShipping").css({ "display": "none" });

            shipping.text("Entrega en Escom")
        }

    });
    add.click(() => {
        var name = $("#name").val();
        var lastName = $("#lastName").val();
        var street = $("#street").val();
        var extNum = $("#extNum").val();
        var city = $("#city").val();
        var suburb = $("#suburb").val();
        var zipCode = $("#zipCode").val();
        var phone = $("#phone").val();
        var notes = $("#notes").val();
        if (name != "" && lastName != "" && street != "" && extNum != "" && city != "" && suburb != "" && zipCode != "" && phone != "") {

            address(name + " " + lastName, street, extNum, city, suburb, zipCode, phone, token).then((response) => {
                $('#agregart').modal('show');
                if (response != null) {

                    if (response.success) {
                        $("#title").text("Confirmación")
                        $("#msg").text("La dirección de envío ha sido agregado correctamente");
                        add.text("Modificar")
                        window.location.reload()
                    } else {

                        if (response.error.code == 1002) {
                            $("#zipCode").val("");
                            $("#zipCode").focus();

                        }
                        $("#title").text("Lo sentimos :( ")
                        $("#msg").text(response.error.message);
                    }

                } else {
                    $("#title").text("Lo sentimos :( ")
                    $("#msg").text("No se pudo guardar la dirección de envío. Intenta más tarde")
                }

            })
        } else {
            alert("Ingresa los datos correspondientes")
        }
    });


});

const address = (name, street, extNum, city, suburb, zipCode, phone, token) => {

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/address',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({
            "name": name,
            "street": street,
            "extNum": extNum,
            "city": city,
            "suburb": suburb,
            "zipCode": zipCode,
            "phone": phone
        }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });

}

const getAddress = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/address',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

