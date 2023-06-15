import {loginModule} from './LoginModule.js';
import {managerModule} from './ManagerModule.js';
import {adminModule} from './AdminModule.js';
import {userModule} from './UserModule.js';
class ViewModule {
    showLoginForm() {
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="login-container">
                <div class="imgcontainer">
                    <img src="Images/data.jpg" alt="Avatar" class="avatar">
                </div>
                
                <div class="cont">
                    <form method="post" class="form">
                    <label><b>Username</b></label>
                    <input id="username" name="username" type="username" required> <br>
                    
                    <label><b>Password</b></label>
                    <input type="password" id="password" name="password" required>
                    
                    <button id="btnLogin" type="submit">Войти</button>
                    <button id="btnRegistration" type="submit">Зарегистрироваться</button>
                    <label class="remember">
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
                    </form>
                </div>
            </div>`;
        document.getElementById('password').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                loginModule.sendCredential();
            }
        });
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginModule.sendCredential();
        });
        const btnRegistration = document.getElementById('btnRegistration');
        btnRegistration.addEventListener('click', (e) => {
            e.preventDefault();
            viewModule.showRegistrationForm();
        });
    };
    
    
    showIncome(income){
        let content = document.getElementById('content');
        content.innerHTML =`<div class="shoe-edit-container">
                <div class="top-content">
                    <span class="model-edit-title">Доход за все время</span>
                </div>
                <div class="mid-content">
                    <h2>${income} $</h2>
                    <h1 class="card-subtitle">Доходы за определенный месяц: </h1>
                    <select name="chosenMonth" id="select_month" class="form-select" aria-label="months">
                        <option selected>Выберите месяц</option>
                        <option value="1">Январь</option>
                        <option value="2">Февраль</option>
                        <option value="3">Март</option>
                        <option value="4">Апрель</option>
                        <option value="5">Май</option>
                        <option value="6">Июнь</option>
                        <option value="7">Июль</option>
                        <option value="8">Август</option>
                        <option value="9">Сентябрь</option>
                        <option value="10">Октябрь</option>
                        <option value="11">Ноябрь</option>
                        <option value="12">Декабрь</option>
                    </select>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" type="submit" id="income_per_month">Показать</button>
                    </div>
                </div>
            </div>`;
        const income_per_month = document.getElementById('income_per_month');
        income_per_month.addEventListener('click', (e) => {
            e.preventDefault();
            adminModule.getIncomePerMonth();
        });
    }
    showIncomePerMonth(incomePerMonth){
        let content = document.getElementById('content');
        content.innerHTML =`<div class="shoe-edit-container">
                <div class="top-content">
                    <span class="model-edit-title">Доход за выбранный месяц</span>
                </div>
                <div class="mid-content">
                    <h2>${incomePerMonth} $</h2>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" type="submit" id="income">Назад</button>
                    </div>
                </div>
            </div>`;
       const income = document.getElementById('income');
        income.addEventListener('click', (e) => {
            e.preventDefault();
            adminModule.getIncome();
        });
    }
    listShoes(listShoes){
        let content = document.getElementById('content');
        content.innerHTML = "";
        let list = document.createElement('div');
        list.classList.add('d-flex');
        list.classList.add('justify-content-center');
        content.appendChild(list);
        for(let i = 0; i < listShoes.length; i++){
            list.innerHTML +=  
            `<div class="container">
                <div class="card">
                  <div class="imgBx">
                    <img src="insertFile/${listShoes[i].pathToImage}">
                  </div>
                  <div class="contentBx">
                    <h2>${listShoes[i].name}</h2>
                    <h2>${listShoes[i].brand}</h2>
                    <div class="size">
                      <h3>Размер :</h3>
                      <span>${listShoes[i].size}</span>
                    </div>
                    <div class="size">
                      <h3>Количество :</h3>
                      <span>${listShoes[i].amount}</span>
                    </div>
                    <div class="size">
                      <h3>Цена :</h3>
                      <span>${listShoes[i].price}</span>
                    </div>
                  </div>
                </div>
              </div>`;
        }
    }
    showRegistrationForm() {
        document.getElementById('info').innerHTML = "";
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="registration-container">
                <div class="registration-heading">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                            <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
                        </filter>
                    </svg>
                    <h2 filter-content="S">РЕГИСТРАЦИЯ</h2>
                </div>
                <div class="input-container">
                    <img src="Images/first_name.png" class="input-img"></img>
                    <input class="input-field" id="first-name" placeholder="First name" name="firstname" required>
                </div>

                <div class="input-container">
                    <img src="Images/last_name.png" class="input-img"></img>
                    <input class="input-field" id="last-name" placeholder="Last name" name="lastname" required>
                </div>

                <div class="input-container">
                    <img src="Images/username.png" class="input-img"></img>
                    <input class="input-field" id="username" placeholder="Username" name="username" required>
                </div>
                    
                <div class="input-container">
                    <img src="Images/password.png" class="input-img"></img>
                    <input class="input-field" id="password1" type="password" placeholder="Password" name="password1" required>
                </div>
        
                <div class="input-container">
                    <img src="Images/password.png" class="input-img"></img>
                    <input class="input-field" id="password2" type="password" placeholder="Repeat password" name="password2" required>
                </div>
                
                <div class="input-container">
                    <img src="Images/phone.png" class="input-img"></img>
                    <input class="input-field" id="phone" placeholder="Phone" name="phone" required>
                </div>
            
                <div class="input-container">
                    <img src="Images/money.png" class="input-img"></img>
                    <input class="input-field" id="money" placeholder="$" name="money" required>
                </div>
            
                <button type="submit" id="register">Зарегистрироваться</button>
            </div>`;
        const register = document.getElementById('register');
        register.addEventListener('click', (e) => {
            e.preventDefault();
            loginModule.registration();
        });
    }
    showCreateModel() {
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
        `<div class="shoe-add-container">
            <div class="top-content">
                <span class="container-title">Добавление обуви</span>
            </div>
            <form method="post" class="form" id="form_model">  
                <div class="wrap-input100 validate-input" >
                    <input class="input100"  id="name" name="name" placeholder="Model name">
                </div>
                <div class="wrap-input100 validate-input" >
                    <input class="input100" id="brand" name="brand" placeholder="Model brand">
                </div>
                <div class="wrap-input100 validate-input">
                    <input class="input100"  id="size" name="size" placeholder="Model size">
                </div>
                <div class="wrap-input100 validate-input">
                    <input class="input100"  id="price" name="price" placeholder="Price">
                </div>
                <div class="wrap-input100 validate-input" >
                    <input class="input100" id="amount" name="amount" placeholder="Amount">
                </div>
                <div class="wrap-input100 validate-input" >
                    <input class="input100" type="file" id="image_file" name="imageFile">
                </div>
                <div class="container-login100-form-btn">
                    <button class="login100-form-btn" "id="add-model" type="submit">Добавить обувь</button>
                </div>
            </form>
        </div>`;
        document.getElementById('form_model').addEventListener('submit',e=>{
            e.preventDefault();
            managerModule.createModel();
        });
    }
    
    
    
    
    showEditModel() {
        const content = document.getElementById('content');
        content.innerHTML = 
        `<div class="shoe-edit-container">
            <div class="top-content">
                <span class="model-edit-title">Изменение обуви</span>
            </div>
            <div class="mid-content">
                <label for="list models">Список моделей:</label>
                <select name="list models" id="select_models">

                </select>
                <div class="wrap-input100 validate-input" data-validate="Enter name">
                    <input class="input100" id="name" name="name" placeholder="Model name">
                </div>
                <div class="wrap-input100 validate-input" data-validate="Enter brand">
                    <input class="input100" id="brand" name="brand" placeholder="Model brand">
                </div>
                <div class="wrap-input100 validate-input" data-validate="Enter size">
                    <input class="input100" id="size" name="size" placeholder="Model size">
                </div>
                <div class="wrap-input100 validate-input" data-validate="Enter price">
                    <input class="input100" id="price" name="price" placeholder="Price">
                </div>
                <div class="wrap-input100 validate-input" data-validate="Enter amount">
                    <input class="input100" id="amount" name="amount" placeholder="Amount">
                </div>
                <div class="container-login100-form-btn">
                    <button class="login100-form-btn" type="submit" id="edit-model">Изменить</button>
                </div>
            </div>
        </div>`;
        document.getElementById('edit-model').addEventListener('click',(e)=>{
            e.preventDefault();
            managerModule.changeModel();
        });
    }
    showBuyModel() {
        const content = document.getElementById('content');
        content.innerHTML = 
        `<div class="shoe-edit-container">
            <div class="top-content">
                <span class="model-edit-title">Покупка обуви</span>
            </div>
            <div class="mid-content">
                <label for="list models">Список моделей:</label>
                <select name="list models" id="select_models">

                </select>
                <div class="container-login100-form-btn">
                    <button class="login100-form-btn" type="submit" id="buy-shoe">Купить</button>
                </div>
            </div>
        </div>`;
        document.getElementById('buy-shoe').addEventListener('click',(e)=>{
            e.preventDefault();
            userModule.buyShoe();
        });
    }
    showEditRole(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="shoe-edit-container">
                <div class="top-content">
                    <span class="model-edit-title">Изменение роли</span>
                </div>
                <div class="mid-content">
                    <label for="list users">Пользователи</label>
                    <select name="list users" id="select_users">

                    </select>
                    <label for="list roles">Роли</label>
                    <select name="list roles" id="select_roles">

                    </select>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" type="submit" id="edit-role">Изменить роль</button>
                    </div>
                </div>
             </div>`;
        
        document.getElementById('edit-role').addEventListener('click',(e)=>{
            e.preventDefault();
            adminModule.setNewRole();
        });
    }
    showProfile(){
        document.getElementById("info").innerHTML = '';
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML =`<div class="registration-container">
                <div class="registration-heading">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                            <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
                        </filter>
                    </svg>
                    <h2 filter-content="S">Изменение профиля</h2>
                </div>
                <div class="input-container">
                    <img src="Images/first_name.png" class="input-img"></img>
                    <input class="input-field" id="firstname" type="text" placeholder="First name" name="firstname" value="${authUser.firstname}" required>
                </div>

                <div class="input-container">
                    <img src="Images/last_name.png" class="input-img"></img>
                    <input class="input-field" id="lastname" type="text" placeholder="Last name" name="lastname" value="${authUser.lastname}" required>
                </div>

                <div class="input-container">
                    <img src="Images/username.png" class="input-img"></img>
                    <input class="input-field" id="login" type="text" placeholder="Login" name="login" readonly value="${authUser.username}" required>
                </div>                   
                
                <div class="input-container">
                    <img src="Images/phone.png" class="input-img"></img>
                    <input class="input-field" id="phone" type="text" placeholder="Phone" name="phone" value="${authUser.phone}" required>
                </div>
            
                <div class="input-container">
                    <img src="Images/money.png" class="input-img"></img>
                    <input class="input-field" id="money" type="number" placeholder="Add Money" name="money" value="" required>
                </div>
            
                <button type="submit" id="edit_profile">Изменить</button>
            </div>`;
        const edit_profile = document.getElementById('edit_profile');
        edit_profile.addEventListener('click', (e)=>{
            e.preventDefault();
            userModule.editProfile();
        });
    }
}
const viewModule = new ViewModule();
export {viewModule};