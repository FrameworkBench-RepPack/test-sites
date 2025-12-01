const contents = document.createElement("span");
contents.classList.add("contents");
let tooltipOpen;

document.addEventListener("click", (event) => {
  const element = event.target;
  if (tooltipOpen) {
    if (
      element !== tooltipOpen &&
      element !== contents &&
      !contents.contains(element)
    ) {
      contents.remove();
      tooltipOpen = undefined;
    }
  } else {
    if (element?.classList?.contains("tooltip")) {
      contents.innerText = element.dataset.contents;
      element.insertAdjacentElement("afterend", contents);
      tooltipOpen = element;
    }
  }
});
