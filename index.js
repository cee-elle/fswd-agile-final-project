$(document).ready(function() {
    $("#submit").click(function() {
        const url = "api/get-info";
        const request = $("#calSearch");

        $.ajax({
            url: url,
            method: "GET",
            data: request,
            dataType: "json",
            success: function(result) {
                console.log(result);
            }
        })
        
    })
})




