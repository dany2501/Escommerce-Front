$(document).ready(() => {
    var token = localStorage.getItem('tokenSession');
    var items = $("#items");
    var addressId = $("#addressId");

    var flag = false;


    document.querySelector('#items').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "delete") {
            deletePayment(token, action[1]).then((response) => {

                if (response != null) {
                    if (response.success) {
                        window.location.reload();
                    }
                }

            });
        }else if (action[0] === "address"){
            addressId.val(action[1]);
        }
    });

    getAddress(token).then((response) => {

        if (response != null) {
            if (response.success && response.address.length != 0) {
                console.log(response.address);
                $("#addresses-container").css({ "display": "block" });
                $("#address-container").css({ "display": "none" });
                $("#addNewAddress").css({ "display": "block" });
                var cont = "";
                response.address.forEach(element => {
                    var last = "";
                    element.lastName.forEach(e => {
                        last += " " + e;
                    });
                    cont += adrs(element.id, element.name + last, element.phone, element.street,element.suburb,element.extNum);
                    //$("#addressId").val(element.id);
                });
                items.html(cont);
            } else {
                $("#address-container").css({ "display": "block" });
                $("#addresses-container").css({ "display": "none" });
                $("#addNewAddress").css({ "display": "none" });
            }
        }

    });
    $("#addNewAddress").click(()=>{
        if(flag){
            flag=false;
            $("#addNewAddress").text("Agregar nueva dirección");
            $("#addresses-container").css({ "display": "block" });
            $("#address-container").css({ "display": "none" });
        }else{
            flag=true;
            $("#addNewAddress").text("Lista de direcciones");
            $("#addresses-container").css({ "display": "none" });
            $("#address-container").css({ "display": "block" });
        }

    });

    

});


const adrs = (id, name, phone, street,suburb,num) => {

    return (`
    <div class="direcciones" style="display:flex; justify-content:space-between; ">   
        <br>
        <label><input type="radio" name="address" id=address-${id}></label>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i> <b>${name}</b></li>
            <li><i class="fa fa-angle-right"></i> Telefono: <b>${phone}</b></li>
        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Calle : <b>${street} ${num}</b></li>
            <li><i class="icono fa fa-angle-right"></i>Delegación: <b>${suburb}</b></li>

        </ul>
        <br><br><br>
    </div><br><br>`);
}