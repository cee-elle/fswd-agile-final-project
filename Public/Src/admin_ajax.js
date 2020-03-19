const form = document.getElementById("searchForm");
// form.addEventListener("submit", function(e) {
// 	e.preventDefault();
// 	const data = new FormData(form);

// 	const user = {};
// 	for (var value of data.entries()) {
// 		user[value[0]] = value[1];
// 	}

// 	console.log(user);

// 	// $.ajax({
// 	// 	url: url,
// 	// 	type: "post",
// 	// 	data: str,
// 	// 	success: function (data) {
// 	// 		const user = data[0];
// 	// 		$("#user_list").append(
// 	// 			`<li>
// 	//               <div class="card" style="margin-top:30px">
// 	//                   <div class="card-body">
// 	//                       <h5 class="card-title">name: ${user.name}</h5>
// 	//                       <p class="card-text">food: ${user.food}</p>
// 	//                       <p class="card-text">allergies: ${user.allergies}</p>
// 	//                   </div>
// 	//               </div>
// 	//           </li>`
// 	// 		);
// 	// 	},
// 	// 	error: function (data) {
// 	// 		console.log(data);
// 	// 	}
// 	// });
// });

// const update = document.querySelectorAll(".update");
// update.forEach((x) => {
// 	x.addEventListener("click", (e) => {
// 		e.preventDefault();
// 		const id = document.querySelector(".id_name");
// 		const str = $("#user_info :input")
// 			.filter(function(index, element) {
// 				return $(element).val() != "";
// 			})
// 			.serialize();
// 		console.log(str);
// 	});
// });

// const delete_r = document.querySelectorAll(".delete");
// delete_r.forEach((x) => {
// 	x.addEventListener("click", (e) => {
// 		e.preventDefault();

// 		console.log("i am delete");
// 	});
// });

const u_f = document.querySelectorAll(".user_info");
u_f.forEach((x) => {
	x.addEventListener("click", (e) => {
		e.preventDefault();
		const type = $(e.target).attr("name");
		const data = $(x).serialize();
		if (type == "update") {
			console.log(type, data);
		} else {
			console.log(type, data);
		}
	});
});
