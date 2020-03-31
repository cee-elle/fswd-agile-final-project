const ajax_request = (url, data) => {
	$.ajax({
		url: url,
		type: "post",
		data: data,
		success: function(data) {
			alert(`${data} Data Retreived.`);
		},
		error: function(data) {
			console.log(data);
		},
	});
};
const u_f = document.querySelectorAll(".user_info");
u_f.forEach((x) => {
	x.addEventListener("click", (e) => {
		e.preventDefault();
		const type = $(e.target).attr("name");
		const data = $(x).serialize();
		if (type == "update") {
			console.log(type, data);
			ajax_request("/admin/update", data);
		}
		if (type == "delete") {
			ajax_request("/admin/delete", data);
			$(x).remove();
		}
	});
});
