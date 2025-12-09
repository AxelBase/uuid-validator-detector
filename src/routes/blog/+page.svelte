<script lang="ts">
  import { base } from '$app/paths';
  import { fade, fly } from 'svelte/transition';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Understanding UUID Versions 1 through 5',
      description: 'Deep dive into the five official UUID versions, their structure, use cases, and how this tool accurately detects each one.'
    },
    {
      href: '/blog/posts/post2',
      title: 'How UUID Variant Detection Works (RFC 4122)',
      description: 'Technical breakdown of the UUID variant field and why only 89ab are valid — and how the validator enforces this correctly.'
    },
    {
      href: '/blog/posts/post3',
      title: 'Batch Validation: Extracting UUIDs from Logs & Files',
      description: 'Learn how the tool scans any text — logs, JSON, CSV, config files — and reliably extracts only valid UUIDs, ignoring layout.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Why Most Online UUID Validators Fail (And This One Doesn’t)',
      description: 'Common pitfalls in regex-based UUID validation and how this utility uses strict RFC 4122 compliance for zero false positives.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Exporting Validation Results: TXT vs CSV vs JSON',
      description: 'Best practices for exporting batch results — when to use each format and how the tool preserves order and metadata.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Handling 10,000+ UUIDs in the Browser (Performance Tips)',
      description: 'How client-side regex scanning and deduplication work efficiently even with massive inputs — all without a backend.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Real-World Use Cases: Debugging, Auditing & Migration',
      description: 'How developers use this tool daily to audit databases, debug distributed systems, and validate data migrations.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | UUID Validator Insights</title>
  <meta name="description" content="Technical articles, deep dives, and best practices for using the client-side UUID Validator and Version Detector." />
</svelte:head>

<div class="container blog-index py-5" in:fade={{ duration: 600 }}>
  <header class="blog-header text-center mb-5">
    <h1>UUID Validator Blog</h1>
    <p class="subtitle lead col-lg-8 mx-auto">
      In-depth articles on UUID standards, validation techniques, performance, and real-world applications of this fully client-side tool.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post, i}
      <a 
        href="{base}{post.href}" 
        class="card post-card h-100 text-decoration-none glass-card"
        in:fly={{ y: 20, duration: 600, delay: i * 100 }}
      >
        <div class="card-body d-flex flex-column p-4">
          <h2 class="post-title h5 fw-bold mb-3">{post.title}</h2>
          <p class="post-description flex-grow-1 small">{post.description}</p>
          <span class="read-more fw-bold mt-3">Read Article →</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    min-height: 80vh;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: var(--color-text-main);
  }

  .subtitle {
    font-size: 1.15rem;
    color: var(--color-text-muted);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  /* Glass Card override handled in global CSS, but specific hover effects here */
  .post-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
    overflow: hidden;
    background: var(--glass-bg); /* Ensures dark mode compatibility */
    border: 1px solid var(--glass-border);
  }

  .post-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    border-color: var(--color-accent);
  }

  .post-title {
    color: var(--color-text-main);
    transition: color 0.3s;
  }
  
  .post-card:hover .post-title {
    color: var(--color-accent);
  }

  .post-description {
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  .read-more {
    color: var(--color-accent);
    transition: transform 0.2s ease, color 0.2s;
    display: inline-block;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
    color: var(--color-text-main);
  }
</style>