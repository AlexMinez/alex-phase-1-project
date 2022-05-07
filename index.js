// selecting the values for the table
const table = document.querySelector('.gunTable')
const tableEl = document.querySelector('table')


// event listener for waiting for the html to load , with a function called to fetch the json data
window.addEventListener('DOMContentLoaded', function(){
    getData();
})
// function to fetch data from the json server with calling another function to create table rows , using a promise to return the response to json , then another promise using the data with the addtopage function
function getData(){
    return  fetch("http://localhost:3000/guns")
    .then(res => res.json())
    .then (data => {
        addToPage(data)

        data.map(e=> e.id).forEach(e => {
            const deleteButton = document.getElementById(e)
            deleteButton.addEventListener('click',() => deleteRow(e).then(() => {
                let row = document.getElementById(`${e}-row`);
                row.remove();
            }) )
        })
    });
}
// function iterating over each element and adding each property to a table as well as a delete button on the end
function addToPage(arr){
arr.forEach(element => {
    table.innerHTML += `
    <tr id='${element.id}-row'>
        <td>${element.name}</td>
        <td>${element.type}</td>
        <td>${element.origin}</td>
        <td><button id=${element.id} class="deleteBtn">Delete</button></td>
    </tr>` 
    
    
});
} 

// having to add the event listener to the table beacuse we are adding the delete button dynamically so i cannot use the event listener on the button


// function that takes in an event , targetting the event and checking if the classlist does not contain delete button 

function deleteRow(id){
return fetch('http://localhost:3000/guns/' +id ,  {
    method: "Delete",
    headers: {
        'Content-Type': 'application/json'
    },

})

}

function addGun(){
return fetch('http://localhost:3000/guns', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'test',
        type: 'test',
        origin: 'test'
    })

    })
}

document.getElementById('add-gun').addEventListener('click',()=>{
    addGun()
})

// here we have the target set to the delete button and we are getting the colsest element and removing it 

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
}})
