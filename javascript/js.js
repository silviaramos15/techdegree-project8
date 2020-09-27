// -----Declare global variables
let employees = []  //empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name , picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container'); //stores the DOM element that is the container of the employees
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const card = document.querySelector(".card");
const search = document.querySelector("#search");
const input = document.getElementsByTagName('input');
const back = document.querySelector('.previous');
const forth = document.querySelector('.next');


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
            <div class="text-container user">
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

    // using destructuring instead of:  //(sample) let name = employees.name

    function displayModal(index) {
        let { 
            name, 
            dob, 
            phone, 
            email, 
            location: { city, street, state, postcode }, 
            picture } = employees[index];

        let date = new Date(dob.date);    
      
        // building the overlay modal for the inner HTML 
        const displayEmployeeCard =`
                <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}"> 
                <div class="text-container>
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                        <hr/>
                        <p>${phone}</p>
                        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                        <p>Birthday: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
                </div>
                `;
                 
          // making the overlay visible
          overlay.classList.remove('hidden');
          modalContainer.innerHTML = displayEmployeeCard;
      }


//Event listener
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index'); //position of the employee
        displayModal(index);

       //Switch back and forth between employees whe the modal window is open     
      //add event listeners to forth and back arrows:
      //if the current index is - than the length of the employees, +1 and display the current employee. If clicked on back and the index is + than 0, display current employee.
        let currentIndex = index; //storing index employee
  
        forth.addEventListener('click', () => {     
          if(currentIndex < employees.length - 1) {
            currentIndex++;
            displayModal(currentIndex);
          } 
        });
        back.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            displayModal(currentIndex);
          }
        });
      
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// Create a Search Functionality

        
search.addEventListener('keyup', e => {
    const searchEmployee = e.target.value.toLowerCase(); //hold whatever the user types in the search input and transform it to lower case
    const userProfile = document.querySelectorAll('.card'); //select the employees cards
  //the for loot goes through all employees cards and select their names and transform them to lower case.
    for (let i = 0; i < userProfile.length; i++) {
      const employeeName = document.querySelectorAll('.name');
      const name = employeeName[i].innerText.toLowerCase();
  //if the name typed is included in our employee list, then display, if not, do not display
      if (name.includes(searchEmployee)) {
        userProfile[i].style.display = '';
      } else {
        userProfile[i].style.display = 'none';
      }
    }
  });





