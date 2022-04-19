function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

const JsonLanguage = {
  lng: "es", // if you're using a language detector, do not define the lng option
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
          localStorage.setItem(
            "cluufSettings",
            JSON.stringify({
              client: result.name,
              keypublic: result.keypublic,
              instanceId: result._id,
              tracking: false,
              editing: true,
              backend: "https://my-app-3ocg5.ondigitalocean.app",
              trackBackend: "https://cluuftracks.herokuapp.com",
              frontend: "https://cluuf-web.herokuapp.com",
              //trackBackend: "http://localhost:2000",
              //backend: "http://localhost:2001",
            })
          );

          $(".cluuf-instance-logo").attr("src", result.logo);
          $(".cluuf-instance-logowhite").attr("src", result.logowhite);

          if (result.logowhite.length < 5) {
            $(".cluuf-instance-logowhite").attr("src", result.logo);
          }

          $(".cluuf-instance-name").text(result.name);
          $(".cluuf-instance-phonepublic").text(result.phonepublic);
          $(".cluuf-instance-emailpublic").text(result.emailpublic);
          $(".cluuf-instance-website").text(result.website);
          $(".cluuf-instance-address").text(result.address);

          $(".cluuf-instance-cover").css(
            "background-image",
            `url(${result.cover})`
          );

          let contador = "1";
          localStorage.setItem("contador", contador);
          setInterval(() => {
            if (localStorage.getItem("contador") === "0") {
              $(".cluuf-instance-cover").css(
                "background-image",
                `url(${result.cover})`
              );
              localStorage.setItem("contador", "1");
            } else if (localStorage.getItem("contador") === "1") {
              $(".cluuf-instance-cover").css(
                "background-image",
                `url(${result.cover2})`
              );
              localStorage.setItem("contador", "2");
            } else if (localStorage.getItem("contador") === "2") {
              $(".cluuf-instance-cover").css(
                "background-image",
                `url(${result.cover3})`
              );
              localStorage.setItem("contador", "0");
            }
          }, 5000);

          $(".cluuf-instance-email").text(result.email);
          $(".cluuf-instance-website-src").attr("href", result.website);

          $("#refererUserId").val(sessionStorage.getItem("ruId") || "");
          $("#refererAppId").val(sessionStorage.getItem("raId") || "");
          $("#facilitator").val(sessionStorage.getItem("fclt") || "");
          $("#campaign").val(sessionStorage.getItem("utmc") || "");

          $(".cluuf-gotours-href").attr(
            "href",
            `app_s0.html?agency=${
              result.alias
            }&type=suscriber&fclt=${sessionStorage.getItem(
              "fclt"
            )}&utmc=Local&raId=null&ruId=null#`
          );

          localStorage.setItem("hostname", result.hostname);
          localStorage.setItem("instanceId", result._id);
          localStorage.setItem("keypublic", result.keypublic);
          localStorage.setItem("cluuf", "true");
          localStorage.setItem("alias", result.alias);

          $(".cluuf-gowebsite-href").text(result.website);
          $(".cluuf-gowebsite-href").attr("href", result.hostname);
          $(".cluuf-gowebsite-href").attr("target", "blank");

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

          $(".fixed-header .header-menu").css("background", result.color);
          $(".box-rating").css("background", result.color);

          $(" body .contact-page .contact-box-wrap .contact-form").css(
            "background",
            result.color
          );

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

                  $("body .plan_description div").css(
                    "background",
                    pack.backgroundForm
                  );

                  $(".cluuf-instance-background").css(
                    "background-image",
                    `url(${result.background})`
                  );

                  $("body .fixed-sidebar.right .sidebar-toggle").css(
                    "background-color",
                    result.primary
                  );

                  $("body .form-group .submit-btn").css(
                    "background-color",
                    pack.colorBtnForm
                  );

                  $("body .scrollup").css(
                    "background-color",
                    pack.colorBtnForm
                  );

                  $(" body .product-content  .item-title").css(
                    "background",
                    pack.colorBtnForm
                  );

                  $(
                    "body .single-product .product-content .action-area li .cart-btn"
                  ).css("background", pack.colorBtnForm);

                  if (pack.privacyPolicy && pack.privacyPolicy.length > 5) {
                    $("#isPrivacyPolicy").val(true);
                    $(".isPrivacyPolicyPack").show();
                    $(".privacyPolicyPack").attr("href", pack.privacyPolicy);
                  }

                  if (pack.parentalControl) {
                    $("#isParentalControl").val(true);
                    $(".isParentalControl").show();
                  }

                  if (pack.cupon) {
                    $("#isCupon").val(true);
                    $(".isCupon").show();
                  }
                  $("#date").val(moment().format("YYYY-MM-DD"));

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
                  $("#packname").val(pack.name);
                  $(".cluuf-pack-title").text(pack.title);
                  $(".cluuf-pack-titleSelectPlan").text(pack.titleSelectPlan);
                  $(".cluuf-pack-labelBtnForm").text(pack.labelBtnForm);

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

                  if (String(pack.meetingPoint).length > 10) {
                    $(".pack_iframe_meetingpoint").html(pack.meetingPoint);
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

                  $(".image-avatar").attr("src", pack.avatar);
                  $(".cluuf-pack-avatar").attr("src", pack.avatar);

                  $(".cluuf-pack-availableDays").html(days);

                  $("#time option").remove();
                  if (pack.departureTime) {
                    pack.departureTime.forEach((element) => {
                      $("#time").append(
                        `<option value="${element}">${element}</option>`
                      );
                    });
                  }

                  if (pack.itineraries && String(pack.itineraries).length > 5) {
                    $(".is-cluuf-pack-itineraries").show();
                    let itinerariesHTML = String(pack.itineraries).split(",");
                    itinerariesHTML.forEach((element) => {
                      $(".pack_itineraries").append(
                        `<li>${capitalize(element.trim())}</li>`
                      );
                    });
                  }

                  if (pack.include && String(pack.include).length > 5) {
                    $(".is-cluuf-pack-include").show();
                    let includesHTML = String(pack.include).split(",");
                    includesHTML.forEach((element) => {
                      $(".pack_include").append(
                        `<li>${capitalize(element.trim())}</li>`
                      );
                    });
                  }

                  if (pack.exclude && String(pack.exclude).length > 5) {
                    $(".is-cluuf-pack-exclude").show();
                    let excludehtml = String(pack.exclude).split(",");
                    excludehtml.forEach((element) => {
                      $(".pack_exclude").append(
                        `<li>${capitalize(element.trim())}</li>`
                      );
                    });
                  }

                  if (pack.description && String(pack.description).length > 5) {
                    $(".is-cluuf-pack-description").show();
                    $(".pack_description").html(pack.description);
                  }

                  if (pack.iframeMap && String(pack.iframeMap).length > 5) {
                    $(".is-cluuf-pack-iframeMap").show();
                    $(".pack_iframeMap").html(pack.iframeMap);
                  }

                  if (
                    pack.meetingPoint &&
                    String(pack.meetingPoint).length > 5
                  ) {
                    $(".is-cluuf-pack-meetingPoint").show();
                    $(".pack_meetingPoint").html(pack.meetingPoint);
                  }

                  if (
                    pack.recomendations &&
                    String(pack.recomendations).length > 5
                  ) {
                    $(".is-cluuf-pack-recomendations").show();
                    let recomendationshtml = String(pack.recomendations).split(
                      ","
                    );
                    recomendationshtml.forEach((element) => {
                      $(".pack_recomendations").append(
                        `<li>${capitalize(element.trim())}</li>`
                      );
                    });
                  }

                  $(".overlay-loading").hide();
                },
                onError: (err) => {},
              }
            );
          }

          if (getParameterByName_pack("p") || getParameterByName_pack("u")) {
            getPlan(
              {
                instanceId: instance.result._id,
                planId: getParameterByName_pack("p"),
              },
              {
                onSuccess: (resultPlans) => {
                  if (resultPlans.images) {
                    sessionStorage.setItem("images", "yes");
                    $(".cluuf-plan-name").html(resultPlans.plans[0].name);

                    resultPlans.images.images.forEach((element) => {
                      $("#gallery").append(
                        `<div class="col-lg-3"><img style="margin-bottom:30px; max-width:100%; border-radius: 10px; -webkit-box-shadow: 7px -8px 3px -2px rgba(186,186,186,1);
                        -moz-box-shadow: 7px -8px 3px -2px rgba(186,186,186,1);
                        box-shadow: 7px -8px 3px -2px rgba(186,186,186,1);"  src="${element.image}" />
                      <p style="text-align:center">
                        <a href="${element.image}" download="picture">
                        <button style="border:none; border-radius:7px; position:relative; top: -20px; background: #dc3545; color: white" type="button">Download</button> 
                        </a> 
                        </p>
                        </div>`
                      );
                    });
                  } else {
                    sessionStorage.setItem("images", "no");
                  }
                },
                onError: () => {},
              }
            );
          }

          if (getParameterByName_pack("app")) {
            getAppSurvey(
              {
                instanceId: instance.result._id,
                appId: getParameterByName_pack("app"),
              },
              {
                onSuccess: (resultApp) => {
                  if (resultApp.ok) {
                    sessionStorage.setItem(
                      "appId",
                      getParameterByName_pack("app")
                    );
                    sessionStorage.setItem("instanceId", instance.result._id);

                    if (resultApp.app.rate >= 0) {
                      $(".box-rating-col").hide();
                      $(".page-content").show("fast");
                    } else {
                      //$(".survey-section").show();
                      // $(".page-content").hide("fast");
                    }
                    $(".page-content").show("fast");
                  }
                },
                onError: () => {},
              }
            );
          }

          if (getParameterByName_pack("root")) {
            if (sessionStorage.getItem("images") === "yes") {
              $(".survey-section").hide();
              $(".page-content").show("fast");
            }
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
  $("#planname").val(JSON.parse(sessionStorage.getItem($("#plan").val())).name);
  $(".plan_description").html(
    `<div>
    ${JSON.parse(sessionStorage.getItem($("#plan").val())).observation}</div>`
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
