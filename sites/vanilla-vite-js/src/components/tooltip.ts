const contents = document.createElement("span");
contents.classList.add("contents");
let tooltipOpen: HTMLElement | undefined;

document.addEventListener("click", (event: Event) => {
  const element = event.target as HTMLElement;
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
      contents.innerText = element.dataset.contents!;
      element.insertAdjacentElement("afterend", contents);
      tooltipOpen = element;
    }
  }
});
