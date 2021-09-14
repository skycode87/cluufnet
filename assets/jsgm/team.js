const loadDataFormTeam = ({ team }) => {
  $("form.team #firstname").val(team?.firstname || "");
  $("form.team #lastname").val(team?.lastname || "");
  $("form.team #email").val(team?.email);
  $("form.team #phone").val(team?.phone);
  $("form.team #address").val(team?.address);
  $("form.team #city").val(team?.city);
  $("form.team #country").val(team?.country);
  $("form.team #startdate").val(team?.startdate);
  $("form.team #profession").val(team?.profession);
  $("form.team #facebook").val(team?.facebook);
  $("form.team #instagram").val(team?.instagram);
  $("form.team #youtube").val(team?.youtube);
  $("form.team #linkedin").val(team?.linkedin);
  $("form.team #bio").val(team?.bio);
  $("form.team #sangretype").val(team?.sangretype);
  $("form.team #genre").val(team?.genre);
  $("form.team #alergies").val(team?.alergies);
  $("form.team #bodylesson").val(team?.bodylesson);
  $("form.team #secondaryphone").val(team?.secondaryphone);
  $("form.team #birthdate").val(team?.birthdate);
  $("form.team #instanceId").val(team?.instanceId);
  $("form.team #teamId").val(team?._id);
  $("form.team #pin").val(team?.pin);
  $(`form.team #sangretype option[value='${team?.sangretype}']`).attr(
    "selected",
    true
  );
};

const getTeams = async (
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
    `${localStorage.getItem("backend_url")}/get_roots?${params1}`,
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

const getTeam = async (rootId, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const token = getParameterByNameURL("token");

  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    rootId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/get_root?${params1}`,
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

const sendRequestTeamCluuf = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  var searchParams = new URLSearchParams(params2);
  fetch(`${localStorage.getItem("backend_url")}/update_root`, {
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

const connectToCluuf_TeamForm = (
  {
    email,
    pin,
    teamId,
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
  console.log("ok team");

  /*
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
  */

  const params2 = {
    pin: pin.value,
    rootId: teamId.value,
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

  sendRequestTeamCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);

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

const searchTeambyText = ({ textValue }) => {
  $(".teams-list div").remove("");
  $(".teams-list").append("<div><h2>Buscando...</h2></div>");
  getTeams(
    { instanceId: localStorage.getItem("instanceId"), textValue },
    {
      onSuccess: (usersResult) => {
        if (usersResult.result.length < 1) {
          $(".current-team div").remove();
          $(".teams-list div").remove();
          $(".teams-list").append(
            `<div><h4><img  src="media/icons/cerrar.svg" width="20px" alt="author"> No se encontraron resultados para [ ${textValue} ]</h4></div>`
          );
        } else {
          $(".teams-list div").remove("");
          $(".overlay-loading").hide();
          $.each(usersResult.result, function (i, n) {
            var avatar = "media/no-avatar.png";

            if (n.avatar) {
              avatar = n.avatar;
            }

            $(".teams-list").append(`<div class="col-xl-3 col-lg-4 col-md-6">
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
  
                  <a href="javascript:openPanelTeam({ teamId: '${
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

const createAsistenciaTeamRequest = (
  { userId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const token = getParameterByNameURL("token");

  const params1 = new URLSearchParams({
    instanceId: localStorage.getItem("instanceId"),
    userId: userId,
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

const createAsistenciaTeam = () => {
  createAsistenciaTeamRequest(
    { userId: $("#userIdAssistencia").val() },
    {
      onSuccess: (usersResult) => {
        closePanelContentTeam();
        Swal.fire(`El usuario ha sido actualizado`, "", "success");
        openPanelTeam({ teamId: $("#teamIdAssistencia").val(), num: 1 });
      },
      onError: () => Swal.fire(`Error en actualización`, "", "error"),
    }
  );
};

const openPanelTeam = ({ teamId, num }) => {
  getTeam(
    teamId,
    {
      onSuccess: (result) => {
        const userdata = result.result;
        const events = result.events;
        $(".team-container .table-asistencia tbody tr").remove();
        loadDataFormTeam({ team: userdata });
        $.each(events, function (i, n) {
          $(".team-container .table-asistencia tbody").append(` 
            <tr>
              <td> <img width="18px" src="media/icons/entrar.svg"> ${n.title} <small>${n.description}</small></td>
            </tr>`);
        });

        sessionStorage.setItem("currentTeamId", teamId);

        $(".teams-container").hide();
        $(".team-container").show();

        $("#teamIdAssistencia").val(teamId);
        var avatar = "media/no-avatar.png";

        if (userdata?.avatar) {
          avatar = userdata?.avatar;
        }
        $(".current-team").append(`<div class="col-xl-12 col-lg-12 col-md-12">
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
                  <h4 style="font-size: 28px;">${userdata?.pin || ""}</h4> 
                  <div class="profile-name">
                      <h5 class="author-name" style="font-size: 22px; line-height: 26px">${
                        userdata?.firstname || ""
                      } <br> ${userdata?.lastname || ""}</h5>
                      <div class="author-location">${
                        userdata?.email || ""
                      }</div>
                  </div>
              </div>
              <ul class="menu-options">
              <li><a href="javascript:openPanelContentTeam(1)">Historial de Eventos</a></li>
              <li><a href="javascript:openPanelContentTeam(2)">Otra cosa</a></li> 
              <li><a href="javascript:resetPasswordTeam()">Resetear Password</a></li> 
              <li><a href="javascript:openPanelContentTeam(3)">Editar Perfil</a></li>
              <li><a href="javascript:openPanelContentTeam(0)">Marcar Asistencía</a></li>
              </ul>
  
              <div class="form-group">
              <input type="button" onClick="closePanelContentTeam()"  class="submit-btn" value="Volver atrás">
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

const searchTeams = () => {
  const value = $("#search-team-value").val();
  searchTeambyText({ textValue: value });
};

const submitPackTeam = () => {
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

const submitTeamForm = () => {
  connectToCluuf_TeamForm(
    {
      teamId: {
        value: $("form.team #teamId").val(),
        required: false,
      },
      pin: {
        value: $("form.team #pin").val(),
        required: false,
      },
      email: {
        value: $("form.team #email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("form.team #firstname").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      lastname: {
        value: $("form.team  #lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      address: {
        value: $("form.team  #address").val(),
        required: false,
      },
      city: {
        value: $("form.team  #city").val(),
        required: false,
      },
      country: {
        value: $("form.team #country").val(),
        required: false,
      },
      phone: {
        value: $("form.team  #phone").val(),
        required: true,
        message: "Please verify phone and try again.",
      },
      genre: {
        value: $("form.team  #genre").val(),
        required: true,
        message: "Please verify genre and try again.",
      },
      sangretype: {
        value: $("form.team  #sangretype").val(),
        required: false,
        message: "Please verify Tipo de Sangre and try again.",
      },
      birthdate: {
        required: true,
        value: $("form.team  #birthdate").val(),
        message: "Please verify date and try again.",
      },
      secondaryphone: {
        value: $("form.team  #secondaryphone").val(),
        required: false,
      },
      bodylesson: {
        value: $("form.team  #bodylesson").val(),
        required: false,
      },
      alergies: {
        value: $("form.team  #alergies").val(),
        required: false,
      },
      facebook: {
        value: $("form.team  #facebook").val(),
        required: false,
      },
      youtube: {
        value: $("form.team  #youtube").val(),
        required: false,
      },
      linkedin: {
        value: $("form.team  #linkedin").val(),
        required: false,
      },
      instagram: {
        value: $("form.team  #instagram").val(),
        required: false,
      },
      bio: {
        value: $("form.team  #bio").val(),
        required: false,
      },
      formId: $("form.team #formId").val(), // proporcionado por cluuf-web
      instanceId: $("form.team  #instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: "team",
    },
    {
      onSuccess: (response) => {
        Swal.fire(`El usuario ha sido actualizado`, "", "success");
      },
      onError: () => {
        Swal.fire(`Error en actualización`, "", "warning");
      },
    }
  );
};

const requestResetPasswordTeam = (
  params2,
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  var searchParams = new URLSearchParams({
    ...params2,
    instanceId: localStorage.getItem("instanceId"),
  });
  fetch(`${localStorage.getItem("backend_url")}/resetpassword_root`, {
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

const resetPasswordTeam = () => {
  Swal.fire({
    title: `Confirma que desea resetear la contraseña de ${$(
      "form.team #firstname"
    ).val()} ?`,
    showDenyButton: true,
    confirmButtonText: "Resetear contraseña",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      requestResetPasswordTeam(
        {
          rootId: $("form.team #teamId").val(),
        },
        {
          onSuccess: () => {
            Swal.fire(
              ` Se ha enviado un mensaje al correo electronico  ${$(
                "form.team #email"
              ).val()} `,
              "",
              "success"
            );
          },
          onError: () => {
            Swal.fire("Ha ocurrido un Error", "", "error");
          },
        }
      );
    } else if (result.isDenied) {
      // Swal.fire("Changes are not saved", "", "info");
    }
  });
};

const openPanelContentTeam = (number) => {
  $(".team-container .panel-content").hide();
  $(`.team-container .panel-content-${number}`).show("fast");
};

const closePanelContentTeam = () => {
  $(".panel-content").hide();
  $(".teams-container").show();
  $(".team-container").hide();
  $(".current-team div").remove();
};
