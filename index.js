// selecting the values for the table
const table = document.querySelector('.gunTable')
const tableEl = document.querySelector('table')

// event listener for waiting for the html to load , with a function called to fetch the json data
window.addEventListener('DOMContentLoaded', function(){
    getData();
})
// function to fetch data from the json server with calling another function to create table rows , using a promise to return the response to json , then another promise using the data with the addtopage function
function getData(){
    return  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then (data => {
        addToPage(data)
    });
}
// function iterating over each element and adding each property to a table as well as a delete button on the end
function addToPage(arr){
arr.forEach(element => {
    table.innerHTML += `
    <tr>
        <td>${element.name}</td>
        <td>${element.type}</td>
        <td>${element.origin}</td>
        <td><button class="deleteBtn">Delete</button></td>
    </td>` 
});
}  

// having to add the event listener to the table beacuse we are adding the delete button dynamically so i cannot use the event listener on the button
tableEl.addEventListener('click', deleteRow)

// function that takes in an event , targetting the event and checking if the classlist does not contain delete button 

function deleteRow(e){
if (!e.target.classList.contains('deleteBtn')){
    return;
}
// here we have the target set to the delete button and we are getting the colsest element and removing it 
const btn = e.target;
btn.closest('tr').remove();
}

//---------------------------------------------------------------------------------------

//for the click game we have all the elements selected here
const attack = document.getElementById('attackBtn')
const health = document.getElementById('healthNum')
const levelUp = document.getElementById('levelUp')
const countNum = document.getElementById('clickNum')
const damageCount = document.getElementById('damageCount')
const youWin = document.getElementById('youWin')

// adding an event listener to the button and using if statements to decrease the total number everytime the button is clicked
attack.addEventListener('click', function(){
    health.innerText -=1;//main number as health
    countNum.innerText ++;// click counter incrementing
    damageCount.innerText = 1;//showing current attack damage
    if (health.innerText <= 981){
        health.innerText -= 1;
        damageCount.innerText =2;
    }
    if(health.innerText == 978){
        window.alert('Level Up +2 Attack!')
    }
    if(health.innerText <= 921){
        health.innerText -=1;
        damageCount.innerText =3;
    }
    if(health.innerText == 919){
        window.alert('Level Up +3 Attack!')
    }
    if(health.innerText <= 805){
        health.innerText -= 30;
        damageCount.innerText =33;
    }
    if(health.innerText == 808){
        window.alert('Level Up +33 Attack!')
    }else if (health.innerText < 0){
        health.innerText = 0;
    if(health.innerText == 0){
        youWin.removeAttribute("hidden")
        }
    }   
})
