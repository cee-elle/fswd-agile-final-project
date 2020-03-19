const form = document.getElementById('searchForm');
form.addEventListener("submit", function (e) {
	e.preventDefault();
	const data = new FormData(form);

	// const str = $("#searchForm :input")
	// 	.filter(function (index, element) {
	// 		return $(element).val() != "";
	// 	})
	// 	.serialize();

	const user = {};
	for (var value of data.entries()) {
		user[value[0]] = value[1];
 }

	console.log(user);

	// $.ajax({
	// 	url: url,
	// 	type: "post",
	// 	data: str,
	// 	success: function (data) {
	// 		const user = data[0];
	// 		$("#user_list").append(
	// 			`<li>
	//               <div class="card" style="margin-top:30px">
	//                   <div class="card-body">
	//                       <h5 class="card-title">name: ${user.name}</h5>
	//                       <p class="card-text">food: ${user.food}</p>
	//                       <p class="card-text">allergies: ${user.allergies}</p>
	//                   </div>
	//               </div>
	//           </li>`
	// 		);
	// 	},
	// 	error: function (data) {
	// 		console.log(data);
	// 	}
	// });
});
