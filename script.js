// Retrieve employee data from local storage, if available
const storedEmployees = localStorage.getItem('employees');
const employees = storedEmployees ? JSON.parse(storedEmployees) : {};


// Update employee list display
updateEmployeeList();

document.getElementById('newEmployee').addEventListener("submit", newStaff);

function newStaff(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const jobTitle = document.getElementById('job_title').value;
    const salary = document.getElementById('salary').value;
    const status = document.getElementById('status').value;

    const employeeInfo = {
        name: name,
        jobTitle: jobTitle,
        salary: salary,
        status: status
    };

    if (employees.hasOwnProperty(name)) {
        Object.assign(employees[name], employeeInfo);
    } else {
        employees[name] = employeeInfo;
    }

    // Save updated employee data to local storage
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log(employeeInfo);

    updateEmployeeList();
}


function updateEmployeeList() {
    const employeeListSection = document.getElementById("employeeList");

    employeeListSection.innerHTML = '';

    for (const name in employees) {
        const employee = employees[name];
        const employeeList = `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.salary}</td>
                <td>${employee.status}</td>
                <td>
                <input type="checkbox" class="fire-checkbox" data-name="${employee.name}"></td>
                <td>
                <button class="update_record" data-name="${employee.name}">Change</button>
            </tr>
        `;
        employeeListSection.insertAdjacentHTML("beforeend", employeeList);
    }

    const employeeListHeading = `
        <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Fire</th>
            <th>Update</th>
        </tr>
    `;

    employeeListSection.insertAdjacentHTML("afterbegin", employeeListHeading);

    // Add event listeners to fire checkboxes
    const fireCheckboxes = document.getElementsByClassName('fire-checkbox');
    for (const checkbox of fireCheckboxes) {
        checkbox.addEventListener('change', removeEmployee);
    }


//     Add Event Listeners to update employee
    const updateEmployeebttn = document.getElementsByClassName('update_record');
    for (const update of updateEmployeebttn) {
        update.addEventListener('click', updateEmployee);
    }

}

function updateEmployee(event) {
    const name = event.target.dataset.name;
    const employee = employees[name];

    if (employee) {
        // Update form values with employee data
        document.getElementById('name').value = employee.name;
        document.getElementById('job_title').value = employee.jobTitle;
        document.getElementById('salary').value = employee.salary;
        document.getElementById('status').value = employee.status;
    } else {
        // Employee not found
        console.log("Employee not found");
    }
}



function removeEmployee(event) {
    const name = event.target.dataset.name;
    delete employees[name];

    // Save updated employee data to local storage
    localStorage.setItem('employees', JSON.stringify(employees));

    updateEmployeeList();
}

// Rest of your code...

