getDepartaments();

function saveNewDept(){
    let name = document.getElementById("dept").value;
    let id = document.getElementById("idDept").value;
    $.ajax({
        url:'/addNewDepartament',
        type:'post',
        data:{
            nameDept:name,
            idDept:id
        },
        success:function(response){
            console.log(response);
            if(response=='good'){
                getDepartaments();
                popUpDept('Se registró con exito', 'success');
                document.getElementById("dept").value = '';
                document.getElementById("idDept").value = '';
            }else{
                console.log('Error at addNewDept');
                popUpDept('Ha ocurrido un error', 'danger');
            }
        },
        error:function(response){
            console.log(response);
            popUpDept('Ha ocurrido un error', 'danger');
        }
    });
};

function deleteDepartamentById(){
    const id = document.getElementById('idDeptDelete').value;
    $.ajax({
        url:'/deleteDepartament',
        type:'post',
        data:{
            id:id
        },
        success:function(response){
            console.log(response);
            if(response=='good'){
                popUpDept('Se eliminó con exito', 'success');
                document.getElementById('idDeptDelete').value = '';
                getDepartaments();
            }else{
                popUpDept('Ha ocurrido un error', 'danger');
            }
        },
        error:function(response){
            console.log(response);
            popUpDept('Ha ocurrido un error', 'danger');
        }
    });
};

function getDepartaments(){
    $('#selectEmployee').html('');
    $.ajax({
        url:'/getDepartaments',
        type:'post',
        success:function(response){
            console.log('getDept-success');
            console.log(response);
            showDepartaments(response);
        },
        error:function(response){
            console.log('getDep-error')
            console.log(response);
        }
    });
}

function showDepartaments(depts){
    depts.forEach((dept)=>{
        $('#selectEmployee').append('<option value="'+dept.dept_no+'" id="'+dept.dept_no+'">'+dept.dept_name+'</option>');
    });
}
