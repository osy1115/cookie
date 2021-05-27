const express = require('express');
const cookieParser = require('cookie-parser')
const token = require('./createtoken'); //외부 js파일 가져오기
const app = express();

app.use(cookieParser());

app.get('/',(req,res)=>{ //main 페이지
    let {msg} = req.query;
    res.send(`${msg} hello world!<a href="/menu1">menu1</a><a href="/login?id=root&pw=root">로그인</a>`);
});

app.get('/menu1',(req,res)=>{ //sub 페이지
    console.log(req.cookies);
    res.send('menu1페이지입니다.')
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