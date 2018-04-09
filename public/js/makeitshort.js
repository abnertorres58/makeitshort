$('.main-btn').on('click', function(){

    $.ajax({
        url: '/api/makeitshort',
        type: 'POST',
        dataType: 'JSON',
        data: {
            url: $('#url-to-shorten').val()
        },
        success: function(data){
            $('.result').html(data.url);
            $('.result').attr('href', data.url);
            $('#link').show();
        }
    });

});