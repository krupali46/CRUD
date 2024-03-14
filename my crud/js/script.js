let name = document.getElementById('name');
let contact = document.getElementById('contact');
let email = document.getElementById('email');
let course = document.getElementById('course');
let gird = document.getElementById( 'grid');
let sdate = document.getElementById( 'sdate');
let history = document.getElementById('history');
let select = document.getElementById('select');
let isEdit;

// CREATE

const viewresult = (dataFrom) => {
  history.innerHTML = " ";
  if (dataFrom.length > 0) {
    dataFrom.forEach((ele,) => {
      history.innerHTML += `<div class="col-6 border border-white p-2 text-white">
      <p>Name : ${ele.name}</p>  
      <p>Email : ${ele.email}</p>
      <p>Contact: ${ele.contact}</p>
      <p>Course : ${ele.course}</p>
      <p>Grid : ${ele.gird}</p>
      <p>S Date : ${ele.sdate}</p>
      <p>id : ${ele.id}</p>
      <button class="btn" onclick="editFormData(${ele.id})">Edit</button>
      <button class="btn" onclick="deleteFormData(${ele.id})">Delete</button>
      <button class="btn" onclick="selectFormData(${ele.id})">Select</button>
         </div>`;
    });
  } else {
    history.innerHTML = "<h3 class='text-center py-4 text-white'>Oopps!!! No Data Found! Please Add a Dtails.</h3>";
  }
}

const getData = () => {
  return JSON.parse(localStorage.getItem('stuData')) || [];
}

// model
  
let dataFrom = getData();
viewresult(dataFrom);
const showData = () => {
  let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];
  let seletedName  = selectedDataArray.map( ele=> ele.name).join(" , ");
  document.getElementById('model-body').innerHTML= `Selected Students Name are : ${seletedName}` ;
}
let sCount = 0;

const selectFormData = (id) => {
  let dataFrom = getData();
  let selectedData = dataFrom.find(data => data.id == id);
  let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];
  selectedDataArray.push(selectedData);
  localStorage.setItem('selectedData', JSON.stringify(selectedDataArray));
  showData(selectedData);

  sCount++;
  select.innerHTML =`${sCount} + ` ;
  localStorage.setItem('selectCount', sCount);

  console.log("Data stored in local storage");
}

const clearForm = () => {
  name.value = "";
  contact.value = "";
  email.value = "";
  course.value = "";
  gird.value = "";
  sdate.value = "";
}

// EDIT

const editFormData = (id) => {
  let dataFrom = getData();
  let formDataToEdit = dataFrom.find(data => data.id == id);

  name.value = formDataToEdit.name;
  contact.value = formDataToEdit.contact;
  email.value = formDataToEdit.email;
  course.value = formDataToEdit.course;
  gird.value = formDataToEdit.gird;
  sdate.value = formDataToEdit.sdate;
  isEdit = id;
}

const submitform = () => {
  let dataFrom = getData();
  event.preventDefault();

  if (!isEdit) {
    var formData = {
      name: name.value,
      contact: contact.value,
      email: email.value,
      course: course.value,
      gird: gird.value,
      sdate: sdate.value,
      id: dataFrom.length + 1
    };

    dataFrom.push(formData);
  } else {
    dataFrom = dataFrom.map(data => {
      if (data.id == isEdit) {
        return {
          name: name.value,
          contact: contact.value,
          email: email.value,
          course: course.value,
          gird: gird.value,
          sdate: sdate.value,
          id: data.id
        };
      }
      return data;
    });

    isEdit = null;
  }

  localStorage.setItem('stuData', JSON.stringify(dataFrom));
  clearForm();
  viewresult(dataFrom);
}


// DELET

const deleteFormData = (id) => {
  let dataFrom = getData();

  let index = dataFrom.findIndex(data => data.id == id);

  if (index !== -1) {
    dataFrom.splice(index, 1);
    localStorage.setItem('stuData', JSON.stringify(dataFrom));
    viewresult(dataFrom);
  }
}