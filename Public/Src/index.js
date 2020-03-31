$(function() {
	const frm = $("#searchForm");
	// on searchForm submit, makes AJAX request to sever
	frm.submit(function(e) {
		e.preventDefault();
		const url = "/api/getinfo_normal";
		$("#recipe_card").html("");
		var str = $("#searchForm :input")
			.filter((index, element) => {
				return $(element).val() != "";
			})
			.serialize();
		$.ajax({
			url: url,
			type: "POST",
			data: str,
			success: function(data) {
				data.forEach((x) => {
					// takes data from server and builds HTML for each returned item
					$("#recipe_card").append(
						`<div class="column is-4 ">
							<div class="card">
							<div class="card-image">
								<figure class="image is-4by3 ">
									<img
										src="${x.recipe.image}"
										alt="Placeholder image "
									/>
								</figure>
							</div>
							<div class="card-content ">
								<div class="media ">
									<div class="media-content ">
										<p class="title is-4 ">${x.recipe.label}</p>
										<p class="subtitle "></p>
									</div>
								</div>
								<div class="tags ">
									<span class="tag ">
										<i class="far fa-clock "></i>${x.recipe.totalTime} mins
									</span>
									<span class="tag ">
										<i class="far fa-eye "></i>Views
									</span>
									<span class="tag ">
										<i class="fas fa-fire "></i>${Math.trunc(x.recipe.calories / x.recipe.yield)}
									</span>
									<span class="tag ">
									<i class="fas fa-utensils"></i>For ${x.recipe.yield}
									</span>
								</div>
								<section class="card-body ">
									<div class="content ">
										meta data
									</div>
								</section>
								<div class="tags ">
								${get_all(x.recipe.healthLabels)}
								</div>
								Source from: <small>${x.recipe.source}</small>
							</div>
							<div class="buttons is-centered ">
								<a
									href="/view_recipe"
									class="button is-primary is-rounded "
									style="text-align: center; "
								>
									View Recipe
								</a>
							</div>
							<br />
						</div>
						</div>`
					);
				});
			},
			error: function() {
				console.log(`error`); // TODO error popup
			},
		});
	});

	// loops through each health label
	function get_all(arr) {
		let text = "";
		arr.forEach((x) => {
			text += `<span class="tag has-text-success ">
			<i class="far fa-check-square "></i>${x}
		</span>`;
		});
		return text;
	}
});
