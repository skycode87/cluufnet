const globals_pack = Object.freeze({
  CLUUFWEB_SERVER_FORM: "https://cluufweb-backend.herokuapp.com/tour_app",
  // CLUUFWEB_SERVER_FORM: "https://38c7-2800-e2-180-e7f-58ee-c0b7-c44b-51e4.ngrok.io/tour_app",
});

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
    successMessage = "",
    messagePosition = "top",
    messageVisible = true,
  },
  { onSuccess, onError }
) => {
  if (name.required) {
    if (name.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: name.message,
        messagePosition,
      });
      return false;
    }
  }
  if (email.required) {
    if (email.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: email.message,
        messagePosition,
      });
      return false;
    }
  }
  if (date.required) {
    if (date.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: date.message,
        messagePosition,
      });
      return false;
    }
  }
  if (time.required) {
    if (time.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: time.message,
        messagePosition,
      });
      return false;
    }
  }

  if (phone.required) {
    if (phone.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: phone.message,
        messagePosition,
      });
      return false;
    }
  }

  if (message.required) {
    if (message.value === "") {
      cluufAlert_pack({
        type: "error",
        title: "Invalid Field",
        message: message.message,
        messagePosition,
        messageVisible,
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
        cluufAlert_pack({
          type: "success",
          title: "Information Sent!",
          message: successMessage,
          messagePosition: "bottom",
        });
      }

      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
    onError: () => {
      onError();
      cluufAlert_pack({
        type: "error",
        title: "",
        message: "Error enviando la información!",
        messagePosition: "bottom",
      });
    },
    onFinally: () => {
      $("form .li-submit").show();
      $("form .li-loading").hide();
    },
  });
};

const cluufAlert_pack = ({
  type = "success",
  title = "",
  message = "",
  messagePosition = "top",
}) => {
  var positionClass = "cluuf-alert-top";
  if (messagePosition === "bottom") {
    positionClass = "cluuf-alert-bottom";
  }

  $("#form-reservation").append(
    `<div  onclick="this.style.display='none'" class="cluuf-alert ${positionClass} ${type}"><span class="closebtn" >&times;</span>&nbsp;&nbsp;<span class="text">${message}</span></div>`
  );
  setTimeout(function () {
    $(".cluuf-alert").hide("fast");
  }, 5000);
};

const validarEmail_pack = (valor) => {
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!re.exec(valor)) {
    return false;
  } else return true;
};

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
  },
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {
  const code = "67896789987656789"; //localStorage.getItem("usr");
  const paramsform = `date=${date}&time=${time}&code=${code}&quantity=${quantity}&instanceId=${instanceId}&packId=${packId}&name=${name}&email=${email}&message=${message}&phone=${phone}&packId=${packId}`;

  fetch(globals_pack.CLUUFWEB_SERVER_FORM, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: paramsform,
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

/*
const crm_register_pack = (params) => {
  return fetch(CLUUFWEB_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.error(err);
    });
};
*/
