const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const token = require('./createtoken'); //외부 js파일 가져오기
const app = express();
const nunjucks = require('nunjucks')
const ctoken = require('./jwt')
const auth = require('./middleware/auth')

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static('public'))

app.get('/',(req,res)=>{ //main 페이지
    let {msg} = req.query;
    res.render('index')
});

app.get('/user/info',auth,(req,res)=>{
    res.send(`hello ${req.userid}`)
})

app.get('/menu1',(req,res)=>{ //sub 페이지
    console.log(req.cookies);
    res.send('menu1페이지입니다.')
})

app.post('/auth/local/login',(req,res)=>{
    let {userid,userpw} = req.body;
    console.log('body req : ',userid,userpw);
    let result = {};
    if(userid=='root' && userpw=='root'){
        //로그인 성공
        result = {
            result:true,
            msg:'로그인에 성공하셨습니다.'
        }

        let token = ctoken(userid)
        res.cookie('Accesstoken',token,{httpOnly:true,secure:true})

    } else {
        //로그인 실패
        result = {
            result:false,
            msg:'아이디와 패스워드를 확인해주세요.'
        }
    }
    res.json(result)
})

app.get('/login',(req,res)=>{
    let {id,pw} = req.query;    //비구조할당문 사용시 let,const 변수선언문이 반드시 필요
                                // 사용할 이유가 없다면 ()안으로 사용해야함
                             
   if(id=='root' && pw=='root'){
       //토큰 생성
       let createtoken = token();
       res.cookie('token',createtoken,{httpOnly:true,secure:true});
       res.redirect('/?msg=로그인성공')
   } else{
       //토큰 실패
       res.redirect('/?msg=로그인실패')
   }
})                         

app.listen(3000,()=>{
    console.log(`start server port 3000`)
});