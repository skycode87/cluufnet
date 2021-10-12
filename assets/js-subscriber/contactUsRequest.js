const globals_contactus = Object.freeze({
  CLUUFWEB_SERVER_FORM: `${localStorage.getItem(
    "backend_url"
  )}/userbyFormWebsite`,
});

const form_register_contact_us = (body) => {
  return fetch(globals_contactus.CLUUFWEB_SERVER_FORM, {
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
      $("#fname").val("");
      $("#femail").val("");
      $("#fmessage").val("");
      $("#fphone").val("");
      return data;
    })
    .catch(function (err) {
      console.error(err);
    });
};

const website_form_register_contact_us = (
  {
    name = "",
    lastname = "",
    email = null,
    message = "",
    phone = null,
    campaign = null,
    formId = "",
    instanceId,
    keypublic,
    cluuf,
  },
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  const code = user;
  let instanceId_ = "";
  let keypublic_ = "";

  if (instanceId.length > 2) {
    instanceId_ = instanceId;
  } else {
    instanceId_ = INSTANCEID;
  }

  if (keypublic.length > 2) {
    keypublic_ = keypublic;
  } else {
    keypublic_ = KEYPUBLIC;
  }

  if (keypublic_ === "") return false;
  if (formId === "") return false;

  if (validarEmail_(email)) {
    const body = new URLSearchParams({
      code,
      email,
      message,
      phone,
      name,
      lastname,
      instanceId: instanceId_,
      keypublic: keypublic_,
      planId: formId,
      cluuf,
      campaign,
    }).toString();

    form_register_contact_us(body)
      .then(() => {
        onSuccess({
          ok: true,
        });
      })
      .catch(function (error) {
        onError({
          ok: false,
        });
      })

      .finally(function () {
        onFinally({
          ok: true,
        });
      });
  } else {
    return false;
  }
};

const connectToCluufContactUs = (
  {
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
    campaign = null,
    formId = null,
    instanceId = "",
    keypublic = "",
    cluuf = "",
  },
  { onSuccess, onError }
) => {
  if (name.required) {
    if (name.value === "") {
      Swal.fire({
        title: name.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }
  if (email.required) {
    if (email.value === "") {
      Swal.fire({
        title: email.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }
  if (phone.required) {
    if (phone.value === "") {
      Swal.fire({
        title: phone.message,
        timer: 2000,
        icon: "warning",
      });
      return false;
    }
  }

  const params2 = {
    name: name.value,
    email: email.value,
    message: message.value || "",
    phone: phone.value || "",
    campaign,
    formId,
    company: "qreatech",
    instanceId,
    keypublic,
    cluuf,
  };

  website_form_register_contact_us(params2, {
    onSuccess: (res) => {
      Swal.fire({
        title: "El email ha sido enviado!",
        text: "Pronto recibira respuestas al email proporcionado",
        timer: 2000,
        icon: "success",
      });
      $("#fname").val("");
      $("#femail").val("");
      $("#fmessage").val("");
      $("#fphone").val("");
    },
    onError: () => {
      Swal.fire({
        title: "Disculpe, ocurrio un error en el servidor",
        timer: 2000,
        icon: "error",
      });
    },
    onFinally: () => {},
  });
};

const formSubmit = () => {
  connectToCluufContactUs(
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
