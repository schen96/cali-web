<script>
    import {Textarea, Label, Button, Hr, Badge} from 'flowbite-svelte';
    import controllers from "$lib/controllers/index.js";

    let k = 0;

    /**
     * @typedef {Object} OperationData
     * @property {string} operation - The operation name.
     * @property {string} data - The data associated with the operation.
     * @property {Number} key - unique key
     */


    /**
     * An array of string elements representing state of text operations
     * @type {OperationData[]}
     */
    let operations = [];
    let textAreaContent = "";

    let mode = 0;

    function cleanSpace() {
        textAreaContent = "";
        operations = [];
    }

    /**
     * Undos an operation
     *
     * @param operationId {Number}
     */
    function selectOperation(operationId) {
        operations = operations.filter(o => o.key <= operationId)
        textAreaContent = operations[operations.length - 1].data;
    }

    function cleanupDna() {

        initOperation()

        let newContent = textAreaContent.replaceAll("-", "");

        if (newContent === textAreaContent) {
            return
        }

        operations = [...operations, {operation: "Cleanup", data: newContent, key: k}]
        textAreaContent = newContent
        k++
    }

    /**
     * Adds an alert to alerts
     *
     * @param dna {String}
     */
    function reverseComplement() {

        initOperation()

        /**
         * @type {Object<string, string>}
         */
        const complement = {
            'A': 'T',
            'T': 'A',
            'C': 'G',
            'G': 'C'
        };

        // Split the DNA sequence into an array, reverse it, and map each base to its complement
        let reverse = textAreaContent.split('')
            .reverse()
            .map(base => complement[base])
            .join('');

        if (reverse === textAreaContent) {
            return
        }

        operations = [...operations, {operation: "Reverse Complement", data: reverse, key: k}]
        textAreaContent = reverse
        k++
    }

    function toClipboard() {

        if (!textAreaContent) {
            return
        }

        navigator.clipboard.writeText(textAreaContent);
        let alert = controllers.alertController.makeInfoAlert("Copied", "cmd + v to paste")
        controllers.alertController.pushAlert(alert);
    }

    function undoOperation() {
        if (operations.length <= 1) {
            return
        }
        operations = operations.slice(0, -1);
        textAreaContent = operations[operations.length - 1].data;
    }

    function initOperation() {
        if (operations.length === 0 && !!textAreaContent) {
            operations = [{operation: "Start", data: textAreaContent, key: k}]
            k++
        }
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
    <Badge class="mb-8" color={mode === 0? "primary":"dark"}>v0.0.1</Badge>

    {#if mode === 0}
        <Label for="textarea-id" class="mb-2">DNA Sequence</Label>
        <div class="wrapper" style="position: relative;">
            <Textarea bind:value="{textAreaContent}" id="textarea-id" placeholder="Your message" rows="6" name="message">


            </Textarea>
            <div class="operators px-4 py-4" style="position: absolute; bottom: 0; right: 0; z-index: 3;">
                <button class="material-symbols-outlined" style="font-size: 18px" on:click={toClipboard}>
                    content_copy
                </button>
                <button class="material-symbols-outlined mx-4" style="font-size: 18px" on:click={undoOperation}>
                    undo
                </button>
                <button class="material-symbols-outlined" style="font-size: 18px" on:click={cleanSpace}>
                    delete
                </button>
            </div>
        </div>

        <Button small color="alternative" class="mt-2" on:click={cleanupDna}>Cleanup</Button>
        <Button small color="alternative" class="mt-2" on:click={reverseComplement}>Reverse Complement</Button>

        {#if operations.length}
            <Hr/>
            <Label>Operations</Label>
            <div class="history mt-4">
                {#each operations as operation, i (operation.key)}
                    {#if i > 0}
                        <span class="material-symbols-outlined" style="font-size: 12px;">
                            keyboard_arrow_right
                        </span>
                    {/if}
                    <button on:click={() => selectOperation(operation.key)}>
                        <Badge color={i === 0? 'primary':'dark'} class="mr-2 mt-4">{operation.operation}</Badge>
                    </button>
                {/each}
            </div>
        {/if}
    {/if}
</div>
