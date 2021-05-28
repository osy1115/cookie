document.addEventListener('DOMContentLoaded',init);
function init(){
    const loginbtn = document.querySelector('#loginbtn');
    const layerPopup = document.querySelector('.layerPopup')
    const locallogin = document.querySelector('#locallogin')
    loginbtn.addEventListener('click',loginbtnFn)
    layerPopup.addEventListener('click',PopupClose);
    locallogin.addEventListener('click',login)
}

function loginbtnFn(){
    const layerPopup = document.querySelector('.layerPopup')
    layerPopup.classList.add('open')
}

function PopupClose(event){
    console.log(event);
    console.log(this);
    if(event.target == this){
        this.classList.remove('open')
    }
}

async function login(){
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');

    if(userid.value == ""){
        alert('아이디를 입력해주세요');
        userid.focus();
        return 0;
    }

    if(userpw.value == ""){
        alert('패스워드를 입력해주세요');
        userpw.focus();
        return 0;
    }

    // POST auth/local/login
    let url = 'http://localhost:3000/auth/local/login'
    let Options = {
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
                body:JSON.stringify({
                    userid:userid.value,
                    userpw:userpw.value
            })
    }
    /*
    let Options = {
        method:'POST',
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        body:`userid=${userid.value}&userpw=${userpw.value}`
    }
    */
    // 바디값은 key=value&key2=value2
    // 값을 두개 보냄. userid userpw
    let response = await fetch(url,Options);
    let json = await response.json();

    let {result,msg} = json;
    alert(msg)
    if(result){
        let layerPopup = document.querySelector('.layerPopup')
        layerPopup.classList.remove('open')
    } else {
        userid.value == '';
        userpw.value == '';
        userid.focus();
    }
}