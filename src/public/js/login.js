const btnlogin = document.querySelector("#Btn_Login");
// const Message_notifile = document.querySelector(".Message_notifile");
if (btnlogin)
  btnlogin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin();
  });
async function handleLogin() {
  const email = document.querySelector("#typeEmailX").value;
  const password = document.querySelector("#typePasswordX").value;
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
      // alertsussess.classList.add("active_success");
      setTimeout(() => {
        window.setTimeout(() => {
          location.assign("/");
        });
      }, 1000);
      console.log(Message_notifile);
      setTimeout(() => {
        Message_notifile.classList.add("test");
      }, 2000);
      // } else if (res.data.status == "failed") {
      //   alertfalse.classList.add("active_false");
    }
  } catch (error) {
    // else if (res.data.status != "success") {
    // alertfalse.classList.add("active_false");
    // setTimeout(() => {
    //   alertfalse.classList.remove("active_false");
    // }, 5000);
    // }
    console.log(error);
  }
}
