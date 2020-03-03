const frm = $("#searchForm");
frm.submit(function(e) {
  e.preventDefault();
  const url = "/api/getinfo";
  //   const url = "/get-info";
  const food = $("#food").val();
  const health = $("#health").val();
  const cal = $("#calSearch").val();

  $("#q").html("");
  var str = $("#searchForm :input")
    .filter(function(index, element) {
      return $(element).val() != "";
    })
    .serialize();

  $.ajax({
    url: url,
    type: "POST",
    data: str,
    success: function(data) {
      data.forEach(x => {
        $("#q").append(
          `<div class="card" style="margin-top:30px">
              <div class="card-body">
                <h5 class="card-title">${x.recipe.label}</h5>
                Cal: ${Math.trunc(x.recipe.calories)}
                <p class="card-text">${get_all(x.recipe.healthLabels)}</p>
                </div>
            </div>`
        );
        // $("#a").append(
        //   x.recipe.healthLabels.forEach(x => {
        //     `<li class="list-group-item">Cras justo odio</li>`;
        //   })
        // );
      });
    },
    error: function(data) {
      console.log(`error`);
    }
  });
});

function get_all(arr) {
  let text = "";
  arr.forEach(x => {
    text += `<p class="card-text">${x}</p>`;
  });
  return text;
}
