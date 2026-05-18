// Tab switching functionality
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const contentContainer = document.getElementById("content-container");

const tabFiles = {
  about: "about.html",
  projects: "projects.html",
  history: "history.html",
  contact: "contact.html",
};

// Load content from external file
async function loadContent(tabName) {
  const filePath = tabFiles[tabName];
  if (!filePath) return;

  try {
    // Fade out current content
    contentContainer.classList.remove("fade-in");
    contentContainer.classList.add("fade-out");

    // Wait for fade-out to complete before loading new content
    await new Promise((resolve) => setTimeout(resolve, 300));

    const response = await fetch(filePath);
    const html = await response.text();
    contentContainer.innerHTML = html;
    
    // Remove fade-out and add fade-in animation
    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");
    
    // Re-initialize lucide icons after loading new content
    if (window.lucide) {
      window.lucide.createIcons();
    }
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
    contentContainer.innerHTML = `<p class="text-red-500">Error loading content</p>`;
    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");
  }
}

// Update active tab styling
function setActiveTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;

    button.setAttribute("aria-selected", String(isActive));
    button.classList.toggle("bg-zinc-700", isActive);
    button.classList.toggle("border-t", isActive);
    button.classList.toggle("border-zinc-300", isActive);
    button.classList.toggle("hover:bg-gray-600", !isActive);
  });

  // Load the content for the active tab
  loadContent(tabName);
}

// Add click handlers to tab buttons
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
