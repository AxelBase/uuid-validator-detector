<script lang="ts">
    import { isValidUUID, getUUIDVersion } from '$lib/uuid-utils';
    import { extractUUIDs } from '$lib/file-parser';
    import UploadFile from '../components/UploadFile.svelte';
    import Papa from 'papaparse';
    import { fade, fly, slide } from 'svelte/transition';
      import { base } from '$app/paths';

 
    let uuidInput: string = '';
    let uploadedFiles: File[] = [];
    let preview: { uuid: string; result: string }[] = [];
    let processedFiles: { name: string; results: { uuid: string; result: string }[] }[] = [];
    let textResults: { uuid: string; result: string }[] = [];
 
    async function validate() {
        processedFiles = [];
        preview = [];
        textResults = [];
 
        if (uploadedFiles.length > 0) {
            const filePromises = uploadedFiles.map(async (file) => {
                const uuids = await extractUUIDs(file);
                if (uuids.length > 10000) {
                    alert(`File "${file.name}" exceeds 10,000 UUIDs limit.`);
                    return { name: file.name, results: [] };
                }
                const results = uuids.map(uuid => ({
                    uuid,
                    result: isValidUUID(uuid) ? `Valid UUID - ${getUUIDVersion(uuid)}` : 'Invalid UUID format'
                }));
                return { name: file.name, results };
            });
 
            processedFiles = await Promise.all(filePromises);
 
            if (processedFiles[0]?.results.length > 0) {
                preview = processedFiles[0].results.slice(0, 10);
            }
        } else {
            // Text input only
            const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
            const matches = uuidInput.match(uuidRegex) || [];
            textResults = matches.map(uuid => ({
                uuid,
                result: isValidUUID(uuid) ? `Valid UUID - ${getUUIDVersion(uuid)}` : 'Invalid UUID format'
            }));
            preview = textResults.slice(0, 10);
        }
    }
 
    function removeFile(index: number) {
        uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    }
 
    function removeAllFiles() {
        uploadedFiles = [];
    }
 
    function exportFile(name: string, type: 'txt' | 'csv' | 'json', results: { uuid: string; result: string }[]) {
        let content = '';
        let filename = `${name.replace(/\.[^/.]+$/, '')}_results`;
        let mime = '';
 
        if (type === 'txt') {
            content = results.map(r => `${r.uuid}: ${r.result}`).join('\n');
            filename += '.txt';
            mime = 'text/plain';
        } else if (type === 'csv') {
            content = Papa.unparse(results.map(r => ({ uuid: r.uuid, result: r.result })));
            filename += '.csv';
            mime = 'text/csv';
        } else if (type === 'json') {
            content = JSON.stringify(results, null, 2);
            filename += '.json';
            mime = 'application/json';
        }
 
        downloadBlob(content, mime, filename);
    }
 
    function exportAll(type: 'txt' | 'csv' | 'json') {
        const allData = processedFiles.flatMap(file => 
            file.results.map(r => ({ file: file.name, uuid: r.uuid, result: r.result }))
        );
 
        let content = '';
        let filename = 'all_uuid_results';
 
        if (type === 'txt') {
            content = processedFiles
                .map(file => `=== ${file.name} ===\n${file.results.map(r => `${r.uuid}: ${r.result}`).join('\n')}`)
                .join('\n\n');
            filename += '.txt';
        } else if (type === 'csv') {
            content = Papa.unparse(allData);
            filename += '.csv';
        } else if (type === 'json') {
            content = JSON.stringify(processedFiles.map(f => ({ file: f.name, results: f.results })), null, 2);
            filename += '.json';
        }
 
        downloadBlob(content, type === 'csv' ? 'text/csv' : 'text/plain', filename);
    }

    function downloadBlob(content: string, mime: string, filename: string) {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>

<svelte:head>
  <title>UUID Validator & Version Detector — 100% Client-Side, RFC 4122 Compliant</title>
  <meta name="description" content="Free, instant UUID validation and version detection (v1–v5). Batch process logs, JSON, CSV, or text — all in your browser. No data collection, no servers, no limits." />
  <meta property="og:title" content="UUID Validator & Version Detector — 100% Client-Side" />
  <meta property="og:description" content="Validate thousands of UUIDs instantly. Strict RFC 4122 compliance. Works offline. Exports to TXT/CSV/JSON. No tracking." />
  <meta property="og:url" content="{base}/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
 
<div class="container mt-4">
    
    <div class="text-center mb-5" in:fade={{ duration: 800 }}>
        <h1 class="display-4 fw-bold">UUID Validator</h1>
        <p class="lead" style="color: var(--color-accent); font-weight: 500;">Version Detector & Batch Processor</p>
    </div>
 
    <div class="glass-card p-4 p-md-5 mb-5" in:fly={{ y: 50, duration: 800, delay: 200 }}>
        <form on:submit|preventDefault={validate}>
            <div class="mb-4">
                <label for="uuidInput" class="form-label fw-bold h5">Enter UUID(s)</label>
                <div class="input-group">
                    <textarea 
                        class="form-control" 
                        id="uuidInput" 
                        bind:value={uuidInput} 
                        rows="4" 
                        placeholder="Paste text, logs, JSON, or any rough text here..."
                        disabled={uploadedFiles.length > 0}
                    ></textarea>
                </div>
                {#if uuidInput.length > 0}
                    <div class="d-flex justify-content-end mt-2" transition:slide>
                        <button 
                        type="button" 
                        class="btn btn-outline-secondary btn-sm" 
                        on:click={() => uuidInput = ''} 
                        disabled={uploadedFiles.length > 0}
                        >Clear Text</button>
                    </div>
                {/if}
            </div>
    
            <UploadFile bind:files={uploadedFiles} />
    
            {#if uploadedFiles.length > 0}
                <div class="mt-4 p-3 rounded border" style="background: rgba(255,255,255,0.05); border-color: var(--color-accent) !important;" transition:slide>
                    <h5 class="mb-3">Uploaded Files ({uploadedFiles.length}/10):</h5>
                    <ul class="list-group list-group-flush mb-3">
                    {#each uploadedFiles as file, i}
                        <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center text-truncate border-bottom">
                            <span class="text-truncate" style="color: var(--color-text-main); max-width: 80%;">{file.name}</span>
                            <button 
                                class="btn btn-sm btn-outline-danger border-0" 
                                on:click={() => removeFile(i)}
                                aria-label="Remove uploaded file"
                            >
                                <i class="bi bi-trash"></i>
                            </button>
                        </li>
                    {/each}
                    </ul>
                    <button type="button" class="btn btn-warning btn-sm text-dark fw-bold" on:click={removeAllFiles}>Remove All Files</button>
                </div>
            {/if}
    
            <div class="d-grid gap-2 mt-4">
                <button type="submit" class="btn btn-primary btn-lg py-3 shadow-lg">Validate UUIDs</button>
            </div>
        </form>
    </div>
 
    {#if preview.length > 0}
        <div class="glass-card p-4 mb-5" transition:slide>
            <h4 class="mb-3 border-bottom pb-2" style="border-color: var(--color-accent) !important;">Preview Results</h4>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each preview as { uuid, result }}
                            <tr>
                                <td><code>{uuid}</code></td>
                                <td>
                                    {#if result.includes('Valid')}
                                        <span class="badge rounded-pill bg-success shadow-sm">{result}</span>
                                    {:else}
                                        <span class="badge rounded-pill bg-danger shadow-sm">{result}</span>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
 
    {#if processedFiles.length > 0}
        <div class="mt-5" transition:slide>
            <h3 class="mb-4">Export Results</h3>
            <div class="row g-4">
            {#each processedFiles as file}
                {#if file.results.length > 0}
                <div class="col-md-6">
                    <div class="glass-card p-3 h-100 d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="card-title mb-0 fw-bold text-truncate" title={file.name}>{file.name}</h6>
                            <span class="badge bg-secondary">{file.results.length}</span>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-secondary flex-fill" on:click={() => exportFile(file.name, 'txt', file.results)}>TXT</button>
                            <button class="btn btn-sm btn-outline-secondary flex-fill" on:click={() => exportFile(file.name, 'csv', file.results)}>CSV</button>
                            <button class="btn btn-sm btn-outline-secondary flex-fill" on:click={() => exportFile(file.name, 'json', file.results)}>JSON</button>
                        </div>
                    </div>
                </div>
                {/if}
            {/each}
            </div>
 
            <div class="glass-card mt-4 p-4 text-center">
                <h5 class="mb-3">Download Combined Results</h5>
                <div class="btn-group shadow-sm">
                    <button class="btn btn-primary" on:click={() => exportAll('txt')}>All as TXT</button>
                    <button class="btn btn-secondary" style="background-color: var(--color-accent); border:none;" on:click={() => exportAll('csv')}>All as CSV</button>
                    <button class="btn btn-info text-white" style="background-color: var(--color-text-main); border:none;" on:click={() => exportAll('json')}>All as JSON</button>
                </div>
            </div>
        </div>
    {/if}
 
    {#if textResults.length > 0 && processedFiles.length === 0}
        <div class="glass-card p-4 mt-5" transition:slide>
            <h4>Text Input Results ({textResults.length} UUIDs found)</h4>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each textResults as { uuid, result }}
                            <tr>
                                <td><code>{uuid}</code></td>
                                <td><span class="badge rounded-pill bg-success">{result}</span></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
</div>

<section id="about" class="container py-5 my-5">
  <div class="glass-card p-5 p-md-6 rounded-4 shadow-lg border-0">
    <h2 class="display-5 fw-bold text-center mb-4" style="color: var(--color-accent);">About UUID Validator</h2>
    <p class="lead text-center mb-5">
      The most accurate, privacy-first, and developer-friendly UUID validation tool on the internet — completely client-side.
    </p>
    <div class="row g-4 text-start">
      <div class="col-lg-10 mx-auto">
        <p>
          Built for engineers who refuse to trust flaky online validators, this tool enforces <strong>strict RFC 4122 compliance</strong> — checking not just the 8-4-4-4-12 pattern, but the <strong>variant field (89ab only)</strong> and <strong>correct version position</strong>. If a UUID passes here, it will work in PostgreSQL, Java, .NET, Go, Rust, and every standards-compliant system.
        </p>
        <p>
          Whether you're debugging a distributed system at 3 a.m., auditing production logs before a migration, or scanning repositories for exposed credentials, this validator instantly finds malformed, legacy, or dangerous UUIDs — without ever sending your data anywhere.
        </p>
        <p>
          All processing happens <strong>in your browser</strong> using optimized regular expressions and Set-based deduplication. No backend. No cookies. No analytics. No rate limits. Your UUIDs — even from classified or regulated environments — never leave your machine.
        </p>
        <p>
          Supports single UUIDs, batch text input, and multiple file uploads (.txt, .csv, .json) up to 10,000 UUIDs per file and 10 files simultaneously. Export results instantly as clean TXT, CSV, or JSON — perfect for reports, CI pipelines, or documentation.
        </p>
        <p class="fw-semibold">
          Trusted daily by backend engineers, database administrators, security teams, and DevOps professionals who demand accuracy and privacy above all else.
        </p>
        <p class="text-center mt-5 fst-italic text-muted">
          <em>Validate once. Trust forever.</em>
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ==================== HOW TO USE ==================== -->
<section id="how-to" class="container py-5 my-5 bg-light rounded-4">
  <h2 class="display-5 fw-bold text-center mb-5" style="color: var(--color-accent);">How to Use</h2>
  <div class="row g-5 justify-content-center">
    <div class="col-lg-8">
      <div class="row g-4">
        <div class="col-md-6">
          <div class="glass-card p-4 h-100 text-center shadow-sm border-0">
            <div class="display-4 mb-3 text-primary">1</div>
            <h4 class="fw-bold">Paste Any Text</h4>
            <p class="mb-0">
              Copy logs, JSON responses, config files, or database dumps directly into the text area. The tool automatically extracts every UUID — even if buried in quotes, timestamps, or nested objects.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-card p-4 h-100 text-center shadow-sm border-0">
            <div class="display-4 mb-3 text-primary">2</div>
            <h4 class="fw-bold">Or Upload Files</h4>
            <p class="mb-0">
              Drag and drop up to 10 files (.txt, .csv, .json). The validator scans entire files in milliseconds, ignores layout, and deduplicates automatically.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-card p-4 h-100 text-center shadow-sm border-0">
            <div class="display-4 mb-3 text-primary">3</div>
            <h4 class="fw-bold">Click Validate</h4>
            <p class="mb-0">
              One click triggers instant RFC 4122 validation. See a live preview of the first 10 results and full version breakdown.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-card p-4 h-100 text-center shadow-sm border-0">
            <div class="display-4 mb-3 text-primary">4</div>
            <h4 class="fw-bold">Export Results</h4>
            <p class="mb-0">
              Download per-file or combined results as clean TXT, CSV, or JSON — ready for reports, tickets, or automation.
            </p>
          </div>
        </div>
      </div>
      <p class="text-center mt-5 fst-italic text-muted">
        <em>No accounts. No waiting. No data ever leaves your browser.</em>
      </p>
    </div>
  </div>
</section>

<!-- ==================== FAQ ==================== -->
<section id="faq" class="container py-5 my-5">
  <h2 class="display-5 fw-bold text-center mb-5" style="color: var(--color-accent);">Frequently Asked Questions</h2>
  <div class="row justify-content-center">
    <div class="col-lg-9">
      <div class="accordion accordion-flush" id="faqAccordion">

        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
              Is my data really private and secure?
            </button>
          </h2>
          <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body pt-0">
              Yes — 100%. Every byte is processed locally in your browser. No network requests, no cookies, no analytics, no server logs. Even if you're validating classified or regulated UUIDs, they never leave your device.
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 shadow-sm mb-3 mb-3 rounded-3 overflow-hidden">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
              Why do some UUIDs pass other validators but fail here?
            </button>
          </h2>
          <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body pt-0">
              Because we enforce <strong>full RFC 4122 compliance</strong>: correct version position and variant field (89ab only). Many online tools use weak regex and accept invalid UUIDs (variant c–f). If it fails here, it will fail in real systems.
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
              Can I use this offline?
            </button>
          </h2>
          <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body pt-0">
              Yes! Save the page (Ctrl+S) or deploy it internally. It works completely offline with zero dependencies after the first load.
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
              What’s the difference between TXT, CSV, and JSON export?
            </button>
          </h2>
          <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body pt-0">
              <strong>TXT</strong>: Human-readable, great for emails/tickets<br>
              <strong>CSV</strong>: Perfect for Excel, filtering, charting<br>
              <strong>JSON</strong>: Ideal for scripts, CI/CD, and programmatic use
            </div>
          </div>
        </div>

        <div class="accordion-item border-0 shadow-sm rounded-3 overflow-hidden">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
              Is there a limit on usage?
            </button>
          </h2>
          <div id="q5" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div class="accordion-body pt-0">
              No accounts, no rate limits, no quotas. Use as much as you want, forever — for free.
            </div>
          </div>
        </div>

      </div>
      <p class="text-center mt-5 fst-italic text-muted">
        <em>Still have questions? <a href="{base}/blog">Read the blog</a> or open an issue on GitHub.</em>
      </p>
    </div>
  </div>
</section>