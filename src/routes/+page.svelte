<script>
    import {Textarea, Label, Button, Hr, Badge} from 'flowbite-svelte';
    import controllers from "$lib/controllers/index.js";

    let textAreaContent = "";

    let mode = 0;

    $: trimmedValue = textAreaContent.replaceAll("-", "")

    function cleanSpace() {
        textAreaContent = "";
    }

    function toClipboard() {
        navigator.clipboard.writeText(trimmedValue);
        let alert = controllers.alertController.makeInfoAlert("Copied", "cmd + v to paste")
        controllers.alertController.pushAlert(alert);
    }

    /**
     * Adds an alert to alerts
     *
     * @param v {Number}
     */
    function setMode(v) {
        console.log("clicked")
        mode = v;
    }

</script>

<div class="c-container">
    <div class="controls mb-8">
        <button on:click={() => setMode(0)}>
            <Badge color={mode === 0? "primary":"dark"}>Dash-Remover</Badge>
        </button>
<!--        <button on:click={() => setMode(1)}>-->
<!--            <Badge color={mode === 1? "primary":"dark"}>Sequencer</Badge>-->
<!--        </button>-->
    </div>

    {#if mode === 0}
        <Label for="textarea-id" class="mb-2">DNA Sequence</Label>
        <Textarea bind:value="{textAreaContent}" id="textarea-id" placeholder="Your message" rows="4" name="message" />
        <Button color="alternative" on:click={cleanSpace}>Clear</Button>

        {#if trimmedValue}
            <Hr/>
            <Label>Output</Label>
            <p style="font-family: Comfortaa;" class="mt-2">{trimmedValue}</p>
            <Button small pill color="alternative" class="mt-12" on:click={toClipboard}>
                <span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span>
            </Button>
        {/if}
    {/if}

</div>
