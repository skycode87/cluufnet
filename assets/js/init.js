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
  onSuccess: (instance) => {
    getInstance(
      { instanceId: instance.result._id },
      {
        onSuccess: (result) => {
          $(".cluuf-instance-logo").attr("src", result.logo);
          $(".cluuf-instance-logowhite").attr("src", result.logowhite);

          if (result.logowhite.length < 5)
            $(".cluuf-instance-logowhite").attr("src", result.logo);

          $(".cluuf-instance-name").text(result.name);
          $(".cluuf-instance-phonepublic").text(result.phonepublic);
          $(".cluuf-instance-emailpublic").text(result.emailpublic);
          $(".cluuf-instance-website").text(result.website);
          $(".cluuf-instance-address").text(result.address);
          $(".cluuf-instance-website-src").attr("href", result.website);
          $(".cluuf-gotours-href").attr(
            "href",
            `tours.html?agency=${result.alias}`
          );

          localStorage.setItem("hostname", result.hostname);
          localStorage.setItem("instanceId", result._id);
          localStorage.setItem("keypublic", result.keypublic);
          localStorage.setItem("cluuf", "true");

          if (result.video) {
            if (result.video.length > 10) {
              $(".cluuf-instance-video").attr("href", result.video);
              $(".cluuf-pack-video").attr("href", result.video);
            } else {
              $(".cluuf-instance-video").hide();
            }
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

          $(".cluuf-instance-background").css(
            "background-image",
            `url(${result.background})`
          );
          $(".cluuf-instance-avatar").attr("src", result.avatar);
          $(".cluuf-instance-aboutus").html(result.aboutus);

          if (getParameterByName_pack("q")) {
            getPack(
              { instanceId: result._id },
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

                  $(".cluuf-pack-avatar")
                    .attr("src", pack.avatar)
                    .attr("data-zoom-image", pack.avatar);

                  if (pack.images[0] !== undefined) {
                    $(".cluuf-pack-gallery1")
                      .attr(
                        "src",
                        `https://cluuf.s3.amazonaws.com/${pack.images[0]}`
                      )
                      .attr(
                        "data-zoom-image",
                        `https://cluuf.s3.amazonaws.com/${pack.images[0]}`
                      );
                  } else {
                    $(".gallery1").hide();
                  }

                  if (pack.images[1] !== undefined) {
                    $(".cluuf-pack-gallery2")
                      .attr(
                        "src",
                        `https://cluuf.s3.amazonaws.com/${pack.images[1]}`
                      )
                      .attr(
                        "data-zoom-image",
                        `https://cluuf.s3.amazonaws.com/${pack.images[1]}`
                      );
                  } else {
                    $(".gallery2").hide();
                  }

                  if (pack.images[2] !== undefined) {
                    $(".cluuf-pack-gallery3")
                      .attr(
                        "src",
                        `https://cluuf.s3.amazonaws.com/${pack.images[2]}`
                      )
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
                  }

                  $(".overlay-loading").hide();
                },
                onError: (err) => {},
              }
            );
          } else {
            getPacks(
              { instanceId: instance.result._id },
              {
                onSuccess: (result2) => {
                  $(".overlay-loading").hide();
                  $.each(result2.packs, function (i, n) {
                    $(".packs-list").append(` 
                          <div class="col-lg-4 col-md-6">
                          <div class="block-box product-box">
                              <div class="product-img">
                                  <a href="tour.html?q=${
                                    n._id
                                  }&agency=${instance.result.alias}"><img src="${n.avatar}" alt="${n.name}"></a>
                              </div>
                              <div class="product-content">
                                  <div class="item-category">
                                      <a href="#">${n.category}</a>
                                  </div>
                                  <h3 class="product-title"><a href="tour.html?q=${
                                    n._id
                                  }&agency=${instance.result.alias}">${n.name}</a></h3>
                                  <div class="product-price">${priceFormat(
                                    n.price
                                  )}</div>
                              </div>
                          </div>
                      </div>`);
                  });
                },
              }
            );
          }
        },
        onError: (result) => console.log(result),
      }
    );
  },
});

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
        console.log("estoy aqui");
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
