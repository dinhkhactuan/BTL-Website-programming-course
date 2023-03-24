const logout = document.querySelector("#avata_logout");
if (logout) {
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });
}
async function handleLogout() {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/user/logout",
    });
    if (res.data.status == "success") {
      location.reload(true);
    }
  } catch (error) {
    res.status(500).json("lỗi token");
  }
}
