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
// control

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

const formaterModeTrans = (transMode) => {
  if (transMode === "cash") return "Efectivo";
  if (transMode === "card") return "Tarjeta de crédito";
  if (transMode === "deposit") return "Deposito";
  if (transMode === "debitcard") return "Tarjeta de débito";
  if (transMode === "creditcard") return "Tarjeta de crédito";
  if (transMode === "transfer") return "Transferencía";
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

          $("body").append(`
<div  class="whatsapp-icon isWhatsapp hide" style="z-index: 9999; position: fixed; right: 10px; bottom:100px; background: yellow; border-radius:20px" >
    <a target="blank" class="cluuf-instance-whatsapp-src" href="">
    <img class="image-whatsapp" width="70px" src="https://cluuftracks.herokuapp.com/whatsapp-transparent.png">
    </a>
  </div>`);

          $(".cluuf-gotours-href").attr(
            "href",
            `app_s0.html?agency=${
              result.alias
            }&type=suscriber&fclt=${sessionStorage.getItem(
              "fclt"
            )}&utmc=Local&raId=null&ruId=null`
          );

          INSTANCE_ = result;
          sessionStorage.removeItem("referer");

          if (getParameterByName_pack("utmc") === "referer") {
            var pnd_ = "end=134";
            if (getParameterByName_pack("pnd"))
              pnd_ = `pnd=${instance.result._id}`;

            getReferer(
              { instanceId: instance.result._id },
              {
                onSuccess: (root) => {
                  if (root.active) {
                    $(".cluuf-gotours-href").attr(
                      "href",
                      `app_s0.html?agency=${
                        result.alias
                      }&type=suscriber&fclt=${sessionStorage.getItem(
                        "fclt"
                      )}&utmc=referer&raId=null&ruId=${root._id}&${pnd_}`
                    );
                    sessionStorage.setItem("referer", root._id);
                    $(".cluuf-referer-avatar").attr("src", root.avatar);
                    $(".cluuf-referer-name").text(root.firstname);

                    $(".cluuf-root").show();
                    $(".cluuf-root-hidden").hide();
                  }
                },
              }
            );
          }

          if (
            getParameterByName_pack("utmc") === "invoice" &&
            getParameterByName_pack("app")
          ) {
            getApp(
              { instanceId: instance.result._id },
              {
                onSuccess: (resultApp) => {
                  if (resultApp) {
                    $(".cluuf-trans-amount").text(resultApp.transId.amount);
                    $(".trans-id").text(
                      `Security code:: ${resultApp.transId._id}-${resultApp._id}`
                    );

                    $(".cluuf-trans-total").text(resultApp.transId.amount);
                    $(".cluuf-trans-mode").text(
                      formaterModeTrans(resultApp.transId.mode)
                    );
                    $(".cluuf-trans-code").text(resultApp.transId.code);
                    $(".cluuf-trans-reference").text(
                      resultApp.transId.reference
                    );
                    $(".cluuf-trans-fecha").text(
                      moment(resultApp.paymentDate).format("L")
                    );
                    $(".cluuf-trans-description").text(
                      ` ${resultApp.code}  ${resultApp.packId.name} ${resultApp.planId.name}`
                    );

                    $(".cluuf-user-firstname").text(resultApp.userId.firstname);
                    $(".cluuf-user-lastname").text(resultApp.userId.lastname);
                    $(".cluuf-user-document").text(resultApp.userId.document);
                    $(".cluuf-user-email").text(resultApp.userId.email);
                    $(".cluuf-user-documentType").text(
                      resultApp.userId.documentType
                    );
                  } else {
                    $(".invoice-box").hide();
                    Swal.fire({
                      title: `Disculpe hubo un error emitiendo el comprobante`,
                      text: `Se ha informado al remitente, para que lo vuelva a generar`,
                      icon: "error",
                    });
                    setTimeout(() => window.close(), 3000);
                  }
                },
              }
            );
          }

          if (getParameterByName_pack("redirect"))
            sessionStorage.setItem("redirect", true);

          sessionStorage.setItem("secure", 1);
          // user pendiente
          if (getParameterByName_pack("pnd")) {
            $(".cluuf-referer-name").addClass("pnd");
            sessionStorage.setItem("secure", 0);
          }

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
          $(".cluuf-gowebsite-href").attr("href", result.website);
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

          localStorage.setItem("hostname", result.hostname);
          localStorage.setItem("instanceId", result._id);
          localStorage.setItem("keypublic", result.keypublic);
          localStorage.setItem("cluuf", "true");
          localStorage.setItem("alias", result.alias);
          $(".referer-title").hide();
          if (
            String(getParameterByName_pack("ruId")).length > 7 &&
            getParameterByName_pack("utmc") === "referer"
          ) {
            $(".availability-panel").show();
            $(".referer-title").show();
          }

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

          if (getParameterByName_pack("q")) {
            getPack(
              { instanceId: result._id },
              {
                onSuccess: (result) => {
                  const pack = result.pack[0];
                  sessionStorage.setItem("cluuf-pack", JSON.stringify(pack));
                  sessionStorage.setItem("cluuf-packId", pack._id);

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

                  console.log(pack.isFree);

                  if (pack.isFree) {
                    $(".cluuf-isFree").hide();
                    $("#paymentMode").hide();
                    $("#paymentMode").val("none");
                  } else {
                    $(".cluuf-pack-price").text(`
                    $  ${new Intl.NumberFormat("es-CO").format(
                      pack.price
                    )} Pesos Colombianos
                    `);
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

                  // $("#date").val(moment().format("YYYY-MM-DD"));

                  $(".cluuf-pack-name").text(pack.name);
                  $(".cluuf-pack-category").text(pack.category);
                  $(".cluuf-pack-price").text(priceFormat(pack.price));
                  $(".cluuf-pack-description").html(pack.description);
                  $(".cluuf-pack-duration").text(pack.duration);
                  $(".cluuf-pack-durationMode").text(pack.durationMode);

                  $(".cluuf-pack-id").val(pack._id);
                  $("#instanceId").val(pack.instanceId);
                  $(".cluuf-pack-iframeMap").append(pack.iframeMap);
                  $(".cluuf-pack-meetingPoint").append(pack.meetingPoint);
                  $(".cluuf-pack-excerpt").html(pack.excerpt);
                  $("#packname").val(pack.name);
                  $(".cluuf-pack-title").text(pack.title);
                  $("#maxLimit").val(pack.maxLimit);
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

                  if (String(getParameterByName_pack("ruId")).length > 6) {
                  } else {
                    // Sino tiene referido no es seguro
                    sessionStorage.setItem("secure", 0);
                  }

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

                  if (pack.isTemporal) submitValidarDisponibilidad();

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
                                  } - Costo:  ${
                                    !pack.isFree
                                      ? priceFormat(element.price)
                                      : "Gratis"
                                  }</option>`
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
                                  `<option  value="${element._id}">${
                                    element.name
                                  } - Costo:  ${
                                    !pack.isFree
                                      ? priceFormat(element.price)
                                      : "Gratis"
                                  }</option>`
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
                  let pnd__ = "";
                  $.each(result2.packs, function (i, n) {
                    pnd__ = "end=134";
                    filePack = "app_s.html";
                    if (n.isTemporal) filePack = "app_s3.html";

                    if (getParameterByName_pack("pnd"))
                      pnd__ = `pnd=${instance.result._id}`;

                    $(".packs-list").append(` 
                          <div class="col-lg-4 col-md-6">
                          <div class="block-box product-box">
                              <div class="product-img">
                              <a href="${filePack}?q=${n._id}&agency=${instance.result.alias}&type=suscriber&p=${n._id}&fclt=web&utmc=${sessionStorage.getItem("referer") ? "referer" : "Local"}&raId=null&ruId=${sessionStorage.getItem("referer")}&${pnd__}" ><img src="${n.avatar}" alt="${n.name}"></a>
                              </div>
                              <div class="product-content">
                                  <div class="item-category">
                                      <a href="#">${n.category}</a>
                                  </div>
                                  <h3 class="product-title"><a href="${filePack}?q=${n._id}&agency=${instance.result.alias}&type=suscriber&p=${n._id}&fclt=web&utmc=${sessionStorage.getItem("referer") ? "referer" : "Local"}&raId=null&ruId=${sessionStorage.getItem("referer")}&${pnd__}">${n.name}</a></h3>
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

var dtToday = new Date();

var month = dtToday.getMonth() + 1;
var day = dtToday.getDate();
var year = dtToday.getFullYear();
if (month < 10) month = "0" + month.toString();
if (day < 10) day = "0" + day.toString();

var maxDate = year + "-" + month + "-" + day;

$("#date").attr("min", maxDate);

// Format  Currency

$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // no decimal entered
  // add commas to number
  // remove all non-digits
  input_val = formatNumber(input_val);
  input_val = "$" + input_val;

  // final formatting
  if (blur === "blur") {
    // input_val += ".00";
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

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
      $(".cluuf-plan-available").text("0");
      $(".cluuf-plan-pending").text("0");
      $(".cluuf-plan-date").text("");
      Swal.fire({
        title: `Excuse me, we only have availability for the days ${daysName}`,
        icon: "error",
      });
    } else {
      if (
        sessionStorage.getItem("referer") &&
        getParameterByName_pack("utmc") === "referer"
      ) {
        $(".availability-panel").hide();
        setTimeout(() => $(".availability-panel").show("fast"), 500);
        submitValidarDisponibilidad();
      }
    }
  }
});

$("#time").on("change", () => {
  if (
    sessionStorage.getItem("referer") &&
    getParameterByName_pack("utmc") === "referer"
  ) {
    $(".availability-panel").hide();
    setTimeout(() => $(".availability-panel").show("fast"), 500);
    submitValidarDisponibilidad();
  }
});

$(".cluuf-alert").on("click", () => {
  $(".cluuf-alert").hide("fast");
});

$("#paymentMode").on("change", () => {
  if ($("#paymentMode").val() === "deposit") {
    $(".cluuf-isAmount").show();
    $("#currency-field").val("0");
  } else {
    $(".cluuf-isAmount").hide();
    $("#currency-field").val("0");
  }

  if (
    $("#paymentMode").val() === "card" ||
    $("#paymentMode").val() === "transfer"
  ) {
    $(".cluuf-isPaymentReference").show();
  } else {
    $(".cluuf-isPaymentReference").hide();
  }
});

function RamdonNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$("#firstname").on("change", () => {
  var user = `test${RamdonNumber(1000, 9999)}`;
  var tlf = `+57${RamdonNumber(11111, 99999999)}`;
  var docm = RamdonNumber(11111, 9999999);

  if (String($("#firstname").val()).indexOf("***") > -1) {
    $("#firstname").val(`${user}`);
    $("#lastname").val(`lastname`);
    $("#email").val(`${user}@nosend.com`);
    $("#phone").val(tlf);
    $("#message").val("");
    $("#cupon").val("");
    $("#paymentMode").val("none");
    $("#observation").val("");
    $("#document").val(docm);
    $("#documentType").val("passport");
  }
});
