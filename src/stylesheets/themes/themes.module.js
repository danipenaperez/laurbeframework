import laurbe from "../../js/core/core.module.js";


let themes = {
    default:{
        navbar : {
            extraClass: "navbar-light bg-light",
            extraStyle: ""
        } ,
        navbarMenuItems:{
            extraClass: " "
        } ,
        navbarMenuItem: ""
    },
    ligth: {
        navbar : {
            extraClass: "navbar-light bg-light",
            extraStyle: ""
        } ,
        navbarMenuItems:{
            extraClass: ""
        } ,
        navbarMenuItem: ""
    }, 
    dark: {
        navbar : {
            extraClass: "navbar-dark  bg-dark",
            extraStyle: ""
        } ,
        navbarMenuItems:{
            extraClass: " "
        } ,
        navbarMenuItem: ""
    },
    modern:{
        navbar : {
            extraClass: "navbar-dark navbar-transparent-on-collapse ",
            extraStyle: ""
        },
        navbarMenuItems:{
            extraClass: "navbar-ul-transparent-on-collapse "
        } ,
        navbarMenuItem: ""
    }

}
laurbe.themes = themes;

console.log('Component Themes Loaded');

export default laurbe;