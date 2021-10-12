const globals_gym = Object.freeze({
  CLUUFWEB_SERVER_FORM_GYM: `${localStorage.getItem(
    "backend_url"
  )}/subscription_app`,
});

const sendRequestGYMCluuf = (
  {
    name = null,
    email = null,
    message = null,
    phone = null,
    quantity = null,
    date = null,
    time = null,
    packId = null,
    instanceId = null,
    plan = null,
    campaign = null,
    adminEmail = null,
    isNotifyContact = null,
    refererAppId = "",
    refererUserId = "",
    cupon = "",
    facilitator = "",
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
  }).toString();

  fetch(globals_gym.CLUUFWEB_SERVER_FORM_GYM, {
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
      required: true,
      message: "",
    },
    email = {
      value: "",
      required: true,
      message: "",
    },
    name = {
      value: "",
      required: true,
      message: "",
    },
    message = {
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
