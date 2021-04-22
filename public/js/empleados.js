getEmployees();
$('#updateEmployee').hide();

function saveNewEmployee(){
    const data = prepareDataEmployees();
    $.ajax({
        url:'/saveNewEmployee',
        type:'post',
        data:data,
        success:function(response){
            console.log(response);
            if(response=='good'){
                popUpEmp('Se registró con exito', 'success');
                cleanInputsEmployees();
                getEmployees();
            }else{
                console.log('Error at addNewDept');
                popUpEmp('Ha ocurrido un error', 'danger');
            }
        },
        error:function(response){
            console.log(response);
            popUpEmp('Ha ocurrido un error', 'danger');
        }
    });
}

function prepareDataEmployees(){
    const f = new Date();
    const data = {
        empNum:document.getElementById('empNum').value,
        birthday:document.getElementById('birthday').value,
        firstName:document.getElementById('name').value,
        lastName:document.getElementById('las').value,
        fromDate:document.getElementById('from').value,
        toDate:document.getElementById('to').value,
        salary:document.getElementById('sala').value,
        title:document.getElementById('title').value,
        idDepartament:document.getElementById('selectEmployee').value,
        gender:document.getElementById('gender').value,
        manager:document.getElementById('manager').checked,
        hireDate:(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate())
    };

    return data;
}

function cleanInputsEmployees(){
    document.getElementById('empNum').value='';
    document.getElementById('birthday').value='';
    document.getElementById('name').value='';
    document.getElementById('las').value='';
    document.getElementById('from').value='';
    document.getElementById('to').value='';
    document.getElementById('sala').value='';
    document.getElementById('title').value='';
}

function getEmployees(){
    $.ajax({
        url:'/getEmployees',
        type:'post',
        success:function(employees){
            console.log(employees);
            if(employees.employees){
                showEmployees(employees);
            }else{
                console.log('error no sw recibio');
                popUpDept('Ha ocurrido un error', 'danger');
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}

function showEmployees(data){
    const employees = data.employees;
    const dept = data.depts;
    const salaries = data.salaries;
    const titles = data.titles;
    const empDepts = data.empDepts;
    console.log('data? '+data);
    console.log('employees? '+employees);
    let code = `<thead>
                    <tr>
                    <th scope="col">emp_no</th>
                    <th scope="col">Nacimiento</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Contratación</th>
                    <th scope="col">Departamento</th>
                    <th scope="col">Salario</th>
                    <th scope="col">Titulo</th>
                    </tr>
                </thead>
                <tbody>`;
    employees.forEach((employee, i)=>{
        code += `<tr class="hand" id="`+employee.emp_no+`">
                    <th scope="row" onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+employee.emp_no+`</th>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+employee.first_name+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+employee.last_name+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+transformDateFormat(employee.birth_date)+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+employee.gender+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+transformDateFormat(employee.hire_date)+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+getDepartamentById(dept,empDepts[i].dept_no)+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+salaries[i].salary+`</td>
                    <td onclick="prepareEmployeeDelete('`+employee.emp_no+`')">`+titles[i].title+`</td>
                </tr>`;
    });
    code += '</tbody>';
    $('#tableEmployees').html(code);
}

function transformDateFormat(date){
    let f = new Date(date);
    let fecha = (f.getFullYear()) + "-";
    if(((f.getMonth()+1)+'').length<2){
        fecha += ('0'+((f.getMonth() +1)+'') + "-");
    }else{
        fecha += (((f.getMonth() +1)+'')+ "-");
    }

    if((f.getDate()+'').length<2){
        fecha += '0'+((f.getDate())+'');
    }else{
        fecha += ((f.getDate())+'');
    }
    return fecha;
}

function getDepartamentById(depts, empDeptId){
    let band = false;
    let data;
    depts.forEach((dept,i)=>{
        if(dept.dept_no==empDeptId){
            data = dept.dept_name;
            band = true;
        }
    });
    if(!band){
        return 'Error critico';
    }else{
        return data;
    }
}

function deleteEmployee(){
    let idEmp = document.getElementById('idEmpDelete').value;
    $.ajax({
        url:'/deleteEmployee',
        type:'post',
        data:{idEmp:idEmp},
        success:function(response){
            console.log(response);
            if(response=='good'){
                getEmployees();
                cleanInputsEmployees();
                popUpTab('Se eliminó con exito', 'success');
            }else{
                popUpTab('Ha ocurrido un error', 'danger');
            }
        },
        error:function(response){
            console.log(response);
            popUpTab('Ha ocurrido un error', 'danger');
        }
    });
}

function prepareEmployeeDelete(idEmp){
    document.getElementById('btnDeleteTab').disabled = false;
    document.getElementById('btnUpdateTab').disabled = false;
    document.getElementById('idEmpDelete').value = idEmp;
}

function changeView(){
    $('.cDept').removeClass('active');
    $('.ctable').removeClass('active');
    $('.cEmp').addClass('active');
    $('#cardEmployees').show();
    $('#cardTableDepartaments').hide();
    $('#cardDepartaments').hide();
    idEmp = document.getElementById('idEmpDelete').value;
    prepareEmployeeEdit(idEmp);
}

function prepareEmployeeEdit(idEmp){
    $.ajax({
        url:'/getEmployee',
        type:'post',
        data:{idEmp:idEmp},
        success:function(data){
            console.log('bien: '+data);
            showDataEmpoyeeEdit(data);
        },
        error:function(err){
            console.log('error: '+err);
        }
    });
}

function showDataEmpoyeeEdit(data){
    document.getElementById('empNum').value = data.employeeData[0].emp_no;
    document.getElementById('birthday').value = transformDateFormat(data.employeeData[0].birth_date);
    document.getElementById('name').value = data.employeeData[0].first_name;
    document.getElementById('las').value = data.employeeData[0].last_name;
    document.getElementById('from').value = transformDateFormat(data.salaryData[0].from_date);
    document.getElementById('to').value = transformDateFormat(data.salaryData[0].to_date);
    document.getElementById('sala').value= data.salaryData[0].salary;
    document.getElementById('title').value=data.titleData[0].title;
    document.getElementById(data.deptData[0].dept_no).selected = true;
    document.getElementById(data.employeeData[0].gender).selected = true;
    console.log('manager? '+data.managerData[0].emp_no);
    if(data.managerData[0].emp_no){
        document.getElementById('manager').checked = true;
    }else{
        document.getElementById('manager').checked = false;
    }
    $('#registerEmployee').hide();
    $('#updateEmployee').show();
}

$('#updateEmployee').click(function(){
    const data = prepareDataEmployees();
    $.ajax({
        url:'/updateEmployee',
        type:'post',
        data:data,
        success:function(response){
            console.log(response);
            if(response=='good'){
                $('#updateEmployee').hide();
                $('#registerEmployee').show();
                getEmployees();
                cleanInputsEmployees();
                popUpEmp('Se actualizó con exito', 'success');
            }else{
                popUpEmp('Ha ocurrido un error', 'danger');
            }
        },
        error:function(response){
            console.log(response);
            popUpEmp('Ha ocurrido un error', 'danger');
        }
    });
});