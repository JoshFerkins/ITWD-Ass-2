//This JS page changes the programs theme

//When the theme select is changed
$('#customise-select').change(function(){
  let v = $(this).val();
  //Store the value in localstorage
  localStorage.setItem('theme', JSON.stringify(v))
  changeTheme(v)
})

//When each document is loaded
$(document).ready(function(){
  let theme = localStorage.getItem('theme')
  //parses select value to the changeTheme() function
  changeTheme(JSON.parse(theme))
})


function changeTheme(v){
  //Use a switch case to change the color of css defined variables depending on the select value
  switch(v){
    case 'regular':
      document.documentElement.style.setProperty('--header-color', '#2C3E50');
      document.documentElement.style.setProperty('--footer-color', '#2C3E50');
      document.documentElement.style.setProperty('--main-color', '#f5fcfc');
      document.documentElement.style.setProperty('--font-color', 'white');
      document.documentElement.style.setProperty('--nav-color', '#4DD0E1');
      break;
    case 'dark':
      document.documentElement.style.setProperty('--header-color', 'black');
      document.documentElement.style.setProperty('--footer-color', 'black');
      document.documentElement.style.setProperty('--main-color', '#e0e0e0');
      document.documentElement.style.setProperty('--font-color', 'white');
      document.documentElement.style.setProperty('--nav-color', 'gray');
      break;
    case 'light':
      document.documentElement.style.setProperty('--header-color', '#f5ffff');
      document.documentElement.style.setProperty('--footer-color', '#f5ffff');
      document.documentElement.style.setProperty('--main-color', 'white');
      document.documentElement.style.setProperty('--font-color', 'black');
      document.documentElement.style.setProperty('--nav-color', 'light-blue');
      break;
    default:
  }
}