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
    sessionStorage.removeItem("packname");
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

            $(".cluuf-pack-video-iframe").attr("src", result.video);
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

                  $(".btn-all-photos").attr("href", pack.avatar);

                  let days = "";
                  if (pack.availableDays) {
                    if (pack.availableDays.length > 6) {
                      days = "Every day";
                    } else {
                      if (pack.availableDays) {
                        pack.availableDays.forEach((element) => {
                          days = `${days}  ${availablesDayFormat(element)}`;
                        });
                      } else {
                        days = "Every day";
                      }
                    }
                  } else {
                    days = "Every day";
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

                  if (pack.type === "SUBSCRIPTION") {
                    getPlans(
                      {
                        instanceId: instance.result._id,
                        packId: pack._id,
                      },
                      {
                        onSuccess: (resultPlans) => {
                          $("#plan option").remove();
                          if (resultPlans.plans[0]) {
                            resultPlans.plans.forEach((element) => {
                              sessionStorage.setItem(
                                element._id,
                                element.observation
                              );

                              if (
                                getParameterByName_pack("p") === element._id
                              ) {
                                $("#plan").append(
                                  `<option selected value="${element._id}">${
                                    element.name
                                  } - Price:  ${priceFormat(
                                    element.price
                                  )}</option>`
                                );

                                $(".plan_description").html(
                                  `<div>${sessionStorage.getItem(
                                    $("#plan").val()
                                  )}</div>`
                                );
                              } else {
                                $("#plan").append(
                                  `<option value="${element._id}">${
                                    element.name
                                  } - Price:  ${priceFormat(
                                    element.price
                                  )}</option>`
                                );
                              }
                            });
                          }
                        },
                        onError: () => {},
                      }
                    );
                  }

                  loadCluufPackContent({
                    method: "GET",
                    url: `${localStorage.getItem(
                      "aws_url"
                    )}/${localStorage.getItem(
                      "alias"
                    )}_files/${localStorage.getItem("keypublic")}.json`,
                  });

                  loadCluufContent({
                    method: "GET",
                    url: `${localStorage.getItem(
                      "aws_url"
                    )}/${localStorage.getItem(
                      "alias"
                    )}_files/${localStorage.getItem("keypublic")}.json`,
                  });

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
                  loadCluufContent({
                    method: "GET",
                    url: `${localStorage.getItem(
                      "aws_url"
                    )}/${localStorage.getItem(
                      "alias"
                    )}_files/${localStorage.getItem("keypublic")}.json`,
                  });

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

$(".is-cluuf-pack-iframeMap").on("click", () => {
  $(".cluuf-pack-iframeMap iframe").css("width", "100%");
});

$(".is-cluuf-pack-meetingPoint").on("click", () => {
  $(".cluuf-pack-meetingPoint iframe").css("width", "100%");
});

$("#plan").on("change", () => {
  $(".plan_description div").remove();
  $(".plan_description").html(
    `<div>${sessionStorage.getItem($("#plan").val())}</div>`
  );
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
