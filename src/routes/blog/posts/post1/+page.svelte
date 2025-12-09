<script lang="ts">
  import { base } from '$app/paths';
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Understanding UUID Versions 1 through 5 | UUID Validator Blog</title>
  <meta name="description" content="Complete guide to all five official UUID versions: how they are generated, their structure, real-world use cases, and how this tool detects each one accurately." />
  <meta property="og:title" content="Understanding UUID Versions 1 through 5 | UUID Validator Blog" />
  <meta property="og:description" content="Complete guide to all five official UUID versions: how they are generated, their structure, real-world use cases, and how this tool detects each one accurately." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container post-layout" in:fade={{ duration: 600 }}>
  
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Understanding UUID Versions 1 through 5</p>
  </div>

  <article class="prose glass-card p-4 p-md-5">
    <h1>Understanding UUID Versions 1 through 5</h1>
    <p class="post-meta">Published: December 10, 2025</p>

    <p>Universally Unique Identifiers, better known as UUIDs, are 128-bit values used to uniquely identify objects across distributed systems. The RFC 4122 standard defines five official versions, each with a different generation method and intended purpose. This tool validates all of them correctly by examining specific bit patterns in the UUID string.</p>

    <h2>Version 1: Time-Based UUID</h2>
    <p>Version 1 UUIDs combine a high-precision timestamp with the node’s MAC address. They are excellent when you need natural sorting by creation time and very low collision probability without coordination. The timestamp is measured in 100-nanosecond intervals since 1582-10-15 gives them a theoretical lifespan beyond the year 3400 AD.</p>

    <h2>Version 2: DCE Security UUID</h2>
    <p>Version 2 is rarely used today. It extends version 1 by embedding POSIX user and group IDs. Because of privacy concerns and limited adoption, most modern systems avoid it entirely. This validator still recognizes it correctly but flags it as uncommon in practice.</p>

    <h2>Version 3: Name-Based (MD5)</h2>
    <p>Version 3 generates deterministic UUIDs by hashing a namespace identifier and a name using MD5. While reproducible, MD5 is now considered cryptographically broken, so version 3 is discouraged for new designs. The tool identifies these UUIDs and warns when legacy systems still rely on them.</p>

    <h2>Version 4: Random UUID</h2>
    <p>By far the most widely used today, version 4 UUIDs are generated from cryptographically strong random or pseudorandom numbers. They contain no embedded information, making them ideal for databases, distributed systems, and any scenario requiring high entropy without coordination. This validator treats version 4 as the default safe choice.</p>

    <h2>Version 5: Name-Based (SHA-1)</h2>
    <p>Version 5 is the recommended replacement for version 3. It uses SHA-1 hashing with a namespace and name, producing deterministic but collision-resistant identifiers. It is commonly used for distributed content addressing and schema migrations.</p>

    <p>Knowing which version you are dealing with helps diagnose issues in logs, migrations, and replication systems. This client-side validator instantly tells you the exact version and whether the UUID conforms to RFC 4122, all without sending data anywhere.</p>

    <p class="italic-note">Use version 4 for new projects. Use version 5 when deterministic IDs are required.</p>
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