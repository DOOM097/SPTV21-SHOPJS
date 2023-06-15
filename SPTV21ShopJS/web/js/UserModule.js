import {viewModule} from './ViewModule.js';
class UserModule{
    

    
    
    getListBuyModels() {
        let promiseListModels = fetch('getListBuyModels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListModels.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        viewModule.showBuyModel();
                        let modelSelect = document.getElementById('select_models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "--Выберите модель--";
                        option.value = '';
                        modelSelect.add(option);
                        for (let i = 0; i < response.options.length; i++) {
                            option = document.createElement('option');
                            option.text = response.options[i].name + ' // ' + response.options[i].brand + ' // ' + response.options[i].price + '$';
                            option.value = response.options[i].id;
                            modelSelect.add(option);
                        }
                    }else {
                        let modelSelect = document.getElementById('select_models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "Список моделей пуст...";
                        option.value = '';
                        document.getElementById('info').innerHTML = response.info;
                    }
                })
                .catch(error => {
                    document.getElementById('info').innerHTML = "Список моделей пуст";
                });
    }    
    
    getListModel(){
        let promiseGetListModel = fetch('getListModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseGetListModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.listShoes(response.listShoes);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (getListModel)"+error;
                          });
    }
    
    buyShoe(){
        const id = document.getElementById('select_models').value;
        const buyShoe = {
            "id":id
        };
        let promiseBuyShoe = fetch('buyShoe',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(buyShoe)
        });
        promiseBuyShoe.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (buyShoe)"+error;
                          });
    }

    editProfile(){
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        const newFirstname = document.getElementById('firstname').value;
        const newLastname = document.getElementById('lastname').value;
        const newPhone = document.getElementById('phone').value;
        const newMoney = document.getElementById('money').value;
        const changeUser = {
            "id": authUser.id,
            "newFirstname": newFirstname,
            "newLastname": newLastname,
            "newPhone": newPhone,
            "newMoney": newMoney
        };
        let promiseChangeProfile = fetch('editProfile',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(changeUser)
        });
        promiseChangeProfile.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  viewModule.showProfile();
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (editProfile)"+error;
                          });
    }
}
const userModule = new UserModule();
export {userModule};


