const backend_url_ = "https://cluufweb-backend.herokuapp.com";
// const backend_url_ = "http://localhost:2001";

const getParameterByName_pack = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const getInstance = async (
  { instanceId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/tour_get_instance?${params1}`, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      console.log(result);
      onSuccess(result.instance[0]);
    }
  };
  xhttp.send();
};

const getPacks = async ({ instanceId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/tour_get_packs?${params1}`, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getPack = async ({ instanceId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const packId = getParameterByName_pack("q");

  const params1 = new URLSearchParams({
    instanceId,
    packId, //60d8678e1a9233bd8b0a9dba
  }).toString();

  xhttp.open(`GET`, `${backend_url_}/tour_find_app?${params1}`, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getConnection = ({ onSuccess = {}, onError = {} }) => {
  const alias = getParameterByName_pack("agency");
  try {
    const xhttp = new XMLHttpRequest();

    xhttp.open(`GET`, `${backend_url_}/instanceByAlias/${alias}`, true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(xhttp.responseText);
        onSuccess(result);
      }
    };
    xhttp.send();
  } catch {}
};
