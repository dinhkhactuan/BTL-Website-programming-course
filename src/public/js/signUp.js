const btnSignUp = document.querySelector("#btn_SignUp");
const alertsussess1 = document.querySelector(".alert-sussess");
const alertfalse1 = document.querySelector(".alert-false");
const username = document.querySelector("#username").value;
const email = document.querySelector("#Email").value;
const password = document.querySelector("#Password").value;
const confirmpassword = document.querySelector("#confirmPassword").value;

if (btnSignUp) {
  btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    if (!password) handleSignUp();
  });
}
async function handleSignUp() {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/signup",
      data: {
        username,
        email,
        password,
        confirmpassword,
      },
    });

    console.log(res);
    if (res.data.status == "success") {
      alertsussess1.classList.add("active_success");
      window.setTimeout(() => {
        location.assign("/login");
      }, 200);
    } else if (res.data == "vui lòng nhập đầy đủ thông tin") {
      alertfalse1.classList.add("active_false");
    }
  } catch (error) {
    alertfalse1.classList.add("active_false");
    setTimeout(() => {
      alertfalse1.classList.remove("active_false");
    }, 5000);
  }
}
