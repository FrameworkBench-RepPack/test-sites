document.addEventListener("click", (event: Event) => {
  const element = (event.target as HTMLElement)?.parentElement;
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
