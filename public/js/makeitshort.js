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
            // show link stats
            if (data.hits > 0) {
                showStats('Hitted ' + data.hits + ' time(s)!');
            }
        }
    });

});

function showStats(content) {
    $('#stats-result').html(content);
}