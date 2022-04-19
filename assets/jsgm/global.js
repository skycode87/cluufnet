// const backend_url_ = "https://cluufweb-backend.herokuapp.com";
let backend_url_ = "https://my-app-3ocg5.ondigitalocean.app";
let frontend_url_ = "https://cluuf-web.herokuapp.com";

localStorage.setItem("backend_url", backend_url_);
localStorage.setItem("frontend_url", frontend_url_);

localStorage.setItem(
  "aws_url",
  "https://cluufcontent.s3.sa-east-1.amazonaws.com"
);
localStorage.setItem("params", location.search);

if (String(document.location.host).indexOf("localhost") > -1) {
  backend_url_ = "http://localhost:2001";
  frontend_url_ = "http://localhost:3000";
  localStorage.setItem("backend_url", backend_url_);
  localStorage.setItem("frontend_url", frontend_url_);
}

const goto = (name) => {
  if (localStorage.getItem("params")) {
    let active = {};
    if (name === "gmu") active.user = "active";
    if (name === "gma") active.admin = "active";

    window.location.href = `${name}.html${localStorage.getItem("params")}`;
  } else {
    alert("Falta de parametros validos para continuar, inicie sesión de nuevo");
  }
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

const isValid = (dato) => {
  if (!dato || dato === undefined || dato === "" || dato === null) {
    return false;
  }
  return true;
};

const setCookies_ = (name, value, expires = null) => {
  if (expires === null) {
    document.cookie = `${name}=${value}`;
  } else {
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = `${name}=${value}; expires=${now.toUTCString()}`;
  }
};
const getCookies_ = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
const removeCookie_ = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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

const dateFormat = (date) => moment(date).format("L");
const dateFormat2 = (date) => moment(date).format("LL");
const dateFormat4 = (date) => moment(date).format(" dddd MMMM Do YYYY"); // July 2nd 2021, 3:19:33 am
const timeFormat3 = (date) => moment(date, "HH:mm").format("h:mm a"); // July 2nd 2021, 3:19:33 am
