const summary = document.querySelectorAll(".recipe_summary");
summary.forEach((x) => {
	x.addEventListener("submit", (e) => {
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "/api/spoonacular_summary",
			data: summary.serialize(),
			dataType: "dataType",
			success: function(response) {
				console.log(response);
			},
			error: (err) => {
				alert(err);
			},
		});
	});
});

const frm = document.querySelectorAll(".recipe_info");
frm.forEach((x) => {
	x.addEventListener("submit", (e) => {
		let id = "";
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "/api/spoonacular_instruction",
			data: $(x).serialize(),
			success: function(response) {
				const step = response.info;
				console.log(step);
				id = response._id;
				step.forEach((x) => {
					$(`#${id}space`).append(`
					<div class="card-content" style="border:1px solid black">
					 <div class="media">
						<h3>Equipment:</h3>
							${get_all(x.equipment, "equipment")}
						<h3>Ingredients</h3>	
							${get_all(x.ingredients, "ingredient")}
					</div>
				
					<div class="content">
					  ${x.step}
					</div>
				  </div>`);
				});
				$(`#${id}`).addClass("is-active");
			},
			error: (err) => {
				console.log(err);
			},
		});

		$(`.${id}delete`).click(function() {
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
