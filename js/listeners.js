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
            var m1, m2, m3, m4;
        
            try
            {
                m1 = Number($('#m1').val());
                m2 = Number($('#m2').val());
                m3 = Number($('#m3').val());
                m4 = Number($('#m4').val());
            }
            catch (e)
            {
                halfmoon.initStickyAlert({
                    content: "Invalid inputs",
                    title: "Error",
                    alertType: "alert-danger",
                    timeShown: 3000
                });
            }
            output = hillDecipher(input, [[m1, m2], [m3, m4]]);
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

    $('#output').val(output);
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
            var m1 = Number($('#m1').val());
            var m2 = Number($('#m2').val());
            var m3 = Number($('#m3').val());
            var m4 = Number($('#m4').val());
            output = hillDecipher(input, [[m1, m2], [m3, m4]]);
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

    $('#output').val(output);
});

// Clears the input and output fields.
$('#clear').click(function() {
    $('#input').val("");
    $('#output').val("");
});

$('document').ready(function() {
    $('#year').text(new Date().getFullYear());
    $('#cipher').val('playfair');
});

$('#cipher').change(function() {
    // Hide all elements.
    $('#playfairInput').css("visibility", "hidden");
    $('#hillInput').css("visibility", "hidden");

    // Set height to 0.
    $('#playfairInput').css("height", "0");
    $('#hillInput').css("height", "0");

    // Find elements to display.
    switch($('#cipher').val())
    {
    case 'playfair':
        $('#playfairInput').css("visibility", "visible");
        $('#playfairInput').css("height", "100%");
        break;
    case 'hill':
        $('#hillInput').css("visibility", "visible");
        $('#hillInput').css("height", "100%");
        break;
    default:
    }
})