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
        $('#link').hide().fadeIn('slow');
            // show link stats
            if (data.hits > 0) {
                showStats('Hitted ' + data.hits + ' time(s)!');
            }
        }
    });

});

// when clicking on freud abner we show some surprise - admin only!
$('#admin-mode-btn').on('click', function(){
    $.ajax({
        url: '/api/stats',
        type: 'POST',
        dataType: 'JSON',
        success: function(data){
            showStats('Total url shortened ' + data.url_count + '!');
        }
    });
});

function showStats(content) {
    $('#stats-result').html(content);
}