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
let outsideClickBound = false;

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
    // If loading the history tab, keep a persistent outer card wrapper
    if (tabName === "history") {
      // create a consistent outer container matching projects card
      contentContainer.innerHTML = `
        <div class="bg-zinc-800 rounded-lg p-6 shadow-lg border border-zinc-700">
          <div id="branch-wrapper"></div>
        </div>
      `;

      // parse fetched html and extract the branch container's inner content
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        // find the first element whose class starts with 'branch-'
        const branchEl = Array.from(doc.body.querySelectorAll("div")).find(el => el.className && el.className.trim().startsWith("branch-"));
        // Also try to strip any outer card wrapper in history.html to avoid nested containers
        const outerCard = doc.querySelector('.bg-zinc-800.rounded-lg') || doc.querySelector('.overflow-hidden');
        let inner = html;
        if (outerCard) {
          inner = outerCard.innerHTML;
        } else if (branchEl) {
          // If branchEl contains its own inner wrapper, strip that too
          const innerWrapper = branchEl.querySelector('.overflow-hidden, .bg-zinc-800');
          inner = innerWrapper ? innerWrapper.innerHTML : branchEl.innerHTML;
        }
        const wrapper = document.getElementById("branch-wrapper");
        if (wrapper) wrapper.innerHTML = inner;
      } catch (err) {
        // fallback to inserting raw html
        const wrapper = document.getElementById("branch-wrapper");
        if (wrapper) wrapper.innerHTML = html;
      }
    
    } else {
      contentContainer.innerHTML = html;
    }
    
    // Remove fade-out and add fade-in animation
    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");
    
    // Re-initialize lucide icons after loading new content
    if (window.lucide) {
      window.lucide.createIcons();
    }
    // Ensure tooltip-link class and data-tooltip exist on dynamically loaded links
    if (typeof ensureTooltipLinks === 'function') ensureTooltipLinks();

    // Setup branch switcher for any tab that has a branches dropdown
    if (tabName === "history" || tabName === "achievements" || tabName === "certifications") {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        setupBranchSwitcher();
        // History already renders experience content from history.html,
        // so avoid an extra fetch that causes the double-load effect.
        if (tabName === "history") {
          currentBranch = "experience";
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

  if (!branchesBtn.dataset.bound) {
    branchesBtn.addEventListener("click", () => {
      branchesMenu.classList.toggle("hidden");
    });
    branchesBtn.dataset.bound = "true";
  }

  branchOptions.forEach((option) => {
    if (option.dataset.bound) return;

    option.addEventListener("click", () => {
      const branch = option.dataset.branch;
      currentBranch = branch;
      const label = option.textContent.trim();
      branchesLabel.textContent = label.split(/\s{2,}/)[0].trim() || label;
      branchesMenu.classList.add("hidden");
      loadBranchContent(branch);
    });

    option.dataset.bound = "true";
  });

  // Bind once and always resolve the current menu from the DOM.
  if (!outsideClickBound) {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".branches-dropdown") || e.target.closest("#branchesMenu")) {
        return;
      }

      const menu = document.getElementById("branchesMenu");
      if (menu) {
        menu.classList.add("hidden");
      }
    });
    outsideClickBound = true;
  }
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
    // If currently viewing history tab and a persistent wrapper exists, insert only the branch inner content
    const wrapper = contentContainer.querySelector("#branch-wrapper");
    if (wrapper) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const branchEl = Array.from(doc.body.querySelectorAll("div")).find(el => el.className && el.className.trim().startsWith("branch-"));
        let inner = branchEl ? branchEl.innerHTML : html;
        if (branchEl) {
          const innerWrapper = branchEl.querySelector(".overflow-hidden, .bg-zinc-800");
          if (innerWrapper) inner = innerWrapper.innerHTML;
        }
        wrapper.innerHTML = inner;
      } catch (err) {
        wrapper.innerHTML = html;
      }
    } else {
      contentContainer.innerHTML = html;
    }

    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Re-setup branch switcher for any branch content that has a branches dropdown
    setTimeout(() => {
      setupBranchSwitcher();
    }, 100);
    // Ensure tooltip-link class and data-tooltip exist on dynamically loaded links
    if (typeof ensureTooltipLinks === 'function') ensureTooltipLinks();
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
    contentContainer.classList.remove("fade-out");
    contentContainer.classList.add("fade-in");
  }
}

// Helper: ensure links inside dynamic content have tooltip/hover behavior
function ensureTooltipLinks() {
  const container = document.getElementById('content-container');
  const selectors = ['.branch-row a', '.flex a', '#content-container a', '.grid a'];
  const nodes = new Set();
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(n => nodes.add(n));
  });

  nodes.forEach(a => {
    if (!a.classList.contains('tooltip-link')) a.classList.add('tooltip-link');
    if (!a.dataset.tooltip) a.dataset.tooltip = a.title || 'View Link';
  });
}

// Initialize with 'about' tab active
setActiveTab("about");

// Log window dimensions (debug)
const width = window.innerWidth;
const height = window.innerHeight;

console.log("Width:", width);
console.log("Height:", height);
