const crypto = require('crypto');

/*
header
{
    "alg": "HS256",
    "typ": "JWT"
  }

payload
{
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }

signature
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    
  your-256-bit-secret
  )

  1차 목표 header암호화
  0,1 -> 2진법 16진법과 친구다.
  */

function createtoken(){
  let header = {
        "alg": "HS256",
        "typ": "JWT"
  }
  let encodeheader = Buffer.from(JSON.stringify(header)).toString('base64'); // 안녕하세요-> 바이너리 데이터바꿈(16진수)


let payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "user": "godtttever",
    "iat": 1516239022
  }

  let encodedpayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace('==','');


  //어떤 암호화를 할거냐 (sha256)
  //암호화 규칙은 스트링으로 
  let signature = crypto.createHmac('sha256',Buffer.from('sangyub')).update(`${encodeheader}.${encodedpayload}`).digest('base64').replace('==','');



  //image도 텍스트로 이뤄져있다.
  //텍스트가 바이너리 형식이다.

  // 비트숫자가 같기때문에 표현하기 쉬워서 비트를 모름?

  return(`${encodeheader}.${encodedpayload}.${signature}`)
}

let token = createtoken();
console.log(token);
module.exports = createtoken;

  