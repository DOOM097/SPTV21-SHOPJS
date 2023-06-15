import {checkMenuPanel} from './index.js';
import {viewModule} from './ViewModule.js';

class ManagerModule{
      
        getListModels() {
        let promiseListModels = fetch('getListModels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListModels.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        viewModule.showEditModel();
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
        
        
    createModel(){
        let promiseCreateModel = fetch('addModel',{
            method: 'POST',
            body: new FormData(document.getElementById('form_model'))
        });
        promiseCreateModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (createModel)"+error;
                          });
    }
    
    changeModel(){
        const id = document.getElementById('select_models').value;
        const newName = document.getElementById('name').value;
        const newBrand = document.getElementById('brand').value;
        const newSize = document.getElementById('size').value;
        const newAmount = document.getElementById('amount').value;
        const newPrice = document.getElementById('price').value;
        const changeModel = {
            "id": id,
            "newName": newName,
            "newBrand": newBrand,
            "newSize": newSize,
            "newAmount": newAmount,
            "newPrice": newPrice
        };
        let promiseChangeModel = fetch('editModel',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(changeModel)
        });
        promiseChangeModel.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  managerModule.getListModels();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (changeModel)"+error;
                          });
    }
    
}
const managerModule = new ManagerModule();
export {managerModule};