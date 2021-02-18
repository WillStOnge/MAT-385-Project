// Enciphers the text in input and places it in output.
$('#encipher').click(function() {

    var input = $('#input').val();
    var output;
    
    try
    {
        // Switches the output to pick the right encipher function.
        switch($('#cipher').val())
        {
        case 'playfair':
            var keyword = $('#keyword').val();
            output = playfairEncipher(input, keyword);
            break;
        case 'hill':
            output = hillEncipher(input, [[1, 1], [1, 1]]);
            break;
        default:
            halfmoon.initStickyAlert({
                content: "Invalid cipher type.",
                title: "Error",
                alertType: "alert-danger",
                timeShown: 3000
            });
            break;
        }
    }
    catch (e)
    {
        halfmoon.initStickyAlert({
            content: e,
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    }

    // Setup output field and its word count.
    $('#output').text(output);
    $('#output_count').text("Word Count: " + $('#output').val().length);
});

// Deciphers the text in input and places it in output.
$('#decipher').click(function() {

    var input = $('#input').val();
    var output;

    // Switches the output to pick the right decipher function.
    try
    {
        switch($('#cipher').val())
        {
        case 'playfair':
            var keyword = $('#keyword').val();
            output = playfairDecipher(input, keyword);
            break;
        case 'hill':
            output = hillDecipher(input, [[1, 1], [1, 1]]);
            break;
        default:
            halfmoon.initStickyAlert({
                content: "Invalid cipher type.",
                title: "Error",
                alertType: "alert-danger",
                timeShown: 3000
            });
        }
    }
    catch (e)
    {
        halfmoon.initStickyAlert({
            content: e,
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    }

    // Setup output field and its word count.
    $('#output').text(output);
    $('#output_count').text("Word Count: " + $('#output').val().length);
});

// Calculates word count when input is updated.
$('#input').keyup(function() {
    $('#input_count').text("Word Count: " + $('#input').val().length);
});

// Resets some elements when the page is fully loaded.
$(document).ready(function() {
    //$('#input').val("");
    $('#cipher').val("playfair");
    //$('#keyword').val("");
});
