const globals_gym = Object.freeze({
  CLUUFWEB_SERVER_FORM_GYM: `${localStorage.getItem(
    "backend_url"
  )}/subscriber_new_app`,

  CLUUFWEB_SERVER_FORM_NEW_ACTIVATE: `${localStorage.getItem(
    "backend_url"
  )}/subscriber_new_and_activate_app`,

  CLUUFWEB_SERVER_FORM_TOUR: `${localStorage.getItem(
    "backend_url"
  )}/createAppfromWebsite`,
  CLUUFWEB_SERVER_VALIDATE_TOUR: `${localStorage.getItem(
    "backend_url"
  )}/subscriber_available_tour`,
});

const sendRequestGYMCluuf = (
  {
    name = null,
    email = null,
    message = null,
    phone = null,
    quantity = null,
    date = null,
    document = null,
    documentType = null,
    firstname = null,
    medium = null,
    lastname = null,
    address = null,
    time = null,
    packId = null,
    instanceId = null,
    plan = null,
    birthday = null,
    campaign = null,
    adminEmail = null,
    isNotifyContact = null,
    refererAppId = "",
    refererUserId = "",
    cupon = "",
    facilitator = "",
    activate = "none",
    paymentMode = "none",
    tour = "none",
    isParentalControl = false,
    isVaccine = false,
    isPrivacyPolicy = false,
    paymentReference = "",
    amount = 0,
    secure,
  },
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  const code = "67896789987656789"; //localStorage.getItem("usr");

  const body = new URLSearchParams({
    name,
    email,
    message,
    phone,
    quantity,
    date,
    document,
    documentType,
    address,
    time,
    packId,
    instanceId,
    plan,
    campaign,
    adminEmail,
    isNotifyContact,
    refererAppId,
    refererUserId,
    cupon,
    birthday,
    facilitator,
    firstname,
    lastname,
    medium,
    paymentMode,
    isParentalControl,
    isVaccine,
    isPrivacyPolicy,
    paymentReference,
    amount,
    secure,
    planId: localStorage.getItem("cluuf-planId") || null,
  }).toString();

  let url = globals_gym.CLUUFWEB_SERVER_FORM_GYM;

  if (activate === "done") {
    url = globals_gym.CLUUFWEB_SERVER_FORM_NEW_ACTIVATE;
  }

  if (tour === "done") {
    url = globals_gym.CLUUFWEB_SERVER_FORM_TOUR;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.removeItem("cluuf-planId");
      onSuccess(data);
    })
    .catch(function (err) {
      onError(err);
      console.log(err);
    })
    .finally(function () {
      if (sessionStorage.getItem("redirect")) {
        setTimeout(() => window.history.back(), 2000);
      }

      onFinally({
        ok: true,
      });
    });
};

const sendRequestAvailableTour = (
  { fecha = null, hora = null, planId = null },
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  const body = new URLSearchParams({
    fecha,
    hora,
    rootId: sessionStorage.getItem("referer"),
    instanceId: $("#instanceId").val(),
    packId: sessionStorage.getItem("cluuf-packId"),
    planId,
  }).toString();

  let url = globals_gym.CLUUFWEB_SERVER_VALIDATE_TOUR;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
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
      if (sessionStorage.getItem("redirect")) {
        setTimeout(() => window.history.back(), 2000);
      }

      onFinally({
        ok: true,
      });
    });
};

const connectToCluuf_SUBSCRIPTION_Pack = (
  {
    quantity = {
      value: "1",
      required: false,
      message: "",
    },
    email = {
      value: "",
      required: true,
      message: "",
    },
    name = {
      value: "",
      required: false,
      message: "",
    },
    firstname = {
      value: "",
      required: false,
      message: "",
    },
    lastname = {
      value: "",
      required: false,
      message: "",
    },
    message = {
      value: "",
      required: false,
      message: "",
    },
    address = {
      value: "",
      required: false,
      message: "",
    },
    document = {
      value: "",
      required: false,
      message: "",
    },
    documentType = {
      value: "",
      required: false,
      message: "",
    },
    paymentMode = {
      value: "",
      required: false,
      message: "",
    },
    phone = {
      value: "",
      required: false,
      message: "",
    },
    date = {
      value: "",
      required: false,
      message: "",
    },
    time = {
      value: "",
      required: false,
      message: "",
    },
    birthday = {
      value: "",
      required: false,
      message: "",
    },
    medium = {
      value: "",
      required: false,
      message: "",
    },
    paymentReference = {
      value: "",
      required: false,
      message: "",
    },
    amount = {
      value: "",
      required: false,
      message: "",
    },
    secure,
    plan,
    campaign = null,
    formId = null,
    instanceId = null,
    successMessage = "",
    messagePosition = "top",
    messageVisible = true,
    adminEmail = false,
    isNotifyContact = false,
    refererAppId = "",
    refererUserId = "",
    cupon = "",
    facilitator = "",
    activate = null,
    isVaccine = false,
    isParentalControl = false,
    isPrivacyPolicy = false,
    tour = null,
  },
  { onSuccess, onError }
) => {
  if (name.required) {
    if (name.value === "") {
      Swal.fire({
        title: "please validate firstname",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (email.required) {
    if (email.value === "") {
      Swal.fire({
        title: "please validate email address",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (date.required) {
    if (date.value === "") {
      Swal.fire({
        title: "please validate departure date",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (phone.required) {
    if (phone.value === "") {
      Swal.fire({
        title: "please validate phone number",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (address.required) {
    if (address.value === "") {
      Swal.fire({
        title: address.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (document.required) {
    if (document.value === "") {
      Swal.fire({
        title: document.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (documentType.required) {
    if (documentType.value === "") {
      Swal.fire({
        title: documentType.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (birthday.required) {
    if (birthday.value === "") {
      Swal.fire({
        title: birthday.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (firstname.required) {
    if (firstname.value === "") {
      Swal.fire({
        title: firstname.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (lastname.required) {
    if (lastname.value === "") {
      Swal.fire({
        title: lastname.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (medium.required) {
    if (medium.value === "") {
      Swal.fire({
        title: medium.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  $("form .li-submit").hide();
  $("form .li-loading").show();

  const params2 = {
    name: name.value,
    email: email.value,
    message: message.value || "",
    phone: phone.value || "",
    quantity: quantity.value || 1,
    date: date.value || null,
    time: time.value || null,
    document: document.value || "",
    documentType: documentType.value || "",
    address: address.value || "",
    firstname: firstname.value || "",
    lastname: lastname.value || "",
    birthday: birthday.value || "",
    medium: medium.value || "",
    paymentMode: paymentMode.value || "none",
    paymentReference: paymentReference.value || "",
    amount: amount.value || 0,
    packId: formId,
    instanceId,
    campaign,
    plan,
    adminEmail,
    isNotifyContact,
    refererAppId,
    refererUserId,
    cupon,
    facilitator,
    activate,
    isVaccine,
    isParentalControl,
    isPrivacyPolicy,
    tour,
    secure,
  };

  sendRequestGYMCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Well done!",
          text: " (We'll send you an email within 1 minute. Please check your SPAM folder too).",
        });
      }

      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
    onError: () => {
      onError();
      Swal.fire(`Ocurrio un error en el proceso de registro`, "", "error");
    },
    onFinally: () => {
      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
  });
};

const submitSubscription = () => {
  if ($("#isPrivacyPolicy").val() === "true") {
    if (!$("#privacyPolicy").prop("checked")) {
      Swal.fire({
        title:
          "Por favor acepta los términos y condiciones para poder continuar",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if ($("#isParentalControl").val() === "true") {
    if (!$("#parentalControl").prop("checked")) {
      Swal.fire({
        title:
          "Esta aplicación es válida solo para personas mayores de 18 años",
        timer: 3000,
        icon: "warning",
      });
      return false;
    }
  }

  if ($("#isVaccine").val() === "true") {
    if (!$("#isVaccine").prop("checked")) {
      Swal.fire({
        title:
          "Esta aplicación es válida solo para personas vacunadas contra el Covid19",
        timer: 3000,
        icon: "warning",
      });
      return false;
    }
  }

  connectToCluuf_SUBSCRIPTION_Pack(
    {
      email: {
        value: $("#email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      quantity: {
        value: $("#quantity").val(),
        required: true,
        message: "Please verify quantity and try again.",
      },
      firstname: {
        value: $("#firstname").val(),
        required: true,
        message: "Please verify firstname and try again.",
      },
      lastname: {
        value: $("#lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      phone: {
        value: $("#phone").val(),
        required: false,
        message: "Please verify phone and try again.",
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
      document: {
        required: false,
        value: " ",
        message: "Please verify documento and try again.",
      },
      documentType: {
        required: false,
        value: " ",
        message: "Please verify Tipo de Documento and try again.",
      },
      formId: $("#formId").val(), // proporcionado por cluuf-web
      instanceId: $("#instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: $("#campaign").val(),
      plan: $("#plan").val(),
      adminEmail: $("#adminEmail").val(),
      isNotifyContact: $("#isNotifyContact").val(),
      refererUserId: $("#refererUserId").val(),
      refererAppId: $("#refererAppId").val(),
      cupon: $("#cupon").val(),
      facilitator: $("#facilitator").val(),
      isParentalControl: $("#isParentalControl").val(),
      isPrivacyPolicy: $("#isPrivacyPolicy").val(),
      isVaccine: $("#isVaccine").val(),
      activate: "none",
    },
    {
      onSuccess: (response) => {
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#message").val("");
        $("#quantity").val("1");
        $("#cupon").val("");
        $("#facilitator").val("");
        $("#time").val("");
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const submitSubscriptionS3 = () => {
  if ($("#isPrivacyPolicy").val() === "true") {
    if (!$("#privacyPolicy").prop("checked")) {
      Swal.fire({
        title:
          "Por favor acepta los têrminos y condiciones para poder continuar",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if ($("#isParentalControl").val() === "true") {
    if (!$("#parentalControl").prop("checked")) {
      Swal.fire({
        title:
          "Esta aplicación es válida solo para personas mayores de 18 años",
        timer: 3000,
        icon: "warning",
      });
      return false;
    }
  }

  if (String($("#plan").val()).length > 10) {
    $("#date").val(
      String(
        JSON.parse(sessionStorage.getItem($("#plan").val())).departureDate
      ).substr(0, 10)
    );
    $("#time").val(
      String(JSON.parse(sessionStorage.getItem($("#plan").val())).departureTime)
    );
  }

  if ($("#isVaccine").val() === "true") {
    if (!$("#isVaccine").prop("checked")) {
      Swal.fire({
        title: "Please validate the vaccination card field.",
        timer: 3000,
        icon: "warning",
      });
      return false;
    }
  }

  connectToCluuf_SUBSCRIPTION_Pack(
    {
      email: {
        value: $("#email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("#firstname").val(),
        required: true,
        message: "Please verify firstname and try again.",
      },
      lastname: {
        value: $("#lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      phone: {
        value: $("#phone").val(),
        required: false,
        message: "Please verify phone and try again.",
      },
      message: {
        value: $("#message").val(),
        required: false,
        message: "Please verify Message and try again.",
      },
      quantity: {
        value: $("#quantity").val(),
        required: false,
        message: "Please verify quantity and try again.",
      },
      date: {
        required: true,
        value: $("#date").val(),
        message: "Please verify date and try again.",
      },
      document: {
        required: false,
        value: $("#document").val(),
        message: "Please verify documento and try again.",
      },
      documentType: {
        required: false,
        value: $("#documentType").val(),
        message: "Please verify Document type and try again.",
      },
      paymentMode: {
        required: false,
        value: $("#paymentMode").val(),
        message: "Please verify Payment Mode and try again.",
      },
      paymentReference: {
        required: false,
        value: $("#paymentReference").val(),
        message: "Please verify payment Reference Mode and try again.",
      },
      amount: {
        required: false,
        value: String($("#currency-field").val())
          .replaceAll(".", "")
          .replaceAll("$", "")
          .trim(),
        message: "Please verify amount and try again.",
      },
      time: {
        required: true,
        value: $("#time").val(),
        message: "Please verify Departure Time and try again.",
      },
      formId: $("#formId").val(), // proporcionado por cluuf-web
      instanceId: $("#instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: $("#campaign").val(),
      adminEmail: $("#adminEmail").val(),
      isNotifyContact: $("#isNotifyContact").val(),
      refererUserId: $("#refererUserId").val(),
      refererAppId: $("#refererAppId").val(),
      cupon: $("#cupon").val(),
      isParentalControl: $("#isParentalControl").val(),
      isPrivacyPolicy: $("#isPrivacyPolicy").val(),
      isVaccine: $("#isVaccine").val(),
      facilitator: $("#facilitator").val(),
      activate: "none",
      tour: "done",
      secure: sessionStorage.getItem("secure") || 1,
    },
    {
      onSuccess: (response) => {
        if (
          $("#isExternal").val() === "true" &&
          $("#redirectTo").val() === "whatsappRedirect" &&
          String($("#whatsappRedirect").val()).length > 5
        ) {
          let userInfo = `Hola, estoy interesado en ${$(
            "#quantity"
          ).val()} cupos(s) para *${localStorage.getItem("cluufpackname")}  ${$(
            "#date"
          ).val()}  [${$("#time").val()}]*. Datos personales: ${$(
            "#firstname"
          ).val()} ${$("#lastname").val()}(${$("#email").val()} & ${$(
            "#phone"
          ).val()})`;

          let url = `https://wa.me/${$("#whatsappRedirect")
            .val()
            .trim()}?text=${encodeURIComponent(userInfo)}`;

          location.href = url;
        } else {
          $("#firstname").val("");
          $("#lastname").val("");
          $("#time").val("");
          $("#email").val("");
          $("#phone").val("");
          $("#message").val("");
          //$("#quantity").val("1");
          $("#cupon").val("");
          $("#paymentMode").val("none");
          $("#observation").val("");
          $("#document").val("");
          $("#documentType").val("");
          setTimeout(() => location.reload(), 1000);
        }
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const submitSubscriptionS1 = () => {
  if ($("#isPrivacyPolicy").val() === "true") {
    if (!$("#privacyPolicy").prop("checked")) {
      Swal.fire({
        title:
          "Por favor acepta los têrminos y condiciones para poder continuar",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if ($("#isParentalControl").val() === "true") {
    if (!$("#parentalControl").prop("checked")) {
      Swal.fire({
        title:
          "Esta aplicación es válida solo para personas mayores de 18 años",
        timer: 3000,
        icon: "warning",
      });
      return false;
    }
  }

  connectToCluuf_SUBSCRIPTION_Pack(
    {
      email: {
        value: $("#email").val(),
        required: true,
        message: "Please verify Email and try again.",
      },
      firstname: {
        value: $("#firstname").val(),
        required: true,
        message: "Please verify firstname and try again.",
      },
      lastname: {
        value: $("#lastname").val(),
        required: true,
        message: "Please verify lastname and try again.",
      },
      phone: {
        value: $("#phone").val(),
        required: false,
        message: "Please verify phone and try again.",
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
      document: {
        required: true,
        value: $("#document").val(),
        message: "Please verify documento and try again.",
      },
      documentType: {
        required: true,
        value: $("#documentType").val(),
        message: "Please verify Tipo de Documento and try again.",
      },
      address: {
        required: true,
        value: $("#address").val(),
        message: "Please verify address and try again.",
      },
      birthday: {
        required: true,
        value: $("#birthday").val(),
        message: "Please verify birthday and try again.",
      },
      medium: {
        required: true,
        value: $("#medium").val(),
        message: "Please verify medium and try again.",
      },
      formId: $("#formId").val(), // proporcionado por cluuf-web
      instanceId: $("#instanceId").val(), // proporcionado por cluuf-web
      successMessage: "The message has been sent successfully",
      campaign: $("#campaign").val(),
      plan: $("#plan").val(),
      adminEmail: $("#adminEmail").val(),
      isNotifyContact: $("#isNotifyContact").val(),
      refererUserId: $("#refererUserId").val(),
      refererAppId: $("#refererAppId").val(),
      cupon: $("#cupon").val(),
      facilitator: $("#facilitator").val(),
      secure: sessionStorage.getItem("secure") || 1,
      activate: "done",
    },
    {
      onSuccess: (response) => {
        $("#firstname").val("");
        $("#lastname").val("");
        $("#birthday").val("");
        $("#address").val("");
        $("#document").val("");
        $("#documentType").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#message").val("");
        $("#quantity").val("0");
        $("#cupon").val("");
        $("#facilitator").val("");
        $("#medium").val("");
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};

const submitValidarDisponibilidad = (execute = false) => {
  if ($("#isExternal").val() === "false") {
    const fecha = $("#date").val() || null;
    const hora = $("#time").val() || null;
    const planId = $("#plan").val() || "0";
    if (String($("#plan").val()).length > 10) {
      $("#date").val(
        String(
          JSON.parse(sessionStorage.getItem($("#plan").val())).departureDate
        ).substr(0, 10)
      );
      $("#time").val(
        String(
          JSON.parse(sessionStorage.getItem($("#plan").val())).departureTime
        )
      );
    }
    sendRequestAvailableTour(
      { fecha, hora, planId },
      {
        onSuccess: (data) => {
          if ($("#isExternal").val() === "false") {
            localStorage.setItem("cluuf-planId", planId);
            if (data.result.availability) {
              const availability =
                parseInt(data.result.maxLimit) -
                parseInt(data.result.totalApps);

              if (availability > 0) {
                $(".no-more-space").hide("fast");
                $(".cluuf-plan-available").text(availability);
                $(".cluuf-plan-pending").text(data.result.pending);
                $(".cluuf-plan-date").text(data.result.name);
                $(".availability-panel").show("fast");
                $(".availability-panel-loading").hide();

                if (execute) {
                  submitSubscriptionS3();
                }
              } else {
                $(".no-more-space").show("fast");
              }
            } else {
              $(".wrapper-availability-panel").hide();
              if (!data.result.isExist) {
                $(".availability-panel").hide();
                $(".cluuf-plan-date").text(
                  `${$("#date").val()} ${$("#time").val()} `
                );
                $(".cluuf-plan-available").text($("#maxLimit").val());
                $(".cluuf-plan-pending").text(0);
                //   $(".availability-panel").show("fast");
                $(".availability-panel-loading").hide();
                if (execute) {
                  submitSubscriptionS3();
                }
              }
            }
          } else {
            if (execute) {
              submitSubscriptionS3();
            }
          }
        },
        onError: () => {},
        onFinally: () => {},
      }
    );
  } else {
    if (execute) {
      submitSubscriptionS3();
    }
  }
};
