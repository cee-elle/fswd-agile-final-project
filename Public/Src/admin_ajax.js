/**
 * AJAX request to backend server
 * @param {String} url backend url
 * @param {String} data URL encoded form data (serialized)
 */
const ajax_request = (url, data) => {
	$.ajax({
		url: url,
		type: "post",
		data: data,
		success: function(data) {
			alert(`${data} `);
		},
		error: function(data) {
			console.log(data);
		},
	});
};

// adds an event listener for each user card
const u_f = document.querySelectorAll(".user_info");
u_f.forEach((x) => {
	x.addEventListener("click", (e) => {
		e.preventDefault();
		const type = $(e.target).attr("name");
		const data = $(x).serialize();
		// sends AJAX request to appropriate endpoints
		if (type == "update") {
			ajax_request("/admin/update", data);
		}
		if (type == "delete") {
			ajax_request("/admin/delete", data);
			$(x).remove();
		}
	});
});
