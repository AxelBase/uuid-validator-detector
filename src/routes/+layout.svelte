<script lang="ts">
  import { base } from '$app/paths';
  import { slide, fade } from 'svelte/transition';
  import '../app.css';

  // --- Theme Logic ---
  let isDarkMode = false;

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', theme);
  }

  // --- Buy Me A Coffee + Bitcoin Logic ---
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>

<header class="fixed-top glass-nav">
  <nav class="container py-2 d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none">
        <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-brand-logo" />
        <span class="brand-text d-none d-sm-inline">AxelBase</span>
      </a>
    </div>

    <ul class="nav d-none d-lg-flex align-items-center gap-2 m-0">
      <li><a class="nav-link-custom" href="{base}/">Home</a></li>
      <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
      <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
      <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
      <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
    </ul>

    <div class="d-flex align-items-center gap-3">
      <button class="theme-toggle-btn" on:click={toggleTheme} aria-label="Toggle Dark Mode">
        {#if isDarkMode}
          <i class="bi bi-sun-fill text-warning" in:fade></i>
        {:else}
          <i class="bi bi-moon-stars-fill" style="color: var(--brand-green-blue);" in:fade></i>
        {/if}
      </button>

      <!-- Buy me a Coffee + Bitcoin Dropdown -->
      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="bmac-button d-flex align-items-center gap-2 text-white border-0 px-4 py-2 rounded-pill shadow-sm"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-md-inline fw-semibold">Buy me a Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass-card mt-2"
            transition:slide={{ duration: 220, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$3</span> One Coffee
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$5</span> Two Coffees
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Crypto (Bitcoin)
            </a>
          </div>
        {/if}
      </div>

      <button
        class="d-lg-none btn border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileNav"
        aria-label="Toggle mobile menu"
      >
        <i class="bi bi-list fs-1" style="color: var(--color-text-main);"></i>
      </button>
    </div>
  </nav>

  <div class="collapse d-lg-none glass-nav border-top" id="mobileNav">
    <div class="container py-3 d-flex flex-column gap-3 text-center">
      <a class="nav-link-custom" href="{base}/">Home</a>
      <a class="nav-link-custom" href="{base}/#about">About</a>
      <a class="nav-link-custom" href="{base}/#how-to">How to use</a>
      <a class="nav-link-custom" href="{base}/#faq">FAQ</a>
      <a class="nav-link-custom" href="{base}/blog">Blog</a>
    </div>
  </div>
</header>

<main class="container mb-5" style="margin-top: 100px;">
  <slot />
</main>

<footer class="glass-nav py-4 mt-auto">
  <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center small">
    <span style="color: var(--color-text-muted);">© {currentYear} AxelBase UUID Validation</span>
    <div class="d-flex gap-3 mt-2 mt-md-0">
      <a href="{base}/privacy">Privacy Policy</a>
      <a href="{base}/terms">Terms of Service</a>
    </div>
  </div>
</footer>

<style>
  /* ── Buy Me a Coffee Button (from File 1 + glass adaptation) ── */
  .bmac-button {
    background: var(--brand-yellow-grey);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(143, 139, 102, 0.35);
  }

  .bmac-button:hover {
    background: color-mix(in srgb, var(--brand-yellow-grey) 85%, white 15%);
    transform: translateY(-2px);
    box-shadow: 0 7px 18px rgba(143, 139, 102, 0.45);
  }

  /* ── Dropdown (glass + better spacing) ── */
  .bmac-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1050;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.22s ease;
  }

  .bmac-dropdown a:hover {
    background: color-mix(in srgb, var(--brand-yellow-grey) 12%, transparent);
    color: var(--brand-yellow-grey);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 800;
    color: var(--brand-yellow-grey);
    font-size: 1.15rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 700;
    color: var(--brand-yellow-grey);
    border-top: 1px solid var(--glass-border);
    justify-content: center !important;
    padding: 14px 20px;
  }

  .bitcoin-option {
    font-size: 0.96rem;
    color: #f7931a !important; /* bitcoin orange */
  }

  .bitcoin-option:hover {
    color: #f5b55a !important;
    background: rgba(247, 147, 26, 0.08) !important;
  }

  /* Keep your existing styles for other elements */
  .navbar-brand-logo { height: 35px; width: auto; transition: transform 0.4s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg) scale(1.1); }
  .brand-text { font-weight: 800; font-size: 1.4rem; color: var(--color-text-main); letter-spacing: -1px; }

  .nav-link-custom {
    position: relative;
    padding: 0.5rem 1rem;
    color: var(--color-text-main);
    font-weight: 600;
    transition: color 0.3s;
    text-decoration: none;
  }

  .nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 50%;
    background-color: var(--brand-yellow-grey);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .nav-link-custom:hover { color: var(--brand-yellow-grey); }
  .nav-link-custom:hover::after { width: 80%; }

  .theme-toggle-btn {
    background: transparent;
    border: 2px solid var(--color-text-main);
    color: var(--color-text-main);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .theme-toggle-btn:hover {
    background: var(--color-text-main);
  }

  .theme-toggle-btn:hover i {
    color: var(--primary-bg) !important;
  }
</style>