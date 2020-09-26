// -----Declare global variables
let employees = []  //empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name , picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container'); //stores the DOM element that is the container of the employees
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

// ------ Use FETCH to retrieve data from the API
fetch(urlAPI)
.then((response) => response.json()) //reads the response and returns a promise
.then((data) => data.results) // returns the actual JSON data
.then(displayEmployee) //displays the data into the page
.catch((err) => console.log(err))

//------ Create displayEmployees function
function displayEmployee(data) {
    employees = data;

    let employeeHTML ='';

    //loop through each employee
    employees.forEach((employee, index) => {
        let picture = employee.picture;
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        
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
    
  gridContainer.innerHTML = employeeHTML;
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
    <div class="modal-close></div>
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}">
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