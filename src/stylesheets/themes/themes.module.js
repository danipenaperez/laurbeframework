import laurbe from "../../js/core/core.module.js";


let themes = {
    default:{
        navbar : "navbar-light bg-light", 
        navbarMenuItem: ""
    },
    ligth: {
        navbar : "navbar-light bg-light", 
        navbarMenuItem: ""
    }, 
    dark: {
        navbar : "navbar-dark  bg-dark", 
        navbarMenuItem: ""
    }

}
laurbe.themes = themes;

console.log('Component Themes Loaded');

export default laurbe;