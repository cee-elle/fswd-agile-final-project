$(function() {
	const frm = $("#searchForm");
	frm.submit(function(e) {
		e.preventDefault();
		const url = "/api/getinfo";
		$("#recipe_card").html("");
		var str = $("#searchForm :input")
			.filter((index, element) => {
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
					$("#recipe_card").append(
						`<div class="col-sm-4">
				  <div class="card">
					  <img
						  class="card-img"
						  src="${x.recipe.image}"
						  alt=""
					  />
					  <div class="card-body">
						  <h4 class="card-title">${x.recipe.label}</h4>
						  <small class="text-muted cat">
							  <i class="far fa-clock text-info"></i> 30 minutes
							  <i class="fas fa-users text-info"></i> 4 portions
						  </small>
						  <p class="card-text">Portion: ${x.recipe.yield}</p>
						  <p class="card-text">Cal/Serving: ${Math.trunc(
								x.recipe.calories / x.recipe.yield
							)}</p>
							<div class="hL">${get_all(x.recipe.healthLabels)}</div>
					  </div>
					  <a href="#" class="btn btn-info">Read Recipe</a>
					  <div
						  class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0"
					  >
						  <div class="views">Oct 20, 12:45PM</div>
						  <div class="stats">
							  <i class="far fa-eye"></i> 1347 <i class="far fa-comment"></i> 12
						  </div>
					  </div>
				  </div>
			  </div>
			  `
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
			text += `<p>${x}</p>`;
		});
		return text;
	}
});
