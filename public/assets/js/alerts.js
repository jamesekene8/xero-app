// /* eslint-disable */

// export const hideAlert = () => {
//   const el = document.querySelector(".alert");
//   if (el) el.parentElement.removeChild(el);
// };

// // type is 'success' or 'error'
// export const showAlert = (type, msg, time = 7) => {
//   hideAlert();
//   const markup = `<div class="alert alert--${type}">${msg}</div>`;
//   document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
//   window.setTimeout(hideAlert, time * 1000);
// };

export const showAlert = (type, msg) => {
  const markup = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  document.querySelector(".my_alerts").insertAdjacentHTML("afterbegin", markup);
};
