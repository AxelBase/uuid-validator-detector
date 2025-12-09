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

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427';
  const donationAmounts = [1, 3, 5, 10];
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
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
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

        <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
            <button class="btn btn-coffee d-flex align-items-center gap-2" on:click={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="coffee-icon">
                <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
              </svg>
              <span class="d-none d-md-inline">Buy me a coffee</span>
            </button>
        
            {#if isDropdownOpen}
              <div class="bmac-dropdown glass-card" transition:slide={{ duration: 200 }}>
                {#each donationAmounts as amount}
                  <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
                    ${amount}
                  </a>
                {/each}
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
        <span style="color: var(--color-text-muted);">© {new Date().getFullYear()} AxelBase UUID Validation</span>
        <div class="d-flex gap-3 mt-2 mt-md-0">
            <a href="{base}/privacy">Privacy Policy</a>
            <a href="{base}/terms">Terms of Service</a>
        </div>
    </div>
</footer>

<style>
  /* Logo Animation */
  .navbar-brand-logo { height: 35px; width: auto; transition: transform 0.4s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg) scale(1.1); }
  .brand-text { font-weight: 800; font-size: 1.4rem; color: var(--color-text-main); letter-spacing: -1px; }

  /* Nav Links */
  .nav-link-custom { 
      position: relative; 
      padding: 0.5rem 1rem; 
      color: var(--color-text-main); 
      font-weight: 600; 
      transition: color 0.3s;
      text-decoration: none; 
  }
  .nav-link-custom::after { 
      content: ''; position: absolute; width: 0; height: 3px; bottom: 0; left: 50%; 
      background-color: var(--brand-yellow-grey); 
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 
      transform: translateX(-50%); border-radius: 2px; 
  }
  .nav-link-custom:hover { color: var(--brand-yellow-grey); }
  .nav-link-custom:hover::after { width: 80%; }

  /* Coffee Button */
  .btn-coffee { 
      background: var(--brand-yellow-grey); 
      color: white; 
      font-weight: 700; 
      border-radius: 25px;
      padding: 0.4rem 1rem; 
      box-shadow: 0 4px 10px rgba(143, 139, 102, 0.3); 
      transition: all 0.2s;
  }
  .btn-coffee:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 6px 15px rgba(143, 139, 102, 0.5); 
      filter: brightness(1.1);
  }
  .coffee-icon { width: 18px; height: 18px; }

  /* Dropdown */
  .bmac-dropdown { 
      position: absolute; top: 120%; right: 0; width: 100px; padding: 0.5rem; 
      z-index: 1050; display: flex; flex-direction: column; gap: 5px;
  }
  .bmac-dropdown a { 
      display: block; padding: 8px; text-align: center; border-radius: 10px; 
      font-weight: bold; color: var(--color-text-main); 
      transition: background 0.2s; 
  }
  .bmac-dropdown a:hover { background: var(--brand-yellow-grey); color: white; }

  /* Theme Toggle */
  .theme-toggle-btn {
      background: transparent;
      border: 2px solid var(--color-text-main);
      color: var(--color-text-main);
      width: 40px; height: 40px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
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