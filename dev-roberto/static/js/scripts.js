const inputs = document.querySelectorAll('input');

for ( var i=0 ; i < inputs.length ; i++ ){
    let el = inputs[i] 
    if (el.type == 'text' || inputs[i].type == 'password'){
        el.autocomplete = "off";
    }
    
}