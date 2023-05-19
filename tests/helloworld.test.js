import sayhello from "../utils/helloworld";
import assert from 'assert'

it ("should say hello", ()=> {
    const hello = sayhello();

    assert.equal(hello, "hello")
})