<script lang="ts">
    import ky from "ky";
    import {Button} from "$lib/components/ui/button";
    let selectedFile: File | null = null;
    let fileInput: HTMLInputElement;

    const onFileSelected = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            selectedFile = target.files[0];
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        try {
            const text = await selectedFile.text();
            const name = selectedFile.name;
            alert("Uploading file:" + name);
            const response = await ky.post('/private/txt', {
                json: { file: { text }, name}}).json() as {message: string};
            alert(response.message);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }
    };
</script>

<div class="class flex flex-col items-center justify-center p-2">
    <input name="file" type="file" accept=".txt" on:change={onFileSelected} bind:this={fileInput}/>
    <Button on:click={async ()=> uploadFile()}>Upload</Button>
</div>