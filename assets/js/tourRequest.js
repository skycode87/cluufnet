const globals_tour = Object.freeze({
  CLUUFWEB_SERVER_FORM: `${localStorage.getItem("backend_url")}/tour_app`,
});

const sendRequestCluuf = (
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
    code,
  }).toString();

  fetch(globals_tour.CLUUFWEB_SERVER_FORM, {
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

const connectToCluuf_Pack = (
  {
    quantity = {
      value: "",
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
    campaign = null,
    formId = null,
    instanceId = null,
  },
  { onSuccess, onError }
) => {
  if (name.required) {
    if (name.value === "") {
      Swal.fire({
        title: "please validate firstname",
        timer: 1500,
        icon: "warning",
      });
      return false;
    }
  }

  if (email.required) {
    if (email.value === "") {
      Swal.fire({
        title: "please validate email address",
        timer: 1500,
        icon: "warning",
      });
      return false;
    }
  }
  if (date.required) {
    if (date.value === "") {
      Swal.fire({
        title: "please validate date",
        timer: 1500,
        icon: "warning",
      });
      return false;
    }
  }
  if (time.required) {
    if (time.value === "") {
      Swal.fire({
        title: "Por favor valide la hora de salida",
        timer: 1500,
        icon: "warning",
      });
      return false;
    }
  }

  if (phone.required) {
    if (phone.value === "") {
      Swal.fire({
        title: "please validate phone number",
        timer: 1500,
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
    quantity: quantity.value || "",
    date: date.value || null,
    time: time.value || null,
    packId: formId,
    instanceId,
    campaign,
  };

  sendRequestCluuf(params2, {
    onSuccess: (res) => {
      onSuccess(res);

      if (res.ok) {
        Swal.fire({
          title: "La aplicación ha sido enviada con exito.",
          icon: "success",
        });
      }

      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
    onError: () => {
      onError();
      Swal.fire({
        title: "Ocurrio un error enviando la información",
        timer: 1500,
        icon: "error",
      });
    },
    onFinally: () => {
      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
  });
};

const submitTourPack = () => {
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
        $("#name").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#message").val("");
        $("#quantity").val("1");
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      onError: () => console.log("Error enviando el formulario"),
    }
  );
};
