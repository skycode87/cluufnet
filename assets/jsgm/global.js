// const backend_url_ = "https://cluufweb-backend.herokuapp.com";
const backend_url_ = "http://localhost:2001";

localStorage.setItem("backend_url", backend_url_);
localStorage.setItem("params", location.search);

const goto = (name) => {
  if (localStorage.getItem("params")) {
    let active = {};
    if (name === "gmu") active.user = "active";
    if (name === "gma") active.admin = "active";

    localStorage.setItem(
      "main-menu",
      `<li><a href="javascript:goto('gmu')" class="${
        active.user || ""
      }">Clientes</a></li>
    <li><a href="javascript:goto('gma')" class="${
      active.admin || ""
    }">Equipo</a></li>
    <li><a href="#" >Nuevo Cliente</a></li>
    `
    );

    window.location.href = `${name}.html${localStorage.getItem("params")}`;
  } else {
    alert("Falta de parametros validos para continuar, inicie sesión de nuevo");
  }
};

if (localStorage.getItem("main-menu")) {
  document.getElementById("main-menu").innerHTML =
    localStorage.getItem("main-menu");
} else {
  goto("gmu");
}

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

const globals_pack = Object.freeze({
  CLUUFWEB_SERVER_FORM: `${backend_url_}/tour_app`,
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

const priceFormat = (text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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

const getParameterByName_pack = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const getParameterByNameURL = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};
