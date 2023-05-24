const fetch = require("node-fetch");

it("Should get a login token",async ()=>{

    let token = "";
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "userName":"josemachuca8@gmail.com",
            "password":"P@ssword1234"
        })

    }

    const response = await fetch("https://dev.stedi.me/login",options);

    token = await response.text();
    console.log("Token "+token);



    expect(token.length).toBe(36);

})