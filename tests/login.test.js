const fetch = require("node-fetch");

it("should get a login token",async ()=>{

let token = "";
const options = {
    method:"POST",
    Headers:{
        "content-Type":"application/json"
    },
    body:{
        "username":"josemachuca8@gmail.com",
        "password":"P@ssword1234"
    }
}

const response = await fetch ('https://dev.stedi.me/login',options);
expect (token.length).toBe(32);
token = await response.text();

expect(status).toBe(200);
expect(token.length).toBe(32);
})