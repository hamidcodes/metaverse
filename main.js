//first version

/*const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');


function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function isValid(email){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return re.test(String(email).toLowerCase());

}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(username.value === ''){
        showError(username, 'Username is required');
    }else showSuccess(username);

    if(email.value === ''){
        showError(email, 'Email is required');
    }else if(!isValid(email.value)){
        showError(email, 'Email is not valid.');
    }else {showSuccess(email);}

    if(password.value === ''){
        showError(password, 'Password is required');
    }else showSuccess(password);

    if(username.value === ''){
        showError(username, 'Username is required');
    }else showSuccess(username);
});*/


//version 2

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const realname = document.getElementById('realname');
const end = document.getElementById('end');


let isformvalid = false;

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function checkEmail(input){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid.')
    }

}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

function checkRequired(inputArr){
    username.classList.remove('error');
    username.nextElementSibling.classList.add('hidden');
    isformvalid = true;
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
            isformvalid = false;
        }else{
            showSuccess(input)
        }
    })
}


function  checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`)
    }else{
        showSuccess(input)
    }
}

//check password
function checkPassword(input1, input2){
    if(input1.value != input2.value){
        showError(input2, 'Passwords do not match!');
        isformvalid = false;
    }else{
        showSuccess(input1, input2)
        
    }
}


function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    if(isformvalid){
        form.remove();
        end.classList.remove('hidden');
    }
    e.preventDefault();
    checkRequired([realname, username, email, password, confirm]);
    checkLength(username, 3, 15);
    checkLength(realname, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPassword(password, confirm);

});

username.addEventListener('input', () =>{
    checkRequired([realname, username, email, password, confirm]);

})