
import {checkMenuPanel} from './index.js';
import {viewModule} from './ViewModule.js';

class AdminModule{
    getRoles(){
        let pormiseRoles = fetch('getRoles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        pormiseRoles.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            adminModule.insertSelectRoles(response.roles);
                        }else{
                            document.getElementById('info').innerHTML = 'Список ролей пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getRoles): '+error;
                        
                    });
    }

    getUsersMap(){
        let promiseUsersMap = fetch('getUsersMap',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseUsersMap.then(response => response.json())
                       .then(response => {
                           if(response.status){
                               adminModule.insertSelectUsers(response.usersMap);
                           }else{
                               document.getElementById('info').innerHTML = 'Список пользователей пуст';
                           }
                       })
                       .catch(error => {
                           document.getElementById('info').innerHTML = 'Ошибка сервера (getUsersMap): '+error;
                       });
       
    }
    
    getAdminListModels() {
        let promiseListModels = fetch('getListModels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListModels.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        let modelSelect = document.getElementById('list-models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "--Выберите модель--";
                        option.value = '';
                        modelSelect.add(option);
                        for (let i = 0; i < response.options.length; i++) {
                            option = document.createElement('option');
                            option.text = response.options[i].modelName + ' // ' + response.options[i].modelFirm + ' // ' + response.options[i].modelPrice + '$';
                            option.value = response.options[i].id;
                            modelSelect.add(option);
                        }
                    }else {
                        let modelSelect = document.getElementById('list-models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "Список моделей пуст...";
                        option.value = '';
                        document.getElementById('info').innerHTML = response.info;
                    }
                })
                .catch(error => {
                    document.getElementById('info').innerHTML = "insertListModels" + error.info;
                });
    }
   
    setNewRole(){
        const userId = document.getElementById('select_users').value;
        const roleId = document.getElementById('select_roles').value;
        const newUserRole = {
            "userId": userId,
            "roleId": roleId
        };
        let promiseSetUserRole = fetch('setUserRole',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUserRole)
        });
        promiseSetUserRole.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  let authUser = JSON.parse(sessionStorage.getItem('user'));
                                  if(response.user.id === authUser.id){
                                      sessionStorage.setItem('role',JSON.stringify(response.role));
                                      checkMenuPanel();
                                      document.getElementById('content').innerHTML = '';
                                      return;
                                  }
                                  adminModule.getUsersMap();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Ошибка сервера (setNewRole): '+error;
                          });
        
    }
    insertSelectUsers(usersMap){
        const select_users = document.getElementById('select_users');
        select_users.options.length = 0;
        for(let i=0; i < usersMap.length; i++){
            const option = document.createElement('option');
            option.value = usersMap[i].user.id;
            option.text = `${usersMap[i].user.username}. Роль: ${usersMap[i].role}`;
            select_users.add(option);
        }
    };
    insertSelectRoles(roles){
        const select_roles = document.getElementById('select_roles');
        select_roles.options.length = 0;
        for(let i=0; i < roles.length; i++){
            const option = document.createElement('option');
            option.value = roles[i].id;
            option.text = roles[i].roleName;
            select_roles.add(option);
        };
    }
    
    
    getIncome(){
        let promiseGetIncome = fetch('getIncome',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseGetIncome.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showIncome(response.income);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (getIncome)"+error;
                          });
    }
    getIncomePerMonth(){
        const month = document.getElementById('select_month').value;
        const monthIncome = {
            "month":month
        };
        let promiseGetIncomePerMonth = fetch('getIncomePerMonth',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(monthIncome)
        });
        promiseGetIncomePerMonth.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showIncomePerMonth(response.incomePerMonth);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (getIncomePerMonth)"+error;
                          });
    }

}
const adminModule = new AdminModule();
export {adminModule};

