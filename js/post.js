moment.locale("ar");
function post() {
  var pages = Array.from(
    document.querySelectorAll("#pageSelect option:checked")
  ).map(function (ele) {
    return ele.value;
  });
  var title = document.getElementById("titleInput").value;
  var description = document.getElementById("desInput").value;
  var link = document.getElementById("linkInput").value;
  var type = document.getElementById("typeSelect").value;
  var forYou = document.getElementById("forYouCheck").checked;
  var date = moment().format("D MMMM YYYY");
  var imgInput = document.getElementById("formFile");

  if (imgInput.files && imgInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var imgSrc = e.target.result;
      var post = {
        pages: pages,
        title: title,
        description: description,
        link: link,
        imgSrc: imgSrc,
        type: type,
        date: date,
        forYou: forYou,
      };
      savePostToServer(post, pages);
      renderPost(post, pages);
    };
    reader.readAsDataURL(imgInput.files[0]);
  }
}

function savePostToServer(post) {
  axios
    .post("http://localhost:3001/savePost", post)
    .then((response) => {
      swal
        .fire({
          title: "Post Saved",
          text: "The post has been saved successfully ",
          icon: "success",
          confirmButtonColor: "#ffd369",
        })
        .then(function (result) {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function renderPost(post, pages) {
  var postHtml = `
        <div class="item">
            <div class="image">
                <img src="${post.img}" />
            </div>
            <div class="content">
                <div class="meta">
                    <span><i class="bi bi-clock"></i> ${post.date}</span>
                </div>
                <a class="header">${post.title}</a>
                <div class="description">
                    <p>${post.des}</p>
                </div>
                <div class="extra">
                    <div class="ui label">${post.type}</div>
                    <div class="ui animated button">
                    <a href="${post.link}" target="_blank">
                      <div class="visible content">Link</div>
                      <div class="hidden content">Go</div>
                    </a>
                  </div>
                </div>
            </div>
        </div>
        <div class="ui section divider"></div>
    `;
  pages.forEach(function (page) {
    var items = document.querySelector(`${page}Main`);
    if (items) {
      items.insertAdjacentHTML("beforeend", postHtml);
    }
  });

  if (post.forYou) {
    var sidePostHtml = `
            <div class="item">
                <div class="ui tiny image">
                    <img src="${post.img}" />
                </div>
                <div class="middle aligned content">
                    <a id="sideTitle" href="${post.link}" target="_blank">${post.title}</a>
                </div>
            </div>
            <div class="ui section divider"></div>
        `;

    pages.forEach(function (page) {
      var sideItems = document.querySelector(`${page}Side`);
      if (sideItems) {
        sideItems.insertAdjacentHTML("beforeend", sidePostHtml);
      }
    });
  }
}

function loadPostsFromServer() {
  axios.get("http://localhost:3001/getPosts").then(function (res) {
    const posts = res.data;
    posts.forEach(function (post) {
      renderPost(post, post.pages);
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  loadPostsFromServer();
});
