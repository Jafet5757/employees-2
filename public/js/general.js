$('#manager').hide();
$('#labelManager').hide();
$('#cardDepartaments').hide();
$('#cardTableDepartaments').hide();

$('.cDept').click(function(){
    $('.cEmp').removeClass('active');
    $('.ctable').removeClass('active');
    $('.cDept').addClass('active');
    $('#cardEmployees').hide();
    $('#cardTableDepartaments').hide();
    $('#cardDepartaments').show();
});

$('.cEmp').click(function(){
    $('.cDept').removeClass('active');
    $('.ctable').removeClass('active');
    $('.cEmp').addClass('active');
    $('#cardEmployees').show();
    $('#cardTableDepartaments').hide();
    $('#cardDepartaments').hide();
});

$('.ctable').click(function(){
    $('.ctable').addClass('active');
    $('.cEmp').removeClass('active');
    $('.cDept').removeClass('active');
    $('#cardEmployees').hide();
    $('#cardTableDepartaments').show();
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

function popUpTab(txt,type){
    $('#alertTable').html(`<div class="alert alert-`+type+` alert-dismissible fade show" role="alert">
            `+txt+`
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
}
