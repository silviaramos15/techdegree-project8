// -----Declare global variables
let employees = []  //empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name , picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container'); //stores the DOM element that is the container of the employees
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// ------ Use FETCH to retrieve data from the API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

//------ Create displayEmployees function
function displayEmployees(Data) {
    employees = Data;

    let employeeHTML ='';

    //loop through each employee
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        //att each employee to the HTML
        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });
}

//Create a displayModal
function displayModal(index) {
    // using destructuring instead of:  //(sample) let name = employees.name

    let { 
        name, 
        dob, 
        phone, 
        email, 
        location: {city, street, state, postcode},
        picture, 
    } = employees[index];

    let date = new Date(dob.date);
    
    const modalHTML = `
    <div class="card" data-index="${index}">
    <img class="avatar! src="${picture.large}">
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number},${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</P>
    </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}

//Event lisener
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});