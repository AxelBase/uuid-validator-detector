<script lang="ts">
    export let files: File[] = [];

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const selectedFiles = Array.from(input.files || []);
        if (selectedFiles.length + files.length > 10) {
            alert('Maximum 10 files allowed per session.');
            input.value = '';
        } else {
            files = [...files, ...selectedFiles];
        }
    }
</script>

<div class="mb-3">
    <label for="fileUpload" class="form-label">Upload up to 10 files (.txt, .csv, .json):</label>
    <input type="file" class="form-control" id="fileUpload" multiple accept=".txt,.csv,.json" on:change={handleChange} aria-label="File upload" />
</div>