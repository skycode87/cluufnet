const backend_url_ = "https://cluufweb-backend.herokuapp.com";
// const backend_url_ = ("https://38c7-2800-e2-180-e7f-58ee-c0b7-c44b-51e4.ngrok.io");

const getParameterByName_pack = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const getParameterByNameURL = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

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

const getUsers = async (
  { instanceId, textValue },
  { onSuccess = {}, onError = {} }
) => {
  const token = getParameterByNameURL("token");

  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
    textValue,
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/gym_get_users?${params1}`, true);
  xhttp.setRequestHeader("Authorization", token);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getUser = async (userId, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const token = getParameterByNameURL("token");

  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    userId: userId, //60d8678e1a9233bd8b0a9dba
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/gym_get_user?${params1}`, true);
  xhttp.setRequestHeader("Authorization", token);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const createAsistencia = ({ userId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const token = getParameterByNameURL("token");

  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    userId: userId, //60d8678e1a9233bd8b0a9dba
    message: $("#message-asistencia").val(),
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/gym_get_user_asistencia?${params1}`, true);
  xhttp.setRequestHeader("Authorization", token);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getConnection = ({ onSuccess = {}, onError = {} }) => {
  const alias = getParameterByName_pack("agency");
  const token = getParameterByName_pack("token");
  const user = getParameterByName_pack("user");
  const mode = getParameterByName_pack("atm");

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

const sendRequestUserCluuf = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  //const code = "67896789987656789"; //localStorage.getItem("usr");
  //const paramsform = `date=${date}&time=${time}&code=${code}&quantity=${quantity}&instanceId=${instanceId}&packId=${packId}&name=${name}&email=${email}&message=${message}&phone=${phone}&packId=${packId}`;

  var searchParams = new URLSearchParams(params2);

  fetch("https://38c7-2800-e2-180-e7f-58ee-c0b7-c44b-51e4.ngrok.io/user_gym", {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: searchParams.toString(),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      onSuccess(data);
    })
    .catch(function (err) {
      onError(err);
      console.log(err);
    })
    .finally(function () {
      onFinally({
        ok: true,
      });
    });
};

const connectToCluuf_userForm = (
  {
    email,
    pin,
    userId,
    firstname,
    lastname,
    address,
    city,
    country,
    phone,
    genre,
    sangretype,
    birthdate,
    secondaryphone,
    bodylesson,
    alergies,
    facebook,
    youtube,
    linkedin,
    instagram,
    bio,
    campaign = null,
    formId = null,
    instanceId = null,
    successMessage = "",
    messagePosition = "top",
    messageVisible = true,
  },
  { onSuccess, onError }
) => {
  if (firstname.required) {
    if (firstname.value === "") {
      cluufAlert_pack({
        type: "error",
        tiuserIdle: "Invalid Field",
        message: firstname.message,
        messagePosition,
      });
      return false;
    }
  }

  if (lastname.required) {
    if (lastname.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: lastname.message,
        messagePosition,
      });
      return false;
    }
  }

  if (email.required) {
    if (email.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: email.message,
        messagePosition,
      });
      return false;
    }
  }

  if (phone.required) {
    if (phone.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: phone.message,
        messagePosition,
      });
      return false;
    }
  }

  //$("form.user .li-submit").hide();
  //$("form.user .li-loading").show();

  const params2 = {
    pin: pin.value,
    userId: userId.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    phone: phone.value,
    genre: genre.value,
    birthdate: birthdate.value,
    address: address.value,
    city: city.value,
    country: country.value,
    alergies: alergies.value,
    bodylesson: bodylesson.value,
    sangretype: sangretype.value,
    bio: bio.value,
    facebook: facebook.value,
    instagram: instagram.value,
    linkedin: linkedin.value,
    youtube: youtube.value,
    secondaryphone: secondaryphone.value,
    packId: formId,
    instanceId,
    campaign,
  };

  sendRequestUserCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);

      console.log(res);

      if (res.ok) {
        cluufAlert_profile({
          type: "success",
          title: "Information Sent!",
          message: successMessage,
          messagePosition: "bottom",
        });

        setTimeout(() => location.reload(), 3000);
      }

      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
    onError: () => {
      onError();
      cluufAlert_pack({
        type: "error",
        title: "",
        message: "Error enviando la información!",
        messagePosition: "bottom",
      });
    },
    onFinally: () => {
      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
  });
};
