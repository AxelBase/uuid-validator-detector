<script lang="ts">
  import { base } from '$app/paths';
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Privacy Policy | UUID Validation and Version Detector</title>
  <meta name="description" content="Our privacy policy for the UUID Validation and Version Detector tool—100% client-side with no data collection." />
  <meta property="og:title" content="Privacy Policy | UUID Validation and Version Detector" />
  <meta property="og:description" content="Our privacy policy for the UUID Validation and Version Detector tool—100% client-side with no data collection." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container post-layout" in:fade={{ duration: 600 }}>
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose glass-card p-4 p-md-5">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: December 09, 2025</p>

    <h2>1. Introduction</h2>
    <p>Welcome to the <strong>UUID Validation and Version Detector</strong> ("we," "us," or "our"), a free client-side web utility for validating and detecting UUID versions. We are committed to protecting your privacy and operate on a <strong>zero-data-collection</strong> principle. Since all processing happens entirely in your browser, <strong>we do not collect, store, or transmit any personal information</strong>. This Privacy Policy explains our practices to ensure transparency and trust.</p>

    <h2>2. Information We Do Not Collect</h2>
    <p>We do not collect any data from users, including:</p>
    <ul>
      <li><strong>Personal Identifiable Information (PII)</strong>: Such as names, email addresses, or IP addresses.</li>
      <li><strong>Usage Data</strong>: No tracking of browser type, device info, location, or session details.</li>
      <li><strong>Input Data</strong>: Any UUIDs you enter or upload are processed locally and never leave your device.</li>
      <li><strong>Analytics or Cookies</strong>: We use no tracking tools, cookies, or pixels.</li>
    </ul>
    <p>Your data remains <strong>exclusively on your device</strong>. There are no servers involved, so nothing is logged or shared.</p>

    <h2>3. How the Tool Works</h2>
    <p>When you use our tool:</p>
    <ul>
      <li><strong>Local Processing</strong>: UUID validation and version detection occur in-browser using JavaScript—no external servers.</li>
      <li><strong>File Uploads</strong>: Files (.txt, .csv, .json) are read and parsed locally; nothing is uploaded.</li>
      <li><strong>Exports</strong>: Downloads (TXT, CSV, JSON) are generated on your device using browser APIs.</li>
    </ul>
    <p>This ensures <strong>complete data isolation</strong> and privacy for sensitive UUIDs in logs or databases.</p>

    <h2>4. Third-Party Services</h2>
    <p>We do not use third-party services that collect data. All functionality is self-contained in the browser.</p>

    <h2>5. Data Security</h2>
    <p>While we collect no data, we recommend:</p>
    <ul>
      <li>Using secure browsers.</li>
      <li>Avoiding public devices for sensitive inputs.</li>
      <li>Clearing browser cache after use.</li>
    </ul>
    <p>We are not responsible for device-level security.</p>

    <h2>6. Children's Privacy</h2>
    <p>Our tool is not directed at children under 13. We do not knowingly collect data from children.</p>

    <h2>7. International Users</h2>
    <p>As no data is collected, we comply with <strong>GDPR</strong>, <strong>CCPA</strong>, and other privacy laws by default.</p>

    <h2>8. Changes to This Policy</h2>
    <p>We may update this policy. Changes will be posted here with the new effective date.</p>

    <h2>9. Contact Us</h2>
    <p>For questions, contact us at axelbase@example.com.</p>

    <p class="italic-note">*Your privacy is our priority—use with confidence.*</p>
  </article>
</div>

<style>
  .post-layout { 
    max-width: 900px; 
    padding-top: 2rem; 
    padding-bottom: 4rem; 
    margin: 0 auto; 
  }

  /* Breadcrumbs */
  .breadcrumbs { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    margin-bottom: 1.5rem; 
    font-size: 0.95rem; 
    color: var(--color-text-muted); 
  }
  .breadcrumbs a { 
    color: var(--color-accent); 
    text-decoration: none; 
    font-weight: 600;
  }
  .breadcrumbs a:hover { 
    text-decoration: underline; 
    color: var(--color-text-main);
  }

  /* Prose / Content Styling */
  .prose { 
    line-height: 1.8; 
    border-radius: 20px;
  }
  
  .prose h1 { 
    font-size: 2.5rem; 
    margin-bottom: 0.5rem; 
    color: var(--color-text-main);
    font-weight: 800;
  }
  
  .post-meta { 
    color: var(--color-text-muted); 
    font-size: 0.95rem; 
    margin-bottom: 2rem; 
    border-bottom: 1px solid var(--glass-border); 
    padding-bottom: 1rem; 
  }
  
  .prose h2 { 
    margin-top: 2.5rem; 
    font-size: 1.75rem; 
    color: var(--color-accent); 
    border-bottom: 1px solid var(--glass-border); 
    padding-bottom: 0.5rem; 
    font-weight: 700;
  }
  
  .prose p { 
    margin: 1.2rem 0; 
    color: var(--color-text-main);
  }

  .prose ul {
    color: var(--color-text-main);
    margin-left: 1rem;
  }

  .prose li {
    margin-bottom: 0.5rem;
  }

  .italic-note { 
    font-style: italic; 
    text-align: center; 
    color: var(--color-text-muted) !important; 
    margin-top: 3rem; 
    font-size: 1.1rem; 
    background: var(--glass-border);
    padding: 1rem;
    border-radius: 15px;
  }
</style>