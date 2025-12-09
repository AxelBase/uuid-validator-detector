<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 — Page Not Found | UUID Validator</title>
  <meta name="description" content="The page you're looking for doesn't exist. Return to the UUID Validator and keep validating with confidence." />
  <meta property="og:title" content="404 — Page Not Found | UUID Validator" />
  <meta property="og:description" content="The page you're looking for doesn't exist. Return to the UUID Validator and keep validating with confidence." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="container fade-in text-center py-5" style="min-height:70vh; display:flex; flex-direction:column; justify-content:center;">
  <div class="max-w-2xl mx-auto">
    <h1 class="display-1 fw-bold text-primary mb-4">404</h1>
    <h2 class="h2 mb-4">Oops! This UUID doesn't exist.</h2>
    <p class="lead text-muted mb-5">
      The page you're looking for has been moved, deleted, or never existed — kind of like a malformed UUID with variant <code>c</code>.
    </p>

    <div class="d-grid gap-3 max-w-md mx-auto mb-5">
      <a href="{base}/" class="btn btn-primary btn-lg">
        Back to UUID Validator
      </a>
      <a href="{base}/blog" class="btn btn-outline-primary">
        Read the Blog
      </a>
    </div>

    <div class="helpful-links mt-5">
      <h5 class="text-muted mb-3">Quick Links</h5>
      <div class="d-flex flex-wrap justify-content-center gap-4 text-muted">
        <a href="{base}/">Home</a>
        <a href="{base}/blog">Blog</a>
        <a href="{base}/privacy">Privacy Policy</a>
        <a href="{base}/terms">Terms</a>
      </div>
    </div>

    <p class="italic-note mt-5 text-muted">
      <em>No data was collected while you got lost — just like always.</em>
    </p>
  </div>
</div>

<style>
  .display-1 {
    font-size: 8rem;
    font-weight: 800;
    letter-spacing: -0.05em;
    color: #0d6efd;
  }
  @media (max-width: 576px) {
    .display-1 { font-size: 5.5rem; }
  }
  .btn-lg {
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
  }
  .helpful-links a {
    color: #6c757d;
    text-decoration: none;
    font-weight: 500;
  }
  .helpful-links a:hover {
    color: #0d6efd;
    text-decoration: underline;
  }
  .italic-note {
    font-size: 1.1rem;
  }
</style>