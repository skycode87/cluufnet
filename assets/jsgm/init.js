const JsonLanguage = {
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        all_rights_reserved: "All rights reserved",
        book_now: "Book Now",
        number_tickets: "Number of Tickets",
        phone: "Phone Number",
        loading: "Sending Information",
        name: "Fullname",
        email: "Email",
        reservation_date: "Reservation Date",
        hour: "Hour",
        duration: "Duration",
        geographic_location: "Geographic Location",
        description: "Description",
        include: "Include",
        exclude: "Not Include",
        itineraries: "Itineraries",
        availability_only_days: "Availability only days",
        meeting_point: "Meeting Point",
        recomendations: "Recomendations",
        additional_information: "Additional Information",
      },
    },
    es: {
      translation: {
        all_rights_reserved: "Todos los derechos reservados",
        book_now: "Book Now",
        number_tickets: "Números de Tickes",
        phone: "Telefono",
        name: "Nombre",
        email: "Email",
        reservation_date: "Fecha",
        hour: "Hora",
        duration: "Duración",
        geographic_location: "Ubicación Geografica",
        description: "Descripción",
        include: "Incluye",
        exclude: "No Incluye",
        itineraries: "Itinerario",
        availability_only_days: "Disponibilidad solo los días",
        meeting_point: "Punto de encuentro",
        recomendations: "Recomendaciones",
        additional_information: "Información Adicional",
      },
    },
  },
};

i18next.init(JsonLanguage).then(function (t) {
  const data = JsonLanguage.resources.en.translation;
  for (var clave in data) {
    if (data.hasOwnProperty(clave)) {
      try {
        document.querySelector(`.t_${clave}`).textContent = i18next.t(
          data[clave]
        );
      } catch (e) {}
      //alert("La clave es " + clave + " y el valor es " + data[clave]);
    }
  }
});

const isValid = (dato) => {
  if (!dato || dato === undefined || dato === "" || dato === null) {
    return false;
  }
  return true;
};

const availablesDayFormat = (dayNumber, idioma = "en") => {
  if (idioma === "es") {
    if (parseInt(dayNumber) === 0) return "Domingo";
    if (parseInt(dayNumber) === 1) return "Lunes";
    if (parseInt(dayNumber) === 2) return "Martes";
    if (parseInt(dayNumber) === 3) return "Miercoles";
    if (parseInt(dayNumber) === 4) return "Jueves";
    if (parseInt(dayNumber) === 5) return "Viernes";
    if (parseInt(dayNumber) === 6) return "Sabado";
  } else {
    if (parseInt(dayNumber) === 0) return "Sunday";
    if (parseInt(dayNumber) === 1) return "Monday";
    if (parseInt(dayNumber) === 2) return "Tuesday";
    if (parseInt(dayNumber) === 3) return "Wednesday";
    if (parseInt(dayNumber) === 4) return "Thursday";
    if (parseInt(dayNumber) === 5) return "Friday";
    if (parseInt(dayNumber) === 6) return "Saturday";
  }
};

getConnection({
  onSuccess: (userdata) => {
    sessionStorage.removeItem("packname");
    const user = userdata.result;
    $("img.user-avatar").attr("src", user.avatar);
    $(".user-fullname").text(`${user.firstname} ${user.lastname}`);
    $(".user-email").text(user.email);
    $(".user-phone").text(user.phone);
    $(".user-address").text(user.address);
    $(".user-city").text(user.city);
    $(".user-country").text(user.country);
    $(".user-startdate").text(user.startdate);
    $(".user-profession").text(user.profession);
    $(".user-facebook").attr("href", user.facebook);
    $(".user-instagram").attr("href", user.instagram);
    $(".user-youtube").attr("href", user.youtube);
    $(".user-twitter").attr("href", user.twitter);
    $(".user-pin").text(user.pin);
    $(".user-bio").text(user.bio);
    $(".user-sangretype").text(user.sangretype);
    $(".user-genre").text(user.genre);
    $(".user-alergies").text(user.alergies);
    $(".user-bodylesson").text(user.bodylesson);

    /* user-form */
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

    getInstance(
      { instanceId: userdata.result.instanceId },
      {
        onSuccess: (result) => {
          $(".fixed-header .header-menu").css("background-color", result.color);
          $(".instance-background").css(
            "background-image",
            `url(${result.background})`
          );

          $(".instance-logo").attr("src", result.logo);
          $(".instance-logowhite").attr("src", result.logowhite);

          $(".instance-name").text(result.name);
          $(".instance-phonepublic").text(result.phonepublic);
          $(".instance-emailpublic").text(result.emailpublic);
          $(".instance-website").text(result.website);
          $(".instance-address").text(result.address);
          $(".instance-website-src").attr("href", result.website);
          $(".gotours-href").attr("href", `tours.html?agency=${result.alias}`);

          localStorage.setItem("hostname", result.hostname);
          localStorage.setItem("instanceId", result._id);
          localStorage.setItem("keypublic", result.keypublic);
          localStorage.setItem("cluuf", "true");

          if (result.video) {
            if (result.video.length > 10) {
              $(".instance-video").attr("href", result.video);
              $(".pack-video").attr("href", result.video);
            } else {
              $(".instance-video").hide();
            }

            $(".pack-video-iframe").attr("src", result.video);
          }

          if (result.whatsapp) {
            if (result.whatsapp.length > 4) {
              $(".isWhatsapp").show();
              $(".cluuf-instance-whatsapp-src").attr(
                "href",
                `https://wa.me/${result.whatsapp}`
              );
            }
          }

          if (result.facebook) {
            if (result.facebook.length > 4) {
              $(".isFacebook").show();
              $(".cluuf-instance-facebook-src").attr("href", result.facebook);
            }
          }

          if (result.instagram) {
            if (result.instagram.length > 4) {
              $(".isInstagram").show();
              $(".cluuf-instance-instagram-src").attr("href", result.instagram);
            }
          }

          if (result.emailpublic) {
            if (result.emailpublic.length > 4) {
              $(".isEmail").show();
              $(".cluuf-instance-emailpublic-src").attr(
                "href",
                `mailto:${result.emailpublic}`
              );
            }
          }

          if (result.phonepublic) {
            if (result.phonepublic.length > 4) {
              $(".isPhone").show();
              $(".cluuf-instance-phonepublic-src").attr(
                "href",
                `tel:%${result.phonepublic}`
              );
            }
          }

          $(".cluuf-instance-avatar").attr("src", result.avatar);
          $(".cluuf-instance-aboutus").html(result.aboutus);

          if (getParameterByNameURL("q") === "a") {
            getPack(
              { instanceId: result._id },
              {
                onSuccess: (result) => {
                  const pack = result.pack[0];
                  sessionStorage.setItem("cluuf-pack", JSON.stringify(pack));
                  localStorage.setItem("cluuf-pack-tag", pack.tag);
                  sessionStorage.setItem("packname", pack.tag);

                  $(".cluuf-pack-name").text(pack.name);
                  $(".cluuf-pack-category").text(pack.category);
                  $(".cluuf-pack-price").text(priceFormat(pack.price));
                  $(".cluuf-pack-description").html(pack.description);
                  $(".cluuf-pack-duration").text(pack.duration);
                  $(".cluuf-pack-id").val(pack._id);
                  $("#instanceId").val(pack.instanceId);
                  $(".cluuf-pack-iframeMap").append(pack.iframeMap);
                  $(".cluuf-pack-meetingPoint").append(pack.meetingPoint);
                  $(".cluuf-pack-excerpt").html(pack.excerpt);
                  localStorage.setItem("cluufpackname", pack.name);
                  localStorage.setItem("cluufpackId", pack._id);
                  localStorage.setItem("cluufclient", pack.name);

                  if (pack.video) {
                    if (pack.video.length > 10) {
                      $(".cluuf-pack-video").attr("href", pack.video);
                    }
                  }

                  if (pack.description) {
                    if (
                      pack.description === undefined ||
                      pack.description === "" ||
                      String(pack.description).length < 20
                    )
                      $(".is-cluuf-pack-description").hide();
                  }

                  /*

                   if (pack.iframeMap)
                    if (!isValid(pack.iframeMap))
                      $(".is-cluuf-pack-iframeMap").hide();


                  if (pack.include)
                    if (!isValid(pack.include))
                      $(".is-cluuf-pack-include").hide();

                  if (!isValid(pack.exclude))
                    $(".is-cluuf-pack-exclude").hide();

                  if (!isValid(pack.itineraries))
                    $(".is-cluuf-pack-itineraries").hide();

                  if (!isValid(pack.recomendations))
                    $(".is-cluuf-pack-recomendations").hide();

                       $(".images-tab-content")
                    .append(`<div role="tabpanel" class="tab-pane fade active show" id="related0">
                  <a href="#">
                      <img class="img-fluid" alt="single" src=${pack.avatar}>
                  </a>
              </div>`);

                  $(".images-tab-list").append(`<li class="nav-item">
                                <a  href="#related0" data-toggle="tab" aria-expanded="false">
                                    <img alt="related0" src="${pack.avatar}" class="img-fluid" />
                                </a>
                            </li>`);

                  */

                  $(".btn-all-photos").attr("href", pack.avatar);

                  /*
                  pack.images.forEach((item, index) => {
                    $(".container-gallery")
                      .append(`<div class="col-lg-3 col-md-4 col-6">
                                        <div class="user-group-photo">
                                            <a href="https://cluuf.s3.amazonaws.com/${item}" class="popup-zoom">
                                                <img src="https://cluuf.s3.amazonaws.com/${item}" alt="Gallery" class="img-fluid">
                                            </a>
                                        </div>
                                    </div>`);

                    if (index < 3) {
                      $(".images-tab-content")
                        .append(`<div role="tabpanel" class="tab-pane fade" id="related${
                        index + 1
                      }">
                      <a href="#">
                          <img class="img-fluid" alt="single" src="https://cluuf.s3.amazonaws.com/${item}">
                      </a>
                  </div>`);

                      $(".images-tab-list").append(`<li class="nav-item">
                                    <a  href="#related${
                                      index + 1
                                    }" data-toggle="tab" aria-expanded="false">
                                        <img alt="related${
                                          index + 1
                                        }" src="https://cluuf.s3.amazonaws.com/${item}" class="img-fluid" />
                                    </a>
                                </li>`);
                    }
                  });*/

                  let days = "";
                  if (pack.availableDays) {
                    if (pack.availableDays.length > 6) {
                      days = "Todos los dias";
                    } else {
                      if (pack.availableDays) {
                        pack.availableDays.forEach((element) => {
                          days = `${days}  ${availablesDayFormat(element)}`;
                        });
                      } else {
                        days = "All Days";
                      }
                    }
                  } else {
                    days = "All Days";
                  }

                  $(".cluuf-pack-availableDays").html(days);

                  $("#time option").remove();
                  if (pack.departureTime) {
                    pack.departureTime.forEach((element) => {
                      $("#time").append(
                        `<option value="${element}">${element}</option>`
                      );
                    });
                  }

                  loadCluufPackContent({
                    method: "GET",
                    url: `https://cluuf.s3.sa-east-1.amazonaws.com/${localStorage.getItem(
                      "keypublic"
                    )}.json`,
                  });

                  /*
                  if (isValid(pack.include)) {
                    pack.include.forEach((element) => {
                      $(".cluuf-pack-include").append(`<li>${element}</li>`);
                    });
                  }

                  if (isValid(pack.recomendations)) {
                    pack.recomendations.forEach((element) => {
                      $(".cluuf-pack-recomendations").append(
                        `<li>${element}</li>`
                      );
                    });
                  }
                  

                  if (isValid(pack.exclude)) {
                    pack.exclude.forEach((element) => {
                      $(".cluuf-pack-exclude").append(`<li>${element}</li>`);
                    });
                  }

                  if (isValid(pack.itineraries)) {
                    pack.itineraries.forEach((element) => {
                      $(".cluuf-pack-itineraries").append(
                        `<li>${element}</li>`
                      );
                    });
                  }*/

                  loadCluufContent({
                    method: "GET",
                    url: `https://cluuf.s3.sa-east-1.amazonaws.com/${localStorage.getItem(
                      "keypublic"
                    )}.json`,
                  });

                  $(".overlay-loading").hide();
                },
                onError: (err) => {},
              }
            );
          } else {
            searchUserbyText({ textValue: "" });
          }

          /* Load Content  */
        },
        onError: (result) => console.log(result),
      }
    );
  },
});

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

                <a href="javascript:openPanel1({ userId: '${
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

const createAsistenciaClient = () => {
  createAsistencia(
    { userId: $("#userIdAssistencia").val() },
    {
      onSuccess: (usersResult) => {
        closePanelContent();
        openPanel1({ userId: $("#userIdAssistencia").val(), num: 1 });
      },
    }
  );
};

const openPanel1 = ({ userId, num }) => {
  getUser(
    userId,
    {
      onSuccess: (result) => {
        const userdata = result.result;
        const events = result.events;
        $(".table-asistencia tbody tr").remove();
        loadDataFormUSer({ user: userdata });
        $.each(events, function (i, n) {
          $(".table-asistencia tbody").append(` 
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
            <ul class="author-badge">
            <li><a href="javascript:openPanelContent(1)"><img width="40px" src="media/icons/pasar.svg"></a></li>
            <li><a href="javascript:openPanelContent(2)"><img width="40px" src="media/icons/navegador-web.svg"></a></li> 
            <li><a href="javascript:openPanelContent(3)"><img width="40px" src="media/icons/medios-de-comunicacion-social.svg"></a></li>
            <li><a href="javascript:openPanelContent(0)"><img width="40px" src="media/icons/entrar.svg"></a></li>
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
        value: $("#userId").val(),
        required: false,
      },
      pin: {
        value: $("#pin").val(),
        required: false,
      },
      email: {
        value: $("#email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("#firstname").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      lastname: {
        value: $("#lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      address: {
        value: $("#address").val(),
        required: false,
      },
      city: {
        value: $("#city").val(),
        required: false,
      },
      country: {
        value: $("#country").val(),
        required: false,
      },
      phone: {
        value: $("#phone").val(),
        required: true,
        message: "Please verify phone and try again.",
      },
      genre: {
        value: $("#genre").val(),
        required: true,
        message: "Please verify genre and try again.",
      },
      sangretype: {
        value: $("#sangretype").val(),
        required: false,
        message: "Please verify Tipo de Sangre and try again.",
      },
      birthdate: {
        required: true,
        value: $("#birthdate").val(),
        message: "Please verify date and try again.",
      },
      secondaryphone: {
        value: $("#secondaryphone").val(),
        required: false,
      },
      bodylesson: {
        value: $("#bodylesson").val(),
        required: false,
      },
      alergies: {
        value: $("#alergies").val(),
        required: false,
      },
      facebook: {
        value: $("#facebook").val(),
        required: false,
      },
      youtube: {
        value: $("#youtube").val(),
        required: false,
      },
      linkedin: {
        value: $("#linkedin").val(),
        required: false,
      },
      instagram: {
        value: $("#instagram").val(),
        required: false,
      },
      bio: {
        value: $("#bio").val(),
        required: false,
      },
      formId: $("#formId").val(), // proporcionado por cluuf-web
      instanceId: $("#instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: "user",
    },
    {
      onSuccess: (response) => {},
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

$(".is-cluuf-pack-iframeMap").on("click", () => {
  $(".cluuf-pack-iframeMap iframe").css("width", "100%");
});

$(".is-cluuf-pack-meetingPoint").on("click", () => {
  $(".cluuf-pack-meetingPoint iframe").css("width", "100%");
});

$("#date").on("change", () => {
  let isAvailable = false;
  let daysName = "";

  if (sessionStorage.getItem("cluuf-pack")) {
    let days = JSON.parse(sessionStorage.getItem("cluuf-pack")).availableDays;
    days.forEach((element) => {
      daysName = `${daysName}  ${availablesDayFormat(element)}`;

      if (parseInt(moment($("#date").val()).day()) === parseInt(element)) {
        isAvailable = true;
      }
    });
    if (!isAvailable) {
      $("#date").val("");
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: `Excuse me, we only have availability for the days ${daysName}`,
      });
    }
  }
});

$(".cluuf-alert").on("click", () => {
  $(".cluuf-alert").hide("fast");
});

const formSubmit = () => {
  connectToCluufCRM(
    {
      email: {
        value: jQuery("#femail").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      name: {
        value: jQuery("#fname").val(),
        required: true,
        message: "Please verify Name and try again.",
      },
      message: {
        value: jQuery("#fmessage").val(),
        required: true,
        message: "Please verify Message and try again.",
      },
      phone: {
        value: jQuery("#fphone").val(),
        required: true,
        message: "Please verify Phone and try again.",
      },
      campaign: localStorage.getItem("cluufpackname"),
      formId: localStorage.getItem("cluufpackId"),
      keypublic: localStorage.getItem("keypublic"),
      instanceId: localStorage.getItem("instanceId"),
      successMessage: "The message has been sent successfully",
      cluuf: localStorage.getItem("cluuf"),
    },
    {
      onSuccess: (response) => {
        $("#fname").val("");
        $("#femail").val("");
        $("#fmessage").val("");
        $("#fphone").val("");
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const priceFormat = (text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const openPanelContent = (number) => {
  $(".panel-content").hide();
  $(`.panel-content-${number}`).show("fast");
};

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
};

const closePanelContent = () => {
  $(".panel-content").hide();
  $(".contacts-container").show();
  $(".contact-container").hide();
  $(".current-contact div").remove();
};

/*
if (getParameterByName_pack("q") && getParameterByName_pack("agency")) {
  getConnection({
    onSuccess: (instance) => {
      getPack(
        { instanceId: instance.result._id },
        {
          onSuccess: (result) => {
            const pack = result.pack[0];
            sessionStorage.setItem("cluuf-pack", JSON.stringify(pack));
            $(".cluuf-pack-name").text(pack.name);
            $(".cluuf-pack-category").text(pack.category);
            $(".cluuf-pack-price").text(priceFormat(pack.price));
            $(".cluuf-pack-description").html(pack.description);
            $(".cluuf-pack-duration").text(pack.duration);
            $(".cluuf-pack-id").val(pack._id);
            $("#instanceId").val(pack.instanceId);
            $(".cluuf-pack-iframeMap").append(pack.iframeMap);
            $(".cluuf-pack-meetingPoint").append(pack.meetingPoint);
            $(".cluuf-pack-excerpt").html(pack.excerpt);

            if (pack.video) {
              if (pack.video.length > 10) {
                $(".cluuf-pack-video").attr("href", pack.video);
              }
            }

            if (pack.description) {
              if (
                pack.description === undefined ||
                pack.description === "" ||
                String(pack.description).length < 20
              )
                $(".is-cluuf-pack-description").hide();
            }

            if (pack.iframeMap)
              if (!isValid(pack.iframeMap))
                $(".is-cluuf-pack-iframeMap").hide();

            if (pack.include)
              if (!isValid(pack.include)) $(".is-cluuf-pack-include").hide();

            if (!isValid(pack.exclude)) $(".is-cluuf-pack-exclude").hide();

            if (!isValid(pack.itineraries))
              $(".is-cluuf-pack-itineraries").hide();

            if (!isValid(pack.recomendations))
              $(".is-cluuf-pack-recomendations").hide();

            $(".cluuf-pack-avatar")
              .attr("src", pack.avatar)
              .attr("data-zoom-image", pack.avatar);

            if (pack.images[0] !== undefined) {
              $(".cluuf-pack-gallery1")
                .attr("src", `https://cluuf.s3.amazonaws.com/${pack.images[0]}`)
                .attr(
                  "data-zoom-image",
                  `https://cluuf.s3.amazonaws.com/${pack.images[0]}`
                );
            } else {
              $(".gallery1").hide();
            }

            if (pack.images[1] !== undefined) {
              $(".cluuf-pack-gallery2")
                .attr("src", `https://cluuf.s3.amazonaws.com/${pack.images[1]}`)
                .attr(
                  "data-zoom-image",
                  `https://cluuf.s3.amazonaws.com/${pack.images[1]}`
                );
            } else {
              $(".gallery2").hide();
            }

            if (pack.images[2] !== undefined) {
              $(".cluuf-pack-gallery3")
                .attr("src", `https://cluuf.s3.amazonaws.com/${pack.images[2]}`)
                .attr(
                  "data-zoom-image",
                  `https://cluuf.s3.amazonaws.com/${pack.images[2]}`
                );
            } else {
              $(".gallery3").hide();
            }

            let days = "";
            if (pack.availableDays) {
              if (pack.availableDays.length > 6) {
                days = "Todos los dias";
              } else {
                if (pack.availableDays) {
                  pack.availableDays.forEach((element) => {
                    days = `${days}  ${availablesDayFormat(element)}`;
                  });
                } else {
                  days = "All Days";
                }
              }
            } else {
              days = "All Days";
            }

            $(".cluuf-pack-availableDays").html(days);

            $("#time option").remove();
            if (pack.departureTime) {
              pack.departureTime.forEach((element) => {
                $("#time").append(
                  `<option value="${element}">${element}</option>`
                );
              });
            }

            if (isValid(pack.include)) {
              pack.include.forEach((element) => {
                $(".cluuf-pack-include").append(`<li>${element}</li>`);
              });
            }

            if (isValid(pack.recomendations)) {
              pack.recomendations.forEach((element) => {
                $(".cluuf-pack-recomendations").append(`<li>${element}</li>`);
              });
            }

            if (isValid(pack.exclude)) {
              pack.exclude.forEach((element) => {
                $(".cluuf-pack-exclude").append(`<li>${element}</li>`);
              });
            }

            if (isValid(pack.itineraries)) {
              pack.itineraries.forEach((element) => {
                $(".cluuf-pack-itineraries").append(`<li>${element}</li>`);
              });
            }

            $(".overlay-loading").hide();
          },
          onError: (err) => {},
        }
      );
    },
  });
}
*/
