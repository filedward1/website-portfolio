// Tab switching functionality
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

function setActiveTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;

    button.setAttribute("aria-selected", String(isActive));
    button.classList.toggle("bg-zinc-700", isActive);
    button.classList.toggle("border-t", isActive);
    button.classList.toggle("border-zinc-300", isActive);
    button.classList.toggle("hover:bg-gray-600", !isActive);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.tabPanel !== tabName);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.tab) {
      setActiveTab(button.dataset.tab);
    }
  });
});

// Initialize with 'about' tab active
setActiveTab("about");

// Log window dimensions (debug)
const width = window.innerWidth;
const height = window.innerHeight;

console.log("Width:", width);
console.log("Height:", height);
