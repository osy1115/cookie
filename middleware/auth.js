require('dotenv').config();
const crypto = require('crypto');
const ctoken = require('../jwt');


module.exports = (req,res,next) => {
    let {Accesstoken} = req.cookies
    if(Accesstoken == undefined){
        res.redirect('/?msg=로그인을 해주세요')
        return 0;
    }


let [header,payload,sign] = Accesstoken.split('.');
let signature = getSignature(header,payload);
console.log(signature)

if(sign == signature){
    console.log('검증된 토큰입니다.')
    let {userid,exp} = JSON.parse(Buffer.from(payload,'base64').toString())
    console.log(userid)
    console.log(exp) // 토큰을 생성한 시간으로부터 두시간 뒤 시간을 저장한 변수
    let nexp = new Date().getTime();
    if(nexp > exp){
        //기간이 만료되었을때 처리영역
        res.clearCookie('Accesstoken');
        res.redirect('/?msg=토큰만료')
    }

    //모든 검증이 완료됨. 이쪽영역에서 db접속해서 최소사항
    req.userid = userid;
    next();
} else {
    res.redirect('/?msg=부적합토큰만료')
}
}

function getSignature(header,payload){
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                            .update(header+'.'+payload)
                            .digest('base64')        
                            .replace('=','')
                            .replace('==','')

    return signature;
}
