<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Exporting Validation Results: TXT vs CSV vs JSON | UUID Validator Blog</title>
  <meta name="description" content="Learn when to use TXT, CSV, or JSON exports, how each format preserves data, and best practices for audit trails and reporting." />
  <meta property="og:title" content="Exporting Validation Results: TXT vs CSV vs JSON | UUID Validator Blog" />
  <meta property="og:description" content="Learn when to use TXT, CSV, or JSON exports, how each format preserves data, and best practices for audit trails and reporting." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Exporting Validation Results</p>
  </div>

  <article class="prose">
    <h1>Exporting Validation Results: TXT vs CSV vs JSON</h1>
    <p class="post-meta">Published: December 14, 2025</p>

    <p>After validating thousands of UUIDs, you often need to share, archive, or analyze the results. This tool gives you three export formats—each with different strengths depending on your workflow.</p>

    <h2>When to Use TXT</h2>
    <p>Plain text is perfect for quick human review, pasting into tickets, emails, or chat. Each line shows the UUID followed by its full result, making it instantly readable without opening a spreadsheet.</p>

    <h2>When to Use CSV</h2>
    <p>CSV shines when you need to sort, filter, or chart results. Open the file in Excel, Google Sheets, or any data tool and immediately see counts of valid vs invalid, group by version, or spot patterns across files.</p>

    <h2>When to Use JSON</h2>
    <p>JSON is the best choice for developers. It preserves full structure, supports programmatic parsing, and integrates seamlessly with scripts, CI/CD pipelines, or internal dashboards.</p>

    <h2>Preservation Guarantees</h2>
    <p>All formats maintain exact parse order, include original file names when applicable, and never truncate or reorder data. Duplicate UUIDs are removed during processing but appear only once in the order they were first encountered.</p>

    <h2>Real-World Examples</h2>
    <p>Security teams export to CSV to count leaked UUIDs per repository. Compliance officers use TXT for audit appendices. Backend teams pipe JSON output into monitoring systems to track malformed IDs over time.</p>

    <p>No matter which format you choose, the download starts instantly with a clean, predictable filename.</p>

    <p class="italic-note">Choose the format that matches your audience: TXT for humans, CSV for analysts, JSON for machines.</p>
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