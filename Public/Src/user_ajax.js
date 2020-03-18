const frm = $("#searchForm");
frm.submit(function (e) {
	e.preventDefault();
	const url = "/admin/a";
	var str = $("#searchForm :input")
		.filter(function (index, element) {
			return $(element).val() != "";
		})
		.serialize();
	$.ajax({
		url: url,
		type: "post",
		data: str,
		success: function (data) {
			const user = data[0];
			$("#user_list").append(
				`<li>
                <div class="card" style="margin-top:30px">
                    <div class="card-body">
                        <h5 class="card-title">name: ${user.name}</h5>
                        <p class="card-text">food: ${user.food}</p>
                        <p class="card-text">allergies: ${user.allergies}</p>
                    </div>
                </div>
            </li>`
			);
		},
		error: function () {
			console.log(`error`);
		}
	});
});
