$('#manager').hide();
$('#labelManager').hide();
$('#cardDepartaments').hide();

$('.cDept').click(function(){
    $('.cEmp').removeClass('active');
    $('.cDept').addClass('active');
    $('#cardEmployees').hide();
    $('#cardDepartaments').show();
});

$('.cEmp').click(function(){
    $('.cDept').removeClass('active');
    $('.cEmp').addClass('active');
    $('#cardEmployees').show();
    $('#cardDepartaments').hide();
});

function popUpDept(txt, type){
    $('#alertDepartaments').html(`<div class="alert alert-`+type+` alert-dismissible fade show" role="alert">
            `+txt+`
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
}

function popUpEmp(txt, type){
    $('#alertEmployees').html(`<div class="alert alert-`+type+` alert-dismissible fade show" role="alert">
            `+txt+`
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
}
