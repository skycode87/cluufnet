const loadDataFormGuest = ({ guest }) => {
  $("form.guest #firstname").val(guest.firstname);
  $("form.guest #lastname").val(guest.lastname);
  $("form.guest #email").val(guest.email);
  $("form.guest #phone").val(guest.phone);
  $("form.guest #address").val(guest.address);
  $("form.guest #city").val(guest.city);
  $("form.guest #country").val(guest.country);
  $("form.guest #startdate").val(guest.startdate);
  $("form.guest #profession").val(guest.profession);
  $("form.guest #facebook").val(guest.facebook);
  $("form.guest #instagram").val(guest.instagram);
  $("form.guest #youtube").val(guest.youtube);
  $("form.guest #linkedin").val(guest.linkedin);
  $("form.guest #bio").val(guest.bio);
  $("form.guest #sangretype").val(guest.sangretype);
  $("form.guest #genre").val(guest.genre);
  $("form.guest #alergies").val(guest.alergies);
  $("form.guest #bodylesson").val(guest.bodylesson);
  $("form.guest #secondaryphone").val(guest.secondaryphone);
  $("form.guest #birthdate").val(guest.birthdate);
  $("form.guest #instanceId").val(guest.instanceId);
  $("form.guest #guestId").val(guest._id);
  $("form.guest #pin").val(guest.pin);
  $("#guest-interest").text(guest.interests[0]);
  $(`form.guest #sangretype option[value='${guest.sangretype}']`).attr(
    "selected",
    true
  );
};

const getGuestsByUser = async (
  { instanceId, userId = null },
  { onSuccess = {}, onError = {} }
) => {
  const token = getParameterByNameURL("token");

  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
    userId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/gym_get_guests_user?${params1}`,
    true
  );
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

const getGuestApps = async ({ userId }, { onSuccess = {}, onError = {} }) => {
  const token = getParameterByNameURL("token");

  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    userId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem(
      "backend_url"
    )}/subscription_get_apps_by_user?${params1}`,
    true
  );
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

const getGuest = async (userId, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const token = getParameterByNameURL("token");

  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    userId: userId, //60d8678e1a9233bd8b0a9dba
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/gym_get_user?${params1}`,
    true
  );
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

const sendRequestGuestCluuf = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  var searchParams = new URLSearchParams(params2);

  fetch(`${localStorage.getItem("backend_url")}/user_gym_guest`, {
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

const connectToCluuf_guestForm = (
  {
    email,
    userId,
    firstname,
    lastname,
    genre,
    campaign = null,
    formId = null,
    instanceId = null,
    messagePosition = "top",
  },
  { onSuccess, onError }
) => {
  if (firstname.required) {
    if (firstname.value === "") {
      Swal.fire(firstname.message, "", "warning");
      return false;
    }
  }

  if (lastname.required) {
    if (lastname.value === "") {
      Swal.fire(lastname.message, "", "warning");
      return false;
    }
  }

  if (email.required) {
    if (email.value === "") {
      Swal.fire(email.message, "", "warning");
      return false;
    }
  }

  const params2 = {
    userId: userId.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    genre: genre.value,
    packId: formId,
    instanceId,
    campaign,
  };

  sendRequestGuestCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);

      if (res.ok) {
        Swal.fire(`El invitado ha sido registrado`, "", "success");
        setTimeout(() => location.reload(), 3000);
      } else {
        Swal.fire(`Error en actualización`, "", "warning");
      }

      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
    onError: () => {
      onError();
      Swal.fire(`Error en actualización`, "", "warning");
    },
    onFinally: () => {
      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
  });
};

const searchGuestbyText = ({ textValue, filter = false }) => {
  $(".contacts-list div").remove("");
  $(".contacts-list").append("<div><h2>Buscando...</h2></div>");
  getGuests(
    { instanceId: localStorage.getItem("instanceId"), textValue, filter },
    {
      onSuccess: (usersResult) => {
        if (usersResult.result.length < 1) {
          $(".current-contact div").remove();
          $(".contacts-list div").remove();
          $(".contacts-list").append(
            `<div><h4><img  src="media/icons/cerrar.svg" width="20px" alt="author"> No se encontraron resultados para [ ${textValue} ]</h4></div>`
          );
        } else {
          $(".contacts-list div").remove("");
          $(".overlay-loading").hide();
          $.each(usersResult.result, function (i, n) {
            var avatar = "media/no-avatar.png";

            if (n.avatar) {
              avatar = n.avatar;
            }

            $(".contacts-list").append(`<div class="col-xl-3 col-lg-4 col-md-6">
              <div class="widget-author">
                  <div class="author-heading">
                      <div class="cover-img">
                      <img src="media/fondo.jpg" alt="cover">
                      </div>
                      <div class="profile-img">
                          <a href="#">
                              <img width="100px"  src="${avatar}" alt="author">
                          </a>
                      </div>
                      <div class="profile-name">
                      <h2>${n.pin || ""}</h2>
                          <h2 class="author-name" style="font-size: 22px; line-height: 26px">${
                            n.firstname || ""
                          } <br> ${n.lastname || ""}</h2>
                          <div class="author-location"> ${n.email || ""}</div>
                      </div>
                  </div>
                  <ul class="author-badge">
                  </ul>
  
                  <a href="javascript:openPanelUser({ userId: '${
                    n._id
                  }',num: 0})" class="button-slide">
                  <span class="btn-text"> Abrir </span>
                  <span class="btn-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21px" height="10px">
                          <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"></path>
                      </svg>
                  </span>
              </a>
  
              </div>
          </div>`);
          });
        }
      },
    }
  );
};

const createAsistenciaGuestRequest = (
  { userId },
  { onSuccess = {}, onError = {} }
) => {
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

const createAsistenciaExternalGuestRequest = (
  { userId, token, instanceId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();

  const params1 = new URLSearchParams({
    instanceId,
    userId, //60d8678e1a9233bd8b0a9dba
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

const createAsistenciaGuest = () => {
  createAsistenciaUserRequest(
    { userId: $("#userIdAssistencia").val() },
    {
      onSuccess: (usersResult) => {
        Swal.fire(`El usuario ha sido actualizado`, "", "success");
        closePanelContent();
        openPanelUser({ userId: $("#userIdAssistencia").val(), num: 1 });
      },
      onError: () => {
        Swal.fire(`Error en actualización`, "", "warning");
      },
    }
  );
};

const searchGuests = () => {
  const value = $("#search-user-value").val();
  searchGuestbyText({ textValue: value });
};

const submitGuestForm = () => {
  connectToCluuf_guestForm(
    {
      userId: {
        value: $("form.user #userId").val(),
        required: false,
      },
      email: {
        value: $("form.guest #email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("form.guest #firstname").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      lastname: {
        value: $("form.guest #lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      genre: {
        value: $("form.guest #genre").val(),
        required: true,
        message: "Please verify genre and try again.",
      },
      formId: $("form.guest #formId").val(), // proporcionado por cluuf-web
      instanceId: localStorage.getItem("instanceId"), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: "guest",
    },
    {
      onSuccess: (response) => {},
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const renderGuests = (data) => {
  $("#guestsTable tbody tr").remove();
  data.forEach((element) => {
    $("#guestsTable tbody").append(` <tr>
  <td>${element.firstname} ${element.lastname}</td>
  <td class="text-center">${element.email}</td>
  <td>${dateFormat2(element.startDate)}</td>
  <td>${element.genre}</td>
  <td><b>${element.userId.firstname} ${element.userId.lastname}</b></td>
</tr>`);
  });
};

const searchGuestsByUser = ({ onSuccess = {}, onError = {} }) => {
  getGuestsByUser(
    {
      instanceId: localStorage.getItem("instanceId"),
      userId: $("form.user #userId").val(),
    },
    {
      onSuccess: (usersResult) => {
        if (usersResult.result.length < 1) {
          onError();
        } else {
          onSuccess(usersResult);
        }
      },
    }
  );
};

$(document).ready(function () {});
