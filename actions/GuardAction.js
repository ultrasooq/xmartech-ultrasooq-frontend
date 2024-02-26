export function GuardAction() {
  return new Promise((resolve) => {
    if (localStorage.getItem("accessToken")) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
