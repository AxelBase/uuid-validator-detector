<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How UUID Variant Detection Works (RFC 4122) | UUID Validator Blog</title>
  <meta name="description" content="Explanation of the UUID variant field, why only 8, 9, a, b are valid, and how this tool enforces strict RFC 4122 compliance." />
  <meta property="og:title" content="How UUID Variant Detection Works (RFC 4122) | UUID Validator Blog" />
  <meta property="og:description" content="Explanation of the UUID variant field, why only 8, 9, a, b are valid, and how this tool enforces strict RFC 4122 compliance." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How UUID Variant Detection Works</p>
  </div>

  <article class="prose">
    <h1>How UUID Variant Detection Works (RFC 4122)</h1>
    <p class="post-meta">Published: December 11, 2025</p>

    <p>Every valid UUID contains a variant field that determines the layout of the remaining bits. This field is stored in the most significant bits of the third group and must follow strict rules defined in RFC 4122. Most online validators ignore this crucial detail, leading to false positives.</p>

    <h2>The Four Defined Variants</h2>
    <p>There are four possible UUID variants, but only one is considered standard today:</p>
    <ul>
      <li>Variant 0 (0xxx) – NCS backward compatibility (obsolete)</li>
      <li>Variant 1 (10xx) – RFC 4122 standard (the one we use)</li>
      <li>Variant 2 (110x) – Microsoft GUID format</li>
      <li>Variant 3 (111x) – Reserved for future definition</li>
    </ul>

    <p>Only variant 1 is RFC-compliant for new implementations. In hexadecimal, this means the third group must start with 8, 9, a, or b. Anything else is invalid.</p>

    <h2>Why It Matters</h2>
    <p>Many UUID generators, especially older ones or non-compliant libraries, produce UUIDs with incorrect variants (often starting with c, d, e, f). These appear to work locally but cause issues in strict systems like PostgreSQL, Java UUID class, or distributed databases.</p>

    <h2>How This Tool Checks It</h2>
    <p>The validator uses a precise bit masking on the variant field. As soon as a UUID fails the 89ab rule, it is immediately marked invalid, even if the rest of the format looks correct. This eliminates false positives that plague simpler regex-only checkers.</p>

    <p>This strict approach guarantees that any UUID marked Valid by this tool will work correctly in every RFC-compliant system worldwide.</p>

    <p class="italic-note">Never trust a validator that accepts UUIDs starting with c, d, e, or f in the third group.</p>
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