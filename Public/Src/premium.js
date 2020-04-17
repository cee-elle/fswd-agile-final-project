const summary = document.querySelectorAll(".recipe_summary");
summary.forEach((x) => {
	x.addEventListener("submit", (e) => {
		e.preventDefault();
		let id = "";
		$.ajax({
			type: "post",
			url: "/api/spoonacular_summary",
			data: $(x).serialize(),
			success: function (response) {
				id = response.info.id;
				$(`#${id}space`).empty();
				$(`#${id}space`).append(`
				<div class="card-content" >				
					<div class="content">
					  ${response.info.summary}
					</div>
				  </div>`);
				$(`#${id}`).addClass("is-active");
				$("html").css("overflow-y", "hidden");
			},
			error: (err) => {
				alert(err);
			},
		});
		$(`.${id}delete`).click(function () {
			$(`#${id}`).removeClass("is-active");
			$("html").css("overflow-y", "scroll");
		});
	});
});

const frm = document.querySelectorAll(".recipe_info");
frm.forEach((recipe) => {
	recipe.addEventListener("submit", (e) => {
		let id = "";
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "/api/spoonacular_instruction",
			data: $(recipe).serialize(),
			success: function (response) {
				const steps = response.info;
				id = response._id;
				$(`#${id}space`).empty();
				steps.forEach((step) => {
					$(`#${id}space`).append(`
					<div class="card-content" style="border:1px solid black">
					 <div class="media">
						<h3>Equipment:</h3>
							${get_all(step.equipment, "equipment")}
						<h3>Ingredients</h3>	
							${get_all(step.ingredients, "ingredient")}
					</div>
				
					<div class="content">
					  ${step.step}
					</div>
				  </div>`);
				});
				$(`#${id}`).addClass("is-active");
			},
			error: (err) => {
				console.log(err);
			},
		});

		$(`.${id}delete`).click(function () {
			$(`#${id}`).removeClass("is-active");
		});
	});
});

function get_all(arr, type) {
	let text = "";
	let src = "";
	if (type == "equipment") {
		src = "https://spoonacular.com/cdn/equipment_100x100/";
	} else {
		src = "https://spoonacular.com/cdn/ingredients_100x100/";
	}
	arr.forEach((x) => {
		text += `<div class="media-left">
		<figure class="image is-48x48">
		  <img src="${src}${x.image}" alt="Placeholder image">
		</figure>
	  </div>
	  <div class="media-content">
		<p class="subtitle is-6">${x.name}</p>
	  </div>`;
	});
	return text;
}
