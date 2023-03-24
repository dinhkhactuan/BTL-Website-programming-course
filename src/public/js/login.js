const btnlogin = document.querySelector(".btn-form-login");
const alertsussess = document.querySelector(".alert-sussess");
const alertfalse = document.querySelector(".alert-false");
if (btnlogin)
  btnlogin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin();
  });
async function handleLogin() {
  const email = document.querySelector("#Email").value;
  const password = document.querySelector("#Password").value;
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.data.status == "success") {
      alertsussess.classList.add("active_success");
      setTimeout(() => {
        window.setTimeout(() => {
          location.assign("/");
        });
      }, 2000);
    }
  } catch (error) {
    // else if (res.data.status != "success") {
    alertfalse.classList.add("active_false");
    setTimeout(() => {
      alertfalse.classList.remove("active_false");
    }, 2000);
    // }
  }
}
