const getInstance = async (
  { instanceId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/tour_get_instance?${params1}`, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      console.log(result);
      onSuccess(result.instance[0]);
    }
  };
  xhttp.send();
};

const getParameterByName2 = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const getConnection = ({ onSuccess = {}, onError = {} }) => {
  const alias = getParameterByName2("agency");
  const token = getParameterByName2("token");
  const user = getParameterByName2("user");
  const mode = getParameterByName2("atm");

  try {
    const xhttp = new XMLHttpRequest();

    xhttp.open(
      `GET`,
      `${backend_url_}/instanceByTokenUser/${alias}/${user}/${mode}`,
      true
    );
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", token);

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(xhttp.responseText);
        onSuccess(result);
      }
    };
    xhttp.send();
  } catch {}
};

/* CLUUF CONTENT  */

const loadCluufPackContent = ({
  method = "GET",
  params = "",
  url = "",
  body = null,
  contentType = "application/x-www-form-urlencoded",
}) => {
  try {
    const xhttp = new XMLHttpRequest();
    var searchParams = new URLSearchParams(params);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", contentType);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        var status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const result = JSON.parse(xhttp.responseText);
          sessionStorage.setItem("galleryPackCount", 0);
          let index = parseInt(sessionStorage.getItem("galleryPackCount"));

          Object.keys(result).forEach((key) => {
            index = sessionStorage.getItem("galleryPackCount");

            if (
              String(result[key].code).indexOf(
                sessionStorage.getItem("packname")
              ) > -1
            ) {
              if (result[key].type === "TEXT") {
                $(`.clf-content-pack_${result[key].tag}`).html(
                  result[key].content
                );
              }

              if (result[key].type === "LIST") {
                if (String(result[key].content).length > 2) {
                  let listado = result[key].content.split(",");
                  $(`.clf-list-pack_${result[key].tag} li`).remove();
                  listado.forEach((key2, index) => {
                    $(`.clf-list-pack_${result[key].tag}`).append(
                      `<li>${key2}</li>`
                    );
                  });
                } else {
                  $(`.is-cluuf-pack-${result[key].tag}`).hide();
                }
              }

              if (result[key].type === "HTML") {
                $(`.clf-content-pack_${result[key].tag}`).html(
                  result[key].content
                );
              }

              if (result[key].type === "IMAGE") {
                if (
                  String(result[key].code).indexOf(
                    sessionStorage.getItem("packname")
                  ) > -1
                ) {
                  // Editar todas las imagenes del pack
                  $(".imageUpdatePack").append(` 
                  <div class="col-lg-4 col-md-6">
                  <div class="block-box">
                      <div class="product-img">
                      <img  class="clf-src-pack_${result[key].tag}  tagpack_ active " alt="related" src="${result[key].content}" class="img-fluid" />
                      </div>
                  </div>
              </div>`);

                  if (result[key].tag === "avatar") {
                    sessionStorage.setItem(
                      "galleryPackCount",
                      parseInt(index) + 1
                    );

                    $(".images-tab-content")
                      .append(`<div role="tabpanel" class="tab-pane fade active show" id="related${index}"><a href="#">
                      <img class="img-fluid" alt="single" src=${result[key].content}></a></div>`);

                    $(".images-tab-list").append(`<li class="nav-item">
                      <a  href="#related${index}" data-toggle="tab" aria-expanded="false">
                          <img alt="related${index}" src="${result[key].content}" class="img-fluid" />
                      </a>
                  </li>`);
                  } else if (String(result[key].tag).indexOf("gallery") > -1) {
                    sessionStorage.setItem(
                      "galleryPackCount",
                      parseInt(index) + 1
                    );

                    $(".images-tab-list").append(`<li class="nav-item">
                    <a  href="#related${index}" data-toggle="tab" aria-expanded="false">
                        <img alt="related${index}" src="${result[key].content}" class="img-fluid" />
                    </a>
                </li>`);

                    $(".container-gallery")
                      .append(`<div class="col-lg-3 col-md-4 col-6">
                                  <div class="user-group-photo">
                                      <a href="${result[key].content}" class="popup-zoom">
                                          <img src="${result[key].content}" alt="Gallery" class="img-fluid">
                                      </a>
                                  </div>
                              </div>`);

                    $(".images-tab-content")
                      .append(`<div role="tabpanel" class="tab-pane fade" id="related${index}">
                <a href="#">
                    <img class="img-fluid" alt="single" src="${result[key].content}">
                </a>
            </div>`);
                  } else {
                    $(`.clf-src-pack_${result[key].tag}`).attr(
                      "src",
                      result[key].content
                    );
                  }
                }
              }
            }
          });
        } else {
        }
      }
    };
    xhttp.send();
  } catch (error) {}
};

const loadCluufContent = ({
  method = "GET",
  params = "",
  url = "",
  body = null,
  contentType = "application/x-www-form-urlencoded",
}) => {
  try {
    const xhttp = new XMLHttpRequest();
    var searchParams = new URLSearchParams(params);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", contentType);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        var status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const result = JSON.parse(xhttp.responseText);
          Object.keys(result).forEach((key) => {
            if (result[key].type === "TEXT") {
              $(`.clf-content-${result[key].code}`).html(result[key].content);
            }

            if (result[key].tag === "primaryColor") {
              console.log(result[key].tag, `${result[key].content} !important`);
              $(".fixed-header .header-menu").css(
                "background-color",
                result[key].content
              );
            }

            if (result[key].tag === "coverImage") {
              $(".product-breadcrumb.image-cover").css(
                "background-image",
                `url(${result[key].content})`
              );

              $(".product-breadcrumb.image-cover").addClass(
                "clf-src-general_coverImage tag_"
              );
            }

            if (result[key].type === "LIST") {
              let listado = result[key].content.split(",");
              listado.forEach((key2, index) => {
                console.log(`.cluuf-list-${result[key].code}-${index}`, key2);
                $(`.clf-list-${result[key].code}-${index}`).text(key2);
              });
            }

            if (result[key].type === "HTML") {
              $(`.clf-content-${result[key].code}`).html(result[key].content);
            }

            if (result[key].type === "IMAGE") {
              $(`.clf-src-${result[key].code}`).attr(
                "src",
                result[key].content
              );
            }
          });
        } else {
        }
      }
    };
    xhttp.send();
  } catch (error) {}
};

/* USER PROFILE */

const cluufAlert_profile = ({
  type = "success",
  title = "",
  message = "",
  messagePosition = "top",
}) => {
  var positionClass = "cluuf-alert-top";
  if (messagePosition === "bottom") {
    positionClass = "cluuf-alert-bottom";
  }

  $("form.user").append(
    `<div  onclick="this.style.display='none'" class="cluuf-alert ${positionClass} ${type}"><span class="closebtn" >&times;</span>&nbsp;&nbsp;<span class="text">${message}</span></div>`
  );
  setTimeout(function () {
    $(".cluuf-alert").hide("fast");
  }, 5000);
};
