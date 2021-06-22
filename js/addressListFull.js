$(document).ready(() => {
    var token = localStorage.getItem('tokenSession');
    var items = $("#items");


    getAddress(token).then((response) => {

        if (response != null) {
            if (response.success && response.address.length != 0) {
                $("#addresses-container").css({ "display": "block" });
                $("#address-container").css({ "display": "none" });
                $("#addNewAddress").css({ "display": "block" });
                var cont = "";
                response.address.forEach(element => {
                    var last = "";
                    element.lastName.forEach(e => {
                        last += " " + e;
                    });
                    cont += adrs(element.id, element.name + last, element.phone, element.street);
                    $("#addressId").val(element.id);
                });
                items.html(cont);
            } else {
                $("#address-container").css({ "display": "block" });
                $("#addresses-container").css({ "display": "none" });
                $("#addNewAddress").css({ "display": "none" });
            }
        }

    });


});


const adrs = (id, name, phone, street) => {

    return (`
    <div class="direcciones" style="display:flex; justify-content:space-between; ">   
        <br>

        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i>${name}</li>
            <li><i class="fa fa-angle-right"></i> Telefono: ${phone}</li>
        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Calle : ${street}</li>
            <li><i class="icono fa fa-angle-right"></i>Año de vencimiento: ${street}</li>

        </ul>
        <br><br><br>



    </div>`);
}