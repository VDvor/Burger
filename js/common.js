var submitForm = function (ev) {
    ev.preventDefault();

    var form = $(ev.target);


    ajaxForm(form).done(function (msg) {
        var mes = msg.mes,
            status = msg.status;
        if (status === 'OK') {
            form.append('<p class="success">' + mes + '</p>');
        } else {
            form.append('<p class="error">' + mes + '</p>');
        }
    });
    ajaxForm(form).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}
var ajaxForm = function (form) {

    var url = form.attr('action'),
        data = form.serialize();

    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });
}

$('#order-form').on('submit', submitForm);