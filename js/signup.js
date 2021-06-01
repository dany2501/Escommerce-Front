$(document).ready(()=>{
    var button = $("#button");
    var email = $("#email");
    var password = $("#password");
    var confirmPass = $("#confirmPass");
    var name = $("#name")

    button.click(()=>{
        createAccount(email.val(),password.val(),confirmPass.val(),name.val()).then(((data)=>{
            if (data){
                localStorage.setItem('tokenSession',data.token)
                window.location.replace('./index.html')
            }
        }));
    });
})

const createAccount=(email,password,confirmPass,name)=>{
    return $.ajax({
        method: "POST",
        url:'http://localhost:5001/sign-up',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*' },
        data:{name:name,confirmPass:confirmPass,password:password,email:email},
        accepts:'application/json',
        success:(data,status)=>{
            console.log("response")
            return data;
        }
    })

}