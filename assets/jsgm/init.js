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

const initConnection = ({ onSuccess, onError }) => {
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
      $(`form.user #sangretype option[value='${user.sangretype}']`).attr(
        "selected",
        true
      );

      getInstance(
        { instanceId: userdata.result.instanceId },
        {
          onSuccess: (result) => {
            $(".fixed-header .header-menu").css(
              "background-color",
              result.color
            );
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
            $(".gotours-href").attr(
              "href",
              `tours.html?agency=${result.alias}`
            );

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
                $(".cluuf-instance-instagram-src").attr(
                  "href",
                  result.instagram
                );
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

            onSuccess(result);
          },
          onError: (result) => {
            onError(true);
            console.log(result);
          },
        }
      );
    },
  });
};

initConnection({
  onSuccess: () => {
    searchUserbyText({ textValue: "" });
    searchTeambyText({ textValue: "" });
  },
  onError: () => {},
});

$(".cluuf-alert").on("click", () => {
  $(".cluuf-alert").hide("fast");
});
