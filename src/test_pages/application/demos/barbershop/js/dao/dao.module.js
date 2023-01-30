import laurbe from '../../../../../../js/core/laurbe.js';
import axios from 'https://cdn.skypack.dev/axios';
import retailInfoView from '../view/retailInfoView.module.js';

// alert('axios es '+axios);
var DAO =  new laurbe.RestDAO({
    //basePath:'http://localhost:3000/laurbe'
    basePath:'./server/'
});
let retailInfo = null;

//http://192.168.1.44:8888/test_pages/application/demos/barbershop/barbershop/server/retailInfo.json

DAO.getBussinesInfo=function(callback, fallback, forceReload){
    if(retailInfo && !forceReload){
        alert('ya tenia los datos');
        return retailInfo;
    }else{    
        var resourceAPIPath = "retailInfo.json";
        DAO.getURL(resourceAPIPath, 
            function(data){
                retailInfo = data;
                console.log(retailInfo);
                if(callback)
                    callback(retailInfo);
            }, function(data){
                console.log(data);
                alert('erroraco llamando por ajax '+data);
                if(fallback)
                    fallback(data);
            }
        );
    }
}

let userInfo = null;
DAO.getUserInfo=function(callback, fallback, forceReload){
    if(userInfo && !forceReload){
        alert('ya tenia los datos');
        return userInfo;
    }else{    
        var resourceAPIPath = "668472459.json";
        DAO.getURL(resourceAPIPath, 
            function(data){
                userInfo = data;
                console.log(userInfo);
                if(callback)
                    callback(userInfo);
            }, function(data){
                console.log(data);
                alert('erroraco llamando por ajax '+data);
                if(fallback)
                    fallback(data);
            }
        );
    }
}



export default DAO;