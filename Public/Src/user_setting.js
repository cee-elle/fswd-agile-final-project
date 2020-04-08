$("#user_info").submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "post",
		url: "/secure/update_user",
		data: $("#user_info").serialize(),
		success: function(response) {
			alert("user info is being updated");
		},
		error: function() {
			console.log(`error`);
		},
	});
});
