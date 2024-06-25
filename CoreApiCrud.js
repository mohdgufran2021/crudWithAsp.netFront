var gvariable = [];
document.getElementById("update").disabled = true
document.getElementById("eid").hidden = true

//Data Insert
async function insertData(obj) {
    const apiUrl = 'http://localhost:5098/api/Emp/Post';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Failed to insert data');
        }
        const data = await response.json();
        console.log('Data inserted successfully:', data);

    } catch (error) {
        console.error('Error inserting data:', error);
    }
}


//Get The Records from Table
async function getdata() {
    fetch("http://localhost:5098/api/Emp/Get").then((data) => {
        //console.log(data);
        return data.json();   //COnvert to object
    }).then((objectData) => {
        gvariable = objectData;
        if(objectData.length ==0){
            document.getElementById("out").style.display = "none"
        }

        else{
            var tableData = "";

            objectData.map((values, index) => {
                tableData +=
                    `<tr>
                                        <td>${values.eid}</td>
                                        <td>${values.empName}</td>
                                        <td>${values.empCompany}</td>
                                        <td>${values.empSalary}</td>
                                        <td>${values.empStatus}</td>
                                        <td>
                                            <button onclick="getParameter(${index})">Edit</button> ||
                                            <button onclick="deletedata(${index})">Delete</button>
                                        </td>
                                        <tr>`;
            });
            document.getElementById("data-table").innerHTML = tableData;
        }
    });
}
getdata();


//Clear input fields
function clear() {
    document.getElementById("eid").value = ""
    document.getElementById("ename").value = ""
    document.getElementById("ecom").value = ""
    document.getElementById("esalary").value = ""
    document.getElementById("estatus").value = ""
    document.getElementById("eid").hidden = true
}


const handleSubmit = async () => {
    const obj = {
        empName: document.getElementById("ename").value,
        empCompany: document.getElementById("ecom").value,
        empSalary: document.getElementById("esalary").value,
        empStatus: document.getElementById("estatus").value
    }
    console.log("acdcd", obj)
    let data = await insertData(obj);
    console.log("isnert data", data);
    clear();
    getdata();
}


//Update Data
var clickedEMP = ''
function getParameter(index) {
    var employeeId = "";
    let val = gvariable[index];
    clickedEMP = val.eid
    console.log("Clicked Data", val);
    employeeId = gvariable[index].eid;
    console.log("Employee ID:", employeeId);

    // eid = gvariable[index].eid,
    // en = gvariable[index].empName
    // ecom = gvariable[index].empCompany

    console.log(ecom);
    document.getElementById("eid").value = val.eid
    document.getElementById("ename").value = val.empName
    document.getElementById("ecom").value = val.empCompany
    document.getElementById("esalary").value = val.empSalary
    document.getElementById("estatus").value = val.empStatus
    document.getElementById("submit").disabled = true
    document.getElementById("update").disabled = false
    document.getElementById("eid").hidden = false
    document.getElementById("eid").innerHTML = `Hello ${val.eid}`
    // updateData(val.eid);
}

async function updateData(clickedEMP, newData) {
    const apiUrl = `http://localhost:5098/api/Emp/Put/${clickedEMP}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData) // newData should be an object containing updated properties
        });

        if (!response.ok) {
            throw new Error('Failed to update data');
        }

        const data = await response.json();
        console.log('Data updated successfully:', data);
        alert("Successfully Updated");

    } catch (error) {
        console.error('Error updating data:', error);
    }
}
const onhandleUpdate = async () => {
    console.log('desds', clickedEMP)

    const dataUpdate = {
        empName: document.getElementById("ename").value,
        empCompany: document.getElementById("ecom").value,
        empSalary: document.getElementById("esalary").value,
        empStatus: document.getElementById("estatus").value
    };
    let data = await updateData(clickedEMP, dataUpdate)
    if (data) {
        getdata();
        console.log(data);
    }
    getdata();
    clear();
    document.getElementById("update").disabled = true
    document.getElementById("submit").disabled = false
}


// let array1 = [1,2,3,4,5,6,7,8,12,56]

// array1.filter((a)=>{
//     if(a% 2 == 0 ){
//         console.log("even", a )
//     }
//     else{
//         console.log('odds' , a)
//     }


// })



//Delete Approach
function deletedata(index) {
    let val = gvariable[index];
    let id = val.eid
    console.log(id)
    deleteApi(id);
    getdata();
}
async function deleteApi(id) {
    const apiUrl = `http://localhost:5098/api/Emp/Delete/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed Delete');
        }

        const data = await response.json();
        console.log('Data deleted successfully:', data);

    } catch (error) {
        console.error('Error:', error);
    }
}