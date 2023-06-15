import {checkMenuPanel} from './index.js';
import {viewModule} from './ViewModule.js';


class LoginModule {
 sendCredential(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const credential = {
        "username": username,
        "password": password
    };
    let promise = fetch('login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        credentials: 'include',
        body: JSON.stringify(credential)
    });
    promise.then(response=> response.json())
       .then(response =>{
           if(response.auth){
               sessionStorage.setItem('token',JSON.stringify(response.token));
               sessionStorage.setItem('user',JSON.stringify(response.user));
               sessionStorage.setItem('role',JSON.stringify(response.role));
               sessionStorage.setItem('model',JSON.stringify(response.model));
               checkMenuPanel();
               viewModule.showProfile();
               document.getElementById('info').innerHTML = response.info;
           }else{
               checkMenuPanel();
               document.getElementById('info').innerHTML = response.info;
           }
       })
       .catch( error =>{
           document.getElementById('info').innerHTML = "Ошибка запроса (sendCredential): "+error;
           document.getElementById('content').innerHTML = "";
       });
 }
 sendLogout(){
     let promise = fetch('logout', {
         method: 'GET'
     });
     promise.then(response => response.json())
             .then(response => {
                 if(!response.auth){
                     if(sessionStorage.getItem('token')!== null){
                        sessionStorage.removeItem('token');
                     }
                     if(sessionStorage.getItem('user')!== null){
                        sessionStorage.removeItem('user');
                     }
                     if(sessionStorage.getItem('role')!== null){
                        sessionStorage.removeItem('role');
                     }
                    checkMenuPanel();
                    viewModule.showLoginForm();
                    document.getElementById('info').innerHTML = response.info;
                 }
     });
     
 }
    registration() {
    const firstname = document.getElementById('first-name').value;
    const lastname = document.getElementById('last-name').value;
     const username = document.getElementById('username').value;
     const phone = document.getElementById('phone').value;
     const money = document.getElementById('money').value;
     const password1 = document.getElementById('password1').value;
     const password2 = document.getElementById('password2').value;
     if(password1 !== password2){
         document.getElementById('info').innerHTML = 'Пароли не совпадают';
         document.getElementById('password1').innerHTML = "";
         document.getElementById('password2').innerHTML = "";
         return;
     }
     const user = {
         "firstname": firstname,
         "lastname": lastname,
         "phone": phone,
         "username": username,
         "money": money,
         "password": password1
     };
     let promise = fetch('registration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    promise.then(respnose => respnose.json())
            .then(response =>{
                if(response.status){
                    viewModule.showLoginForm();
                    document.getElementById('info').innerHTML = response.info;
                }else{
                    viewModule.showRegistrationForm();
                    document.getElementById('info').innerHTML = response.info;
                }
            })
            .catch(error =>{
                document.getElementById('info').innerHTML = "Ошибка запроса (registration): "+error;
                document.getElementById('content').innerHTML = "";
            });
    }
}
const loginModule = new LoginModule();
export {loginModule};