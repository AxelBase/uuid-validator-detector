<script lang="ts">
  import { base } from '$app/paths';
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Terms and Conditions | UUID Validation and Version Detector</title>
  <meta name="description" content="Terms of use for our free client-side UUID validation tool—no accounts, no data collection." />
  <meta property="og:title" content="Terms and Conditions | UUID Validation and Version Detector" />
  <meta property="og:description" content="Terms of use for our free client-side UUID validation tool—no accounts, no data collection." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container post-layout" in:fade={{ duration: 600 }}>
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms and Conditions</p>
  </div>

  <article class="prose glass-card p-4 p-md-5">
    <h1>Terms and Conditions</h1>

    <p class="post-meta">Effective Date: December 09, 2025</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By using the <strong>UUID Validation and Version Detector</strong> ("Tool"), you agree to these Terms and Conditions ("Terms"). The Tool is a free, client-side utility for validating UUIDs—no accounts or data collection required. If you disagree, do not use the Tool.</p>

    <h2>2. License to Use</h2>
    <p>We grant you a <strong>limited, non-exclusive license</strong> to access and use the Tool for personal or professional purposes. You may not copy, modify, distribute, sell, or reverse-engineer the Tool.</p>

    <h2>3. No Data Collection</h2>
    <p>The Tool processes all inputs locally in your browser. <strong>We collect no data</strong>. Your UUIDs and files remain on your device.</p>

    <h2>4. User Responsibilities</h2>
    <p>You agree to:</p>
    <ul>
      <li>Use the Tool lawfully and not for illegal activities.</li>
      <li>Ensure your inputs do not violate third-party rights.</li>
      <li>Not overload or disrupt the Tool.</li>
    </ul>

    <h2>5. Disclaimers and No Warranties</h2>
    <p>The Tool is provided <strong>as-is</strong>. We disclaim all warranties, including accuracy or fitness for purpose. We are not liable for errors, lost data, or damages from use.</p>

    <h2>6. Limitation of Liability</h2>
    <p>To the fullest extent allowed by law, we are not liable for any damages arising from Tool use, even if foreseeable.</p>

    <h2>7. Changes to Terms</h2>
    <p>We may update these Terms. Continued use after changes means acceptance.</p>

    <h2>8. Termination</h2>
    <p>We may stop providing the Tool at any time without notice.</p>

    <h2>9. Governing Law</h2>
    <p>These Terms are governed by the laws of [Your Jurisdiction].</p>

    <h2>10. Contact</h2>
    <p>For questions, email axelbase@example.com.</p>

    <p class="italic-note">*By using our Tool, you agree to these Terms—simple, fair, and privacy-focused.*</p>
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