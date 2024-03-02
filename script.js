// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {

    // Function to add a new row to the table
    function addRow(employeeName, employeeID, email, phoneNumber, workStatus, department) {
      // Create a new row element
      var newRow = document.createElement('tr');
  
      // Construct the HTML for the new row
      newRow.innerHTML = `
        <td>${tableRows.length + 1}</td>
        <td>${employeeName}</td>
        <td>${employeeID}</td>
        <td>${email}</td>
        <td>${phoneNumber}</td>
        <td>${workStatus}</td>
        <td>${department}</td>
        <td>${getCurrentDateTime()}</td>
        <td>
          <button class="btn btn-primary btn-sm btn-edit">Edit</button>
          <button class="btn btn-danger btn-sm btn-delete">Delete</button>
        </td>
      `;
  
      // Append the new row to the table body
      tableBody.appendChild(newRow);
  
      // Update the array of table rows
      tableRows.push(newRow);

      // Save the table data to localStorage
      saveTableData();
    }
  
    // Function to get the current date and time
    function getCurrentDateTime() {
      var now = new Date();
      var formattedDateTime = now.toLocaleString();
      return formattedDateTime;
    }

    // Function to save table data to localStorage
    function saveTableData() {
      localStorage.setItem('tableData', tableBody.innerHTML);
    }

    // Function to load table data from localStorage
    function loadTableData() {
      var savedData = localStorage.getItem('tableData');
      if (savedData) {
        tableBody.innerHTML = savedData;
        // Update tableRows array
        tableRows = Array.from(tableBody.children);
      }
    }
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Retrieve values from form fields
      var employeeName = document.getElementById('employeeName').value;
      var employeeID = document.getElementById('employeeID').value;
      var email = document.getElementById('email').value;
      var phoneNumber = document.getElementById('phoneNumber').value;
      var workStatus = document.getElementById('workStatus').value;
      var department = document.getElementById('department').value;
  
      // Add the new row to the table
      addRow(employeeName, employeeID, email, phoneNumber, workStatus, department);
  
      // Reset the form fields after submission
      this.reset();
    }
  
    // Function to handle delete button click
    function handleDeleteButtonClick(event) {
      var row = event.target.closest('tr'); // Find the closest row element
      row.remove(); // Remove the row from the table
      updateRowNumbers(); // Update row numbers after deletion
      saveTableData(); // Save table data after deletion
    }
  
    // Function to update row numbers after deletion
    function updateRowNumbers() {
      tableRows.forEach(function(row, index) {
        row.cells[0].textContent = index + 1;
      });
    }
  
    // Function to handle edit button click
    function handleEditButtonClick(event) {
      var row = event.target.closest('tr'); // Find the closest row element
      var cells = row.cells; // Get all cells in the row
  
      // Populate form fields with row data
      document.getElementById('employeeName').value = cells[1].textContent;
      document.getElementById('employeeID').value = cells[2].textContent;
      document.getElementById('email').value = cells[3].textContent;
      document.getElementById('phoneNumber').value = cells[4].textContent;
      document.getElementById('workStatus').value = cells[5].textContent;
      document.getElementById('department').value = cells[6].textContent;
  
      // Update the form submit button to act as an update button
      var submitButton = document.querySelector('button[type="submit"]');
      submitButton.textContent = 'Update';
      submitButton.removeEventListener('click', handleFormSubmit); // Remove previous event listener
      submitButton.addEventListener('click', function(event) {
        handleUpdateButtonClick(event, row);
      });
    }
  
    // Function to handle update button click
    function handleUpdateButtonClick(event, row) {
      event.preventDefault(); // Prevent the default form submission
  
      // Retrieve updated values from form fields
      var employeeName = document.getElementById('employeeName').value;
      var employeeID = document.getElementById('employeeID').value;
      var email = document.getElementById('email').value;
      var phoneNumber = document.getElementById('phoneNumber').value;
      var workStatus = document.getElementById('workStatus').value;
      var department = document.getElementById('department').value;
  
      // Update row data
      row.cells[1].textContent = employeeName;
      row.cells[2].textContent = employeeID;
      row.cells[3].textContent = email;
      row.cells[4].textContent = phoneNumber;
      row.cells[5].textContent = workStatus;
      row.cells[6].textContent = department;
  
      // Reset the form fields after update
      form.reset();
  
      // Reset the submit button to act as submit
      var submitButton = document.querySelector('button[type="submit"]');
      submitButton.textContent = 'Submit';
      submitButton.removeEventListener('click', handleUpdateButtonClick); // Remove previous event listener
      submitButton.addEventListener('click', handleFormSubmit);

      saveTableData(); // Save table data after update
    }
  
    // Get reference to the table body
    var tableBody = document.querySelector('tbody');
  
    // Array to store table rows
    var tableRows = Array.from(tableBody.children);

    // Load table data from localStorage on page load
    loadTableData();
  
    // Get reference to the form
    var form = document.querySelector('form');
  
    // Add event listener for form submission
    form.addEventListener('submit', handleFormSubmit);
  
    // Add event listener for delete button clicks (event delegation)
    tableBody.addEventListener('click', function(event) {
      if (event.target.classList.contains('btn-delete')) {
        handleDeleteButtonClick(event);
      } else if (event.target.classList.contains('btn-edit')) {
        handleEditButtonClick(event);
      }
    });
  });
