<script>
    import {alerts} from "$lib/stores";
    import {AlertType} from "$lib/controllers/alertController.js";
    import controller from "$lib/controllers/index.js";
    import {Alert} from "flowbite-svelte";
    import {InfoCircleSolid} from "flowbite-svelte-icons";

</script>


<div class="c-container" style="position: relative;">
    <div style="position: absolute; top: 0; right: 0; width: min(100%, 265px)">
        {#each $alerts as alert (alert.id)}
            {#if alert.type === AlertType.ALERT_TYPE_INFO}
                <Alert color="dark"
                       class="tracking-normal" on:close={() => controller.alertController.cancelAlert(alert)}>
                    <div class="flex items-center gap-3">
                        <InfoCircleSolid class="w-4 h-4" />
                        <span class="font-medium">{alert.title}</span> {@html alert.message}
                    </div>
                </Alert>
            {:else if alert.type === AlertType.ALERT_TYPE_ERROR}
                <Alert dismissable
                       class="tracking-wider" on:close={() => controller.alertController.cancelAlert(alert)}>
                    <InfoCircleSolid slot="icon" class="w-4 h-4" />
                    {alert.title}
                    <ul class="mt-1.5 ml-4 list-disc list-inside">
                        <li>{@html alert.message}</li>
                    </ul>
                </Alert>
            {/if}

        {/each}
    </div>

</div>

