const globals_gym = Object.freeze({
  CLUUFWEB_SERVER_FORM_GYM: `${localStorage.getItem(
    "backend_url"
  )}/subscriber_new_app`,

  CLUUFWEB_SERVER_FORM_NEW_ACTIVATE: `${localStorage.getItem(
    "backend_url"
  )}/subscriber_new_and_activate_app`,
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
  }).toString();

  console.log({
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
    facilitator,
    birthday,
    medium,
    lastname,
    firstname,
  });

  let url = globals_gym.CLUUFWEB_SERVER_FORM_GYM;

  if (activate === "done") {
    url = globals_gym.CLUUFWEB_SERVER_FORM_NEW_ACTIVATE;
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
  },
  { onSuccess, onError }
) => {
  if (name.required) {
    if (name.value === "") {
      Swal.fire({
        title: "Por favor valide el nombre",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (email.required) {
    if (email.value === "") {
      Swal.fire({
        title: "Por favor valide el Email",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (date.required) {
    if (date.value === "") {
      Swal.fire({
        title: "Por favor valide la fecha de inicio",
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  if (phone.required) {
    if (phone.value === "") {
      Swal.fire({
        title: "Por favor valide el número de teléfono",
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
    document: document.value || null,
    documentType: documentType.value || null,
    address: address.value || null,
    firstname: firstname.value || null,
    lastname: lastname.value || null,
    birthday: birthday.value || null,
    medium: medium.value || null,
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
  };

  sendRequestGYMCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);
      if (res.ok) {
        Swal.fire(`Los datos han sido enviados con exito`, "", "success");
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
      name: {
        value: $("#name").val(),
        required: true,
        message: "Please verify Name and try again.",
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
      activate: "none",
    },
    {
      onSuccess: (response) => {
        $("#name").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#message").val("");
        $("#quantity").val("0");
        $("#cupon").val("");
        $("#facilitator").val("");
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
