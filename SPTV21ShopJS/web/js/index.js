

import {loginModule} from './LoginModule.js';
import {viewModule} from './ViewModule.js';
import {adminModule} from './AdminModule.js';
import {userModule} from './UserModule.js';
import {managerModule} from './ManagerModule.js';

export{checkMenuPanel};

const shop_income = document.getElementById("shop_income");
shop_income.addEventListener("click",(e)=>{
    e.preventDefault();
    adminModule.getIncome();
});
const list_model = document.getElementById("list_model");
list_model.addEventListener("click",(e)=>{
    e.preventDefault();
    userModule.getListModel();
});
const buy_model = document.getElementById("buy_model");
buy_model.addEventListener("click",(e)=>{
    e.preventDefault();
    userModule.getListBuyModels();
});
const create_model = document.getElementById("create_model");
create_model.addEventListener("click",(e)=>{
    e.preventDefault();
    viewModule.showCreateModel();
});

const edit_model = document.getElementById("edit_model");
edit_model.addEventListener("click",(e)=>{
    e.preventDefault();
    managerModule.getListModels();
});
const edit_user = document.getElementById("edit_user");
edit_user.addEventListener("click",(e)=>{
    e.preventDefault();
    viewModule.showProfile();
});
const edit_role = document.getElementById("edit_role");
edit_role.addEventListener("click",(e)=>{
    e.preventDefault();
    viewModule.showEditRole(adminModule.getUsersMap(), adminModule.getRoles());
});
const login = document.getElementById("login");
login.addEventListener("click", (e) => {
    e.preventDefault();
    viewModule.showLoginForm();
});
const logout = document.getElementById("logout");
logout.addEventListener("click",(e)=>{
    e.preventDefault();
    loginModule.sendLogout();
});


function checkMenuPanel(){
    let role = sessionStorage.getItem('role');
    if(role===null){
        if(document.getElementById('list_model').classList.contains('hidden')){
            document.getElementById('list_model').classList.remove('hidden');
        }
        if(!document.getElementById('buy_model').classList.contains('hidden')){
            document.getElementById('buy_model').classList.add('hidden');
        }
        if(!document.getElementById('create_model').classList.contains('hidden')){
            document.getElementById('create_model').classList.add('hidden');
        }
        if(!document.getElementById('edit_model').classList.contains('hidden')){
            document.getElementById('edit_model').classList.add('hidden');
        }
        if(!document.getElementById('edit_user').classList.contains('hidden')){
            document.getElementById('edit_user').classList.add('hidden');
        }
        if(!document.getElementById('edit_role').classList.contains('hidden')){
            document.getElementById("edit_role").classList.add('hidden');
        }
        if(document.getElementById('login').classList.contains('hidden')){
            document.getElementById("login").classList.remove('hidden');
        }
        if(!document.getElementById('logout').classList.contains('hidden')){
            document.getElementById("logout").classList.add('hidden');
        }
        return;
    }
    role = JSON.parse(role);
    if(role.roleName === 'USER'){
        if(document.getElementById('list_model').classList.contains('hidden')){
            document.getElementById('list_model').classList.remove('hidden');
        }
        if(document.getElementById('buy_model').classList.contains('hidden')){
            document.getElementById('buy_model').classList.remove('hidden');
        }
        if(!document.getElementById('create_model').classList.contains('hidden')){
            document.getElementById('create_model').classList.add('hidden');
        }
        if(!document.getElementById('edit_model').classList.contains('hidden')){
            document.getElementById('edit_model').classList.add('hidden');
        }
        if(document.getElementById('edit_user').classList.contains('hidden')){
            document.getElementById('edit_user').classList.remove('hidden');
        }
        if(!document.getElementById('edit_role').classList.contains('hidden')){
            document.getElementById("edit_role").classList.add('hidden');
        }
        if(!document.getElementById('login').classList.contains('hidden')){
            document.getElementById("login").classList.add('hidden');
        }
        if(document.getElementById('logout').classList.contains('hidden')){
            document.getElementById("logout").classList.remove('hidden');
        }
        return;
    }
    if(role.roleName === 'MANAGER'){
        if(document.getElementById('list_model').classList.contains('hidden')){
            document.getElementById('list_model').classList.remove('hidden');
        }
        if(document.getElementById('buy_model').classList.contains('hidden')){
            document.getElementById('buy_model').classList.remove('hidden');
        }
        if(document.getElementById('create_model').classList.contains('hidden')){
            document.getElementById('create_model').classList.remove('hidden');
        }
        if(document.getElementById('edit_model').classList.contains('hidden')){
            document.getElementById('edit_model').classList.remove('hidden');
        }
        if(document.getElementById('edit_user').classList.contains('hidden')){
            document.getElementById('edit_user').classList.remove('hidden');
        }
        if(!document.getElementById('edit_role').classList.contains('hidden')){
            document.getElementById("edit_role").classList.add('hidden');
        }
        if(!document.getElementById('login').classList.contains('hidden')){
            document.getElementById("login").classList.add('hidden');
        }
        if(document.getElementById('logout').classList.contains('hidden')){
            document.getElementById("logout").classList.remove('hidden');
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(document.getElementById('list_model').classList.contains('hidden')){
            document.getElementById('list_model').classList.remove('hidden');
        }
        if(document.getElementById('buy_model').classList.contains('hidden')){
            document.getElementById('buy_model').classList.remove('hidden');
        }
        if(document.getElementById('create_model').classList.contains('hidden')){
            document.getElementById('create_model').classList.remove('hidden');
        }
        if(document.getElementById('edit_model').classList.contains('hidden')){
            document.getElementById('edit_model').classList.remove('hidden');
        }
        if(document.getElementById('edit_user').classList.contains('hidden')){
            document.getElementById('edit_user').classList.remove('hidden');
        }
        if(document.getElementById('edit_role').classList.contains('hidden')){
            document.getElementById("edit_role").classList.remove('hidden');
        }
        if(!document.getElementById('login').classList.contains('hidden')){
            document.getElementById("login").classList.add('hidden');
        }
        if(document.getElementById('logout').classList.contains('hidden')){
            document.getElementById("logout").classList.remove('hidden');
        }
        return;
    }
    }

checkMenuPanel();