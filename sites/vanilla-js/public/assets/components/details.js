document.addEventListener("click", (event) => {
  const element = event.target?.parentElement;
  if (!element?.classList?.contains("details")) return;

  if (element.classList.toggle("open")) {
    const contents = document.createElement("div");
    contents.classList.add("contents");
    contents.innerHTML = `<p>${element.dataset.contents}</p>`;
    element.appendChild(contents);
  } else {
    element.querySelector(".contents")?.remove();
  }
});
