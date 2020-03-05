const frm = $("#searchForm");
frm.submit(function(e) {
  e.preventDefault();
  const url = "/api/getinfo";
  //   const url = "/get-info";
  let str = $("#searchForm :input")
    .filter(function(index, element) {
      return $(element).val() != "";
    })
    .serialize();
  $.ajax({
    url: url,
    type: "post",
    data: str,
    success: function(data) {
      $("#q").empty();
      data.forEach(x => {
        $("#q").append(
          `<div class="card" style="margin-top:30px">
              <div class="card-body">
                <h5 class="card-title">${x.recipe.label}</h5>
                <p class="card-text">${get_all(x.recipe.healthLabels)}</p>
                <ul>
                  <p>calories: ${x.recipe.calories}</p>
                  <p>weight: ${x.recipe.totalWeight}</p>
                </ul>
                </div>
            </div>`
        );
      });
    },
    error: function(data) {
      console.log(`error,${data}`);
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
