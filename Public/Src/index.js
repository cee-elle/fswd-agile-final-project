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
						`<div class="column is-4">
							<div class="card">
							<div class="card-image">
								<figure class="image is-4by3 ">
									<img
										src="${x.recipe.image}"
										alt="Food Image "
									/>
								</figure>
							</div>
							<div class="card-content ">
								<div class="media ">
									<div class="media-content ">
										<p class="is-size-6" style="color:black;"><strong>${x.recipe.label}</strong></p>
										
									</div>
								</div>
								<div class="buttons ">
                                                    <a class="button is-small is-light " style="margin:0 3px 3px 0; padding:2px 7px ">
                                                        <span class="icon "><i class="far fa-clock "></i></span>
                                                        <span>${
																													x.recipe.totalTime
																												} mins</span>
                                                    </a>
                                                    <a class="button is-small is-light " style="margin:0 3px 3px 0; padding:2px 7px ">
                                                        <span class="icon "><i class="fas fa-utensils "></i></span>
                                                        <span>${
																													x.recipe.yield
																												}</span>
                                                    </a>
                                                    <a class="button is-small is-light " style="margin:0 3px 3px 0; padding:2px 7px ">
                                                        <span class="icon "><i class="fas fa-fire "></i></span>
                                                        <span>${Math.trunc(
																													x.recipe.calories /
																														x.recipe.yield
																												)} kcal</span>
                                                    </a>



                                                </div>
								<section class="card-body ">
									<div class="content ">
										meta data
									</div>
								</section>
								
								<div class="buttons ">
								${get_all(x.recipe.healthLabels)}
								</div>
								
							</div>
							<div class="buttons is-centered ">
								<a
									href="/secure/view_recipe"
									class="button is-success is-rounded "
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
			text += `
			<a class="button is-small is-success is-inverted " style="margin:0; padding:5px ">
                <span class="icon "><i class="far fa-check-square "></i></span>
                <span>${x}</span>
            </a>
			`;
		});
		return text;
	}
});
