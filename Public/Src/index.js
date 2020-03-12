$(function() {
	const frm = $("#searchForm");
	frm.submit(function(e) {
		e.preventDefault();
		const url = "/api/getinfo";
		$("#q").html("");
		var str = $("#searchForm :input")
			.filter(function(index, element) {
				return $(element).val() != "";
			})
			.serialize();
		console.log(str);

		$.ajax({
			url: url,
			type: "POST",
			data: str,
			success: function(data) {
				data.forEach((x) => {
					console.log(x);
					$("#q").append(
						`<div class="card" style="margin-top:30px">
                    <div class="card-body">
                      <h5 class="card-title">${x.recipe.label}</h5>
                      <p>Cal: ${Math.trunc(x.recipe.calories)}</p>
                      <p>Portion: ${x.recipe.yield}</p>
                      <p>Cal/Serving: ${Math.trunc(
												x.recipe.calories / x.recipe.yield
											)}</p>
                      <p class="card-text">${get_all(x.recipe.healthLabels)}</p>
                      </div>
                  </div>`
					);
				});
			},
			error: function(data) {
				console.log(`error`);
			}
		});
	});

	function get_all(arr) {
		let text = "";
		arr.forEach((x) => {
			text += `<p class="card-text">${x}</p>`;
		});
		return text;
	}
});
