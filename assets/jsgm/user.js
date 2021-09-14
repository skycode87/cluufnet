const loadDataFormUSer = ({ user }) => {
  $("form.user #firstname").val(user.firstname);
  $("form.user #lastname").val(user.lastname);
  $("form.user #email").val(user.email);
  $("form.user #phone").val(user.phone);
  $("form.user #address").val(user.address);
  $("form.user #city").val(user.city);
  $("form.user #country").val(user.country);
  $("form.user #startdate").val(user.startdate);
  $("form.user #profession").val(user.profession);
  $("form.user #facebook").val(user.facebook);
  $("form.user #instagram").val(user.instagram);
  $("form.user #youtube").val(user.youtube);
  $("form.user #linkedin").val(user.linkedin);
  $("form.user #bio").val(user.bio);
  $("form.user #sangretype").val(user.sangretype);
  $("form.user #genre").val(user.genre);
  $("form.user #alergies").val(user.alergies);
  $("form.user #bodylesson").val(user.bodylesson);
  $("form.user #secondaryphone").val(user.secondaryphone);
  $("form.user #birthdate").val(user.birthdate);
  $("form.user #instanceId").val(user.instanceId);
  $("form.user #userId").val(user._id);
  $("form.user #pin").val(user.pin);
  $("#user-interest").text(user.interests[0]);
  $(`form.user #sangretype option[value='${user.sangretype}']`).attr(
    "selected",
    true
  );
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

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/gym_get_users?${params1}`,
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

const getUser = async (userId, { onSuccess = {}, onError = {} }) => {
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

const sendRequestUserCluuf = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  var searchParams = new URLSearchParams(params2);

  fetch(`${localStorage.getItem("backend_url")}/user_gym`, {
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

      if (res.ok) {
        Swal.fire(`El usuario ha sido actualizado`, "", "success");
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

const searchUserbyText = ({ textValue }) => {
  $(".contacts-list div").remove("");
  $(".contacts-list").append("<div><h2>Buscando...</h2></div>");
  getUsers(
    { instanceId: localStorage.getItem("instanceId"), textValue },
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

const createAsistenciaUserRequest = (
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

const createAsistenciaUser = () => {
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

const openPanelUser = ({ userId, num }) => {
  $(".team-container").hide();
  $(".teams-container").hide();
  getUser(
    userId,
    {
      onSuccess: (result) => {
        const userdata = result.result;
        const events = result.events;
        $(".contact-container table-asistencia tbody tr").remove();
        loadDataFormUSer({ user: userdata });
        $.each(events, function (i, n) {
          $(".contact-container .table-asistencia tbody").append(` 
            <tr>
              <td> <img width="18px" src="media/icons/entrar.svg"> ${n.title} <small>${n.description}</small></td>
            </tr>`);
        });

        sessionStorage.setItem("currentUserId", userId);
        $(".contacts-container").hide();
        $(".contact-container").show();

        $("#userIdAssistencia").val(userId);
        var avatar = "media/no-avatar.png";

        if (userdata.avatar) {
          avatar = userdata.avatar;
        }
        $(".current-contact")
          .append(`<div class="col-xl-12 col-lg-12 col-md-12">
          <div class="widget-author" style="background: #fff">
              <div class="author-heading">
                  <div class="cover-img">
                      <img src="media/fondo.jpg" alt="cover">
                  </div>
                  <div class="profile-img">
                      <a href="#">
                          <img width="100px"  src="${avatar}" alt="author">
                      </a>
                  </div>
                  <h4 style="font-size: 28px;">${userdata.pin || ""}</h4> 
                  <div class="profile-name">
                      <h2 class="author-name" style="font-size: 22px; line-height: 26px">${
                        userdata.firstname || ""
                      } <br> ${userdata.lastname || ""}</h2>
                      <div class="author-location">${userdata.email || ""}</div>
                  </div>
              </div>

              <ul class="menu-options">
              <li><a href="javascript:openPanelContent(1)">Historial de Eventos</a></li>
              <li><a href="javascript:openPanelContent(2)">Otra cosa</a></li> 
              <li><a href="javascript:resetPasswordUser()">Resetear Password</a></li> 
              <li><a href="javascript:openPanelContent(3)">Editar Perfil</a></li>
              <li><a href="javascript:openPanelContent(0)">Marcar Asistencía</a></li>
              </ul>

  
              <div class="form-group">
              <input type="button" onClick="closePanelContent()"  class="submit-btn" value="Volver atrás">
          </div>
          
          </div>
      </div>`);

        openPanelContent(num);
      },
    },
    {
      onError: () => {},
    }
  );
};

const searchUsers = () => {
  const value = $("#search-user-value").val();
  searchUserbyText({ textValue: value });
};

const submitPack = () => {
  connectToCluuf_Pack(
    {
      email: {
        value: $("#email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      name: {
        value: $("#name").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      phone: {
        value: $("#phone").val(),
        required: true,
        message: "Please verify phone and try again.",
      },
      quantity: {
        value: $("#quantity").val(),
        required: true,
        message: "Please verify quantity and try again.",
      },
      message: {
        value: $("#message").val(),
        required: false,
        message: "Please verify Message and try again.",
      },
      date: {
        required: true,
        value: $("#date").val(),
        message: "Please verify date and try again.",
      },
      time: {
        required: true,
        value: $("#time").val(),
        message: "Please verify time and try again.",
      },
      formId: $("#formId").val(), // proporcionado por cluuf-web
      instanceId: $("#instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: localStorage.getItem("cluufpackname"),
    },
    {
      onSuccess: (response) => {
        $("#name").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#message").val("");
        $("#quantity").val("0");
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const submitUserForm = () => {
  connectToCluuf_userForm(
    {
      userId: {
        value: $("form.user #userId").val(),
        required: false,
      },
      pin: {
        value: $("form.user #pin").val(),
        required: false,
      },
      email: {
        value: $("form.user #email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("form.user #firstname").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      lastname: {
        value: $("form.user #lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      address: {
        value: $("form.user #address").val(),
        required: false,
      },
      city: {
        value: $("form.user #city").val(),
        required: false,
      },
      country: {
        value: $("form.user #country").val(),
        required: false,
      },
      phone: {
        value: $("form.user #phone").val(),
        required: true,
        message: "Please verify phone and try again.",
      },
      genre: {
        value: $("form.user #genre").val(),
        required: true,
        message: "Please verify genre and try again.",
      },
      sangretype: {
        value: $("form.user #sangretype").val(),
        required: false,
        message: "Please verify Tipo de Sangre and try again.",
      },
      birthdate: {
        required: true,
        value: $("form.user #birthdate").val(),
        message: "Please verify date and try again.",
      },
      secondaryphone: {
        value: $("form.user #secondaryphone").val(),
        required: false,
      },
      bodylesson: {
        value: $("form.user #bodylesson").val(),
        required: false,
      },
      alergies: {
        value: $("form.user #alergies").val(),
        required: false,
      },
      facebook: {
        value: $("form.user #facebook").val(),
        required: false,
      },
      youtube: {
        value: $("form.user #youtube").val(),
        required: false,
      },
      linkedin: {
        value: $("form.user #linkedin").val(),
        required: false,
      },
      instagram: {
        value: $("form.user #instagram").val(),
        required: false,
      },
      bio: {
        value: $("form.user #bio").val(),
        required: false,
      },
      formId: $("form.user #formId").val(), // proporcionado por cluuf-web
      instanceId: $("form.user #instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: "user",
    },
    {
      onSuccess: (response) => {},
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const requestResetPasswordUser = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  var searchParams = new URLSearchParams({
    ...params2,
    instanceId: localStorage.getItem("instanceId"),
  });
  fetch(`${localStorage.getItem("backend_url")}/resetpassword_user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: getParameterByNameURL("token"),
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

const resetPasswordUser = () => {
  Swal.fire({
    title: `Confirma que desea resetear la contraseña de ${$(
      "form.user #firstname"
    ).val()} ?`,
    showDenyButton: true,
    confirmButtonText: "Resetear contraseña",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      requestResetPasswordUser(
        {
          userId: $("form.user #userId").val(),
        },
        {
          onSuccess: () => {
            Swal.fire(
              ` Se ha enviado un mensaje al correo electronico  ${$(
                "form.user #email"
              ).val()} `,
              "",
              "success"
            );
          },
          onError: () => {},
          onFinally: () => {},
        }
      );
    } else if (result.isDenied) {
      // Swal.fire("Changes are not saved", "", "info");
    }
  });
};

const openPanelContent = (number) => {
  $(".panel-content").hide();
  $(`.panel-content-${number}`).show("fast");
};

const closePanelContent = () => {
  $(".panel-content").hide();
  $(".contacts-container").show();
  $(".contact-container").hide();
  $(".current-contact div").remove();
};
