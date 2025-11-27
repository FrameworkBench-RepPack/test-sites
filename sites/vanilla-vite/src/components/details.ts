for (const details of document.querySelectorAll(".details")) {
  const button = details.querySelector(".summary")!;
  button.addEventListener("click", () => {
    details.classList.toggle("open");
  });
}
