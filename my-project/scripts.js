// Tab switching functionality
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const contentContainer = document.getElementById("content-container");

const tabFiles = {
  about: "about.html",
  projects: "projects.html",
  history: "history.html",
  contact: "contact.html",
};

const branchFiles = {
  experience: "experience.html",
  achievements: "achievements.html",
  certifications: "certifications.html",
};

let currentBranch = "experience";

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

    // Setup branch switcher for any tab that has a branches dropdown
    if (tabName === "history" || tabName === "achievements" || tabName === "certifications") {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        setupBranchSwitcher();
        // For history tab, default to experience
        if (tabName === "history") {
          currentBranch = "experience";
          loadBranchContent("experience");
        } else {
          // For achievements/certifications tabs, load the respective branch
          currentBranch = tabName;
          loadBranchContent(tabName);
        }
      }, 100);
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

// Branch switching functionality (for history tab)
function setupBranchSwitcher() {
  const branchesBtn = document.getElementById("branchesBtn");
  const branchesMenu = document.getElementById("branchesMenu");
  const branchOptions = document.querySelectorAll(".branch-option");
  const branchesLabel = document.getElementById("branchesLabel");

  if (!branchesBtn) return; // Only setup if we're on history tab

  branchesBtn.addEventListener("click", () => {
    branchesMenu.classList.toggle("hidden");
  });

  branchOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const branch = option.dataset.branch;
      currentBranch = branch;
      const label = option.textContent.trim();
      branchesLabel.textContent = label.split(/\s{2,}/)[0].trim() || label;
      branchesMenu.classList.add("hidden");
      loadBranchContent(branch);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".branches-dropdown") && !e.target.closest("#branchesMenu")) {
      branchesMenu.classList.add("hidden");
    }
  });
}

async function loadBranchContent(branch) {
  const filePath = branchFiles[branch];
  if (!filePath || !contentContainer) return;

  try {
    contentContainer.classList.remove("fade-in");
    contentContainer.classList.add("fade-out");

    await new Promise((resolve) => setTimeout(resolve, 300));

    const response = await fetch(filePath);
    const html = await response.text();
    contentContainer.innerHTML = html;

    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Re-setup branch switcher for any branch content that has a branches dropdown
    setTimeout(() => {
      setupBranchSwitcher();
    }, 100);
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");
  }
}

// Initialize with 'about' tab active
setActiveTab("about");

// Log window dimensions (debug)
const width = window.innerWidth;
const height = window.innerHeight;

console.log("Width:", width);
console.log("Height:", height);
