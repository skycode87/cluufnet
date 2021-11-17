let INSTANCE_ = {};

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
              backend: "https://cluufweb-backend.herokuapp.com",
              trackBackend: "https://cluuftracks.herokuapp.com",
              frontend: "https://cluuf-web.herokuapp.com",
              //trackBackend: "http://localhost:2000",
              //backend: "http://localhost:2001",
            })
          );

          INSTANCE_ = result;

          if (getParameterByName_pack("redirect"))
            sessionStorage.setItem("redirect", true);

          $(".cluuf-instance-logo").attr("src", result.logo);
          $(".cluuf-instance-logowhite").attr("src", result.logowhite);

          if (result.logowhite.length < 5)
            $(".cluuf-instance-logowhite").attr("src", result.logo);

          $(".cluuf-instance-name").text(result.name);
          $(".cluuf-instance-phonepublic").text(result.phonepublic);
          $(".cluuf-instance-emailpublic").text(result.emailpublic);
          $(".cluuf-instance-website").text(result.website);
          $(".cluuf-instance-address").text(result.address);

          $(".cluuf-gowebsite-href").text(result.website);
          $(".cluuf-gowebsite-href").attr("href", result.hostname);
          $(".cluuf-gowebsite-href").attr("target", "blank");

          $(".cluuf-instance-cover").css(
            "background-image",
            `url(${result.cover})`
          );

          $(".fixed-header .header-menu").css("background", result.color);

          if (!getParameterByName_pack("q")) {
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
          }

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

          $(".cluuf-instance-cover").attr("src", result.cover);

          $("body .fixed-sidebar.right .sidebar-toggle").css(
            "background-color",
            result.primary
          );

          $(".cluuf-instance-avatar").attr("src", result.avatar);
          $(".cluuf-instance-aboutus").html(result.aboutus);

          if (
            getParameterByName_pack("ruId") &&
            String(getParameterByName_pack("ruId")).length > 6
          ) {
            $(".cluuf-root").show();
            $(".cluuf-root-hidden").hide();
          }

          if (getParameterByName_pack("q")) {
            getPack(
              { instanceId: result._id },
              {
                onSuccess: (result) => {
                  const pack = result.pack[0];
                  sessionStorage.setItem("cluuf-pack", JSON.stringify(pack));
                  localStorage.setItem("cluuf-pack-tag", pack.tag);
                  sessionStorage.setItem("packname", pack.tag);

                  $(".cluuf-instance-cover").css(
                    "background-image",
                    `url(${pack.avatar})`
                  );

                  if (String(pack.video).length > 10) {
                    $(".is-cluuf-video-pack").show();
                    $(".cluuf-video-pack").attr("data-src", pack.video);

                    var $videoSrc;
                    $(".video-btn").click(function () {
                      $videoSrc = $(this).data("src");
                    });

                    // when the modal is opened autoplay it
                    $("#myModal").on("shown.bs.modal", function (e) {
                      // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                      $("#video").attr(
                        "src",
                        $videoSrc +
                          "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
                      );
                    });

                    // stop playing the youtube video when I close the modal
                    $("#myModal").on("hide.bs.modal", function (e) {
                      // a poor man's stop video
                      $("#video").attr("src", $videoSrc);
                    });
                  }

                  let contador = "1";
                  localStorage.setItem("contador", contador);
                  setInterval(() => {
                    if (localStorage.getItem("contador") === "0") {
                      $(".zoom-gallery .panel1").attr("src", pack.gallery1);
                      localStorage.setItem("contador", "1");
                    } else if (localStorage.getItem("contador") === "1") {
                      $(".zoom-gallery .panel1").attr("src", pack.gallery2);
                      localStorage.setItem("contador", "2");
                    } else if (localStorage.getItem("contador") === "2") {
                      $(".zoom-gallery .panel1").attr("src", pack.gallery3);
                      localStorage.setItem("contador", "0");
                    }
                  }, 5000);

                  if (pack.isDefaultColor) {
                    $("body .review-form.cluuf-instance-background-form").css(
                      "background",
                      INSTANCE_.color
                    );

                    $("body .plan_description div").css(
                      "background",
                      INSTANCE_.color
                    );

                    $(".cluuf-pack-labelBtnForm").css(
                      "background-color",
                      INSTANCE_.primary
                    );

                    $("body .scrollup").css(
                      "background-color",
                      INSTANCE_.primary
                    );

                    $(" body .product-content  .item-title").css(
                      "background",
                      INSTANCE_.primary
                    );
                  } else {
                    $("body .review-form.cluuf-instance-background-form").css(
                      "background",
                      pack.backgroundForm
                    );

                    $("body .plan_description div").css(
                      "background",
                      pack.backgroundForm
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

                    $(".cluuf-pack-labelBtnForm").css(
                      "background-color",
                      pack.colorBtnForm
                    );
                  }

                  if (pack.privacyPolicy && pack.privacyPolicy.length > 5) {
                    $("#isPrivacyPolicy").val(true);
                    $(".isPrivacyPolicyPack").show();
                    $(".privacyPolicyPack").attr("href", pack.privacyPolicy);
                  }

                  if (pack.parentalControl) {
                    $("#isParentalControl").val(true);
                    $(".isParentalControl").show();
                  }

                  if (pack.isVaccine) {
                    $("#isVaccine").val(true);
                    $(".isVaccine").show();
                  }

                  if (pack.cupon) {
                    $("#isCupon").val(true);
                    $(".isCupon").show();
                  }

                  if (pack.isTemporal) {
                    $(".isTemporalPack").hide();
                  }

                  if (pack.isFree) {
                    $(".cluuf-isFree").hide();
                  }

                  $(".cluuf-isTicketsNumber").hide();
                  if (pack.isTicketsNumber) {
                    $(".cluuf-isTicketsNumber").show();
                  }

                  $(".cluuf-isDocumentRequired").hide();
                  if (pack.isDocumentRequired) {
                    $(".cluuf-isDocumentRequired").show();
                  }

                  $(".isCancellationPolicy").hide();
                  if (String(INSTANCE_.cancellationPolicy).length > 10) {
                    $(".isCancellationPolicy").show();
                    $(".cancellationPolicy").html(INSTANCE_.cancellationPolicy);
                  }

                  $(".isTermsConditions").hide();
                  if (String(INSTANCE_.termsConditions).length > 10) {
                    $(".isTermsConditions").show();
                    $(".termsConditions").html(INSTANCE_.termsConditions);
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

                  $(".image-avatar").attr("src", pack.avatar);
                  $(".image-gallery1").attr("src", pack.gallery1);
                  $(".image-gallery2").attr("src", pack.gallery2);
                  $(".image-gallery3").attr("src", pack.gallery3);
                  $(".image-gallery4").attr("src", pack.gallery4);

                  $(".cluuf-pack-availableDays").html(days);

                  $("#time option").remove();
                  if (pack.departureTime) {
                    var seletedTime = "";
                    pack.departureTime.forEach((element) => {
                      seletedTime = "";
                      if (getParameterByName_pack("h") === element) {
                        seletedTime = "selected";
                      }

                      $("#time").append(
                        `<option ${seletedTime} value="${element}">${element}</option>`
                      );
                    });
                  }

                  if (getParameterByName_pack("f"))
                    $("#date").val(getParameterByName_pack("f"));

                  if (pack.itineraries && String(pack.itineraries).length > 5) {
                    $(".is-cluuf-pack-itineraries").show();
                    let itinerariesHTML = String(pack.itineraries).split(",");
                    itinerariesHTML.forEach((element) => {
                      if (String(element.trim()).length > 2) {
                        $(".pack_itineraries").append(
                          `<li class="clock">${capitalize(element.trim())}</li>`
                        );
                      }
                    });
                  }

                  if (pack.include && String(pack.include).length > 5) {
                    $(".is-cluuf-pack-include").show();
                    let includesHTML = String(pack.include).split(",");
                    includesHTML.forEach((element) => {
                      if (String(element.trim()).length > 2) {
                        $(".pack_include").append(
                          `<li>${capitalize(element.trim())}</li>`
                        );
                      }
                    });
                  }

                  if (pack.exclude && String(pack.exclude).length > 5) {
                    $(".is-cluuf-pack-exclude").show();
                    let excludehtml = String(pack.exclude).split(",");
                    excludehtml.forEach((element) => {
                      if (String(element.trim()).length > 2) {
                        $(".pack_exclude").append(
                          `<li class="red">${capitalize(element.trim())}</li>`
                        );
                      }
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
                      if (String(element.trim()).length > 2) {
                        $(".pack_recomendations").append(
                          `<li class="blue">${capitalize(element.trim())}</li>`
                        );
                      }
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
                                JSON.stringify({
                                  name: element.name,
                                  observation: element.observation,
                                })
                              );

                              if (
                                getParameterByName_pack("p") === element._id
                              ) {
                                $("#plan").append(
                                  `<option selected value="${element._id}">${
                                    element.name
                                  } - Costo:  ${priceFormat(
                                    element.price
                                  )}</option>`
                                );

                                $("#planname").val(
                                  JSON.parse(
                                    sessionStorage.getItem($("#plan").val())
                                  ).name
                                );

                                if (
                                  String(
                                    JSON.parse(
                                      sessionStorage.getItem($("#plan").val())
                                    ).observation
                                  ).length > 10
                                ) {
                                  $(".plan_description").html(
                                    `<div>
                                    ${
                                      JSON.parse(
                                        sessionStorage.getItem($("#plan").val())
                                      ).observation
                                    }</div>`
                                  );
                                }
                              } else {
                                $("#plan").append(
                                  `<option value="${element._id}">${
                                    element.name
                                  } - Costo:  ${priceFormat(
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

                  $(" body .contact-page .contact-box-wrap .contact-form").css(
                    "background",
                    instance.result.color
                  );

                  $("body .form-group .submit-btn").css(
                    "background-color",
                    instance.result.primary
                  );

                  let filePack = "";
                  $.each(result2.packs, function (i, n) {
                    filePack = "app_s.html";
                    if (n.isTemporal) filePack = "app_s3.html";
                    $(".packs-list").append(` 
                          <div class="col-lg-4 col-md-6">
                          <div class="block-box product-box">
                              <div class="product-img">
                              <a href="${filePack}?q=${n._id}&agency=${instance.result.alias}&type=suscriber&p=${n._id}&fclt=web&utmc=web&raId=null&ruId=null#"><img src="${n.avatar}" alt="${n.name}"></a>
                              </div>
                              <div class="product-content">
                                  <div class="item-category">
                                      <a href="#">${n.category}</a>
                                  </div>
                                  <h3 class="product-title"><a href="${filePack}?q=${n._id}&agency=${instance.result.alias}&type=suscriber&p=${n._id}&fclt=web&utmc=web&raId=null&ruId=null#">${n.name}</a></h3>
                                  <div class="product-price" style="display: none">${priceFormat(
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
  if (
    String(JSON.parse(sessionStorage.getItem($("#plan").val())).observation)
      .length > 10
  ) {
    $(".plan_description div").remove();
    $("#planname").val(
      JSON.parse(sessionStorage.getItem($("#plan").val())).name
    );
    $(".plan_description").html(
      `<div>
      ${JSON.parse(sessionStorage.getItem($("#plan").val())).observation}</div>`
    );
  }
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
