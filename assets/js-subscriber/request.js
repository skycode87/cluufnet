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

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/tour_get_instance?${params1}`,
    true
  );
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

const getReferer = async ({ instanceId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();

  const params1 = new URLSearchParams({
    refererId: getParameterByName_pack("ruId"),
    instanceId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/tour_get_referer?${params1}`,
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result.root[0]);
    }
  };
  xhttp.send();
};

const getApp = async ({ instanceId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();

  const params1 = new URLSearchParams({
    appId: getParameterByName_pack("app"),
    instanceId,
    invoice: getParameterByName_pack("invoice") || null,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/tour_get_app?${params1}`,
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result.result);
    }
  };
  xhttp.send();
};

const getPacks = async ({ instanceId }, { onSuccess = {}, onError = {} }) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/tour_get_packs?${params1}`,
    true
  );

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getPlans = async (
  { instanceId, packId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
    packId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/subscripcion_get_plans?${params1}`,
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getPlan = async (
  { instanceId, planId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
    planId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/subscripcion_get_plan?${params1}`,
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(xhttp.responseText);
      onSuccess(result);
    }
  };
  xhttp.send();
};

const getAppSurvey = async (
  { instanceId, appId },
  { onSuccess = {}, onError = {} }
) => {
  const xhttp = new XMLHttpRequest();
  const params1 = new URLSearchParams({
    instanceId,
    appId,
  }).toString();

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/subscripcion_get_app?${params1}`,
    true
  );
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

  xhttp.open(
    `GET`,
    `${localStorage.getItem("backend_url")}/tour_find_app?${params1}`,
    true
  );

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
  const type = getParameterByName_pack("type");
  sessionStorage.removeItem("ruId");
  sessionStorage.removeItem("raId");
  sessionStorage.removeItem("utmc");
  sessionStorage.removeItem("fclt");

  if (getParameterByName_pack("ruId"))
    sessionStorage.setItem("ruId", getParameterByName_pack("ruId"));

  if (getParameterByName_pack("raId"))
    sessionStorage.setItem("raId", getParameterByName_pack("raId"));

  if (getParameterByName_pack("utmc"))
    sessionStorage.setItem("utmc", getParameterByName_pack("utmc"));

  if (getParameterByName_pack("fclt"))
    sessionStorage.setItem("fclt", getParameterByName_pack("fclt"));

  sessionStorage.getItem("packType", type);
  try {
    const xhttp = new XMLHttpRequest();

    xhttp.open(
      `GET`,
      `${localStorage.getItem("backend_url")}/instanceByAlias/${alias}`,
      true
    );

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

const planValidate = ({ onSuccess = {}, onError = {} }) => {
  const instanceId = getParameterByName_pack("instanceId");
  const id = getParameterByName_pack("planId");
  try {
    const xhttp = new XMLHttpRequest();

    xhttp.open(
      `GET`,
      `${localStorage.getItem("backend_url")}/planValidate/${id}/${instanceId}`,
      true
    );

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

const loadCluufPackContent = ({
  method = "GET",
  params = "",
  url = "",
  body = null,
  contentType = "application/x-www-form-urlencoded",
}) => {
  try {
    const xhttp = new XMLHttpRequest();
    var searchParams = new URLSearchParams(params);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", contentType);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        var status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const result = JSON.parse(xhttp.responseText);
          sessionStorage.setItem("galleryPackCount", 0);
          let index = parseInt(sessionStorage.getItem("galleryPackCount"));

          Object.keys(result).forEach((key) => {
            index = sessionStorage.getItem("galleryPackCount");

            if (
              String(result[key].code).indexOf(
                sessionStorage.getItem("packname")
              ) > -1
            ) {
              if (result[key].type === "TEXT") {
                $(`.clf-content-pack_${result[key].tag}`).html(
                  result[key].content
                );
              }

              if (result[key].type === "LIST") {
                if (String(result[key].content).length > 2) {
                  let listado = result[key].content.split(",");
                  $(`.clf-list-pack_${result[key].tag} li`).remove();
                  listado.forEach((key2, index) => {
                    $(`.clf-list-pack_${result[key].tag}`).append(
                      `<li>${key2}</li>`
                    );
                  });
                } else {
                  $(`.is-cluuf-pack-${result[key].tag}`).hide();
                }
              }

              if (result[key].type === "HTML") {
                $(`.clf-content-pack_${result[key].tag}`).html(
                  result[key].content
                );
              }

              if (result[key].type === "IMAGE") {
                if (
                  String(result[key].code).indexOf(
                    sessionStorage.getItem("packname")
                  ) > -1
                ) {
                  // Editar todas las imagenes del pack
                  $(".imageUpdatePack").append(` 
                  <div class="col-lg-4 col-md-6">
                  <div class="block-box">
                      <div class="product-img">
                      <img  class="clf-src-pack_${result[key].tag}  tagpack_ active " alt="related" src="${result[key].content}" class="img-fluid" />
                      </div>
                  </div>
              </div>`);

                  $(`.clf-src-pack_${result[key].tag}`).attr(
                    "src",
                    result[key].content
                  );
                }
              }
            }
          });
        } else {
        }
      }
    };
    xhttp.send();
  } catch (error) {}
};

const loadCluufContent = ({
  method = "GET",
  params = "",
  url = "",
  body = null,
  contentType = "application/x-www-form-urlencoded",
}) => {
  try {
    const xhttp = new XMLHttpRequest();
    var searchParams = new URLSearchParams(params);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", contentType);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        var status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const result = JSON.parse(xhttp.responseText);
          Object.keys(result).forEach((key) => {
            if (result[key].type === "TEXT") {
              $(`.clf-content-${result[key].code}`).html(result[key].content);
            }

            if (result[key].tag === "primaryColor") {
              $(".fixed-header .header-menu").css(
                "background-color",
                result[key].content
              );
            }

            if (result[key].tag === "coverImage") {
              $(".product-breadcrumb.image-cover").css(
                "background-image",
                `url(${result[key].content})`
              );

              $(".product-breadcrumb.image-cover").addClass(
                "clf-src-general_coverImage tag_"
              );
            }

            if (result[key].type === "LIST") {
              let listado = result[key].content.split(",");
              listado.forEach((key2, index) => {
                $(`.clf-list-${result[key].code}-${index}`).text(key2);
              });
            }

            if (result[key].type === "HTML") {
              $(`.clf-content-${result[key].code}`).html(result[key].content);
            }

            if (result[key].type === "IMAGE") {
              $(`.clf-src-${result[key].code}`).attr(
                "src",
                result[key].content
              );
            }
          });
        } else {
        }
      }
    };
    xhttp.send();
  } catch (error) {}
};


const sendSurvey = (
  {
   appId,
   rate,
   instanceId
  },
  { onSuccess = {}, onError = {}, onFinally = {} }
) => {

  const body = new URLSearchParams({
  appId,
   rate,
   instanceId
  }).toString();


  fetch(`${localStorage.getItem("backend_url")}/subscription_survey_app`, {
    method: "PUT",
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