let backend_url_ = "https://cluufweb-backend.herokuapp.com";
localStorage.setItem("backend_url", backend_url_);
localStorage.setItem("aws_url", "https://cluuf.s3.sa-east-1.amazonaws.com");
localStorage.setItem("params", location.search);

if (String(document.location.host).indexOf("localhost") > -1) {
  backend_url_ = "http://localhost:2001";
}

const globals_pack = Object.freeze({
  CLUUFWEB_SERVER_USER_FORM: `${backend_url_}/user_gym`,
});

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

const validarEmail_ = (valor) => {
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!re.exec(valor)) {
    return false;
  } else return true;
};

const priceFormat = (text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
