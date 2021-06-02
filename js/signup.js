$(document).ready(() => {
    var button = $("#button");
    var email = $("#email");
    var password = $("#password");
    var confirmPass = $("#confirmPass");
    var name = $("#name")

    button.click(() => {
        e = email.val();
        p = password.val();
        conf = confirmPass.val()
        n = name.val()

        if (e != null && p != null && conf != null && n != null) {
            createAccount(e, p, conf, n).then(((data) => {
                if (data.success) {
                    localStorage.setItem('tokenSession', data.token)
                    window.location.href = ('./index.html')
                } else {
                    alert(data.error.message)
                    switch (data.error.code) {
                        case 4000:
                            password.val("")
                            confirmPass.val("")
                            break;
                        case 4002:
                            email.val("")
                            break;
                        default:
                            console.log("Other error")
                    }
                }
            }));
        }
        else {
            alert("Ingresa todo los campos")
        }

    });
})

const createAccount = (email, password, confirmPass, name) => {
    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/sign-up',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: { name: name, confirmPass: confirmPass, password: password, email: email },
        accepts: 'application/json',
        success: (data, status) => {
            console.log("response")
            return data;
        }
    })

}