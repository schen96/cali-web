<script>
    import "../app.css";
    import {Badge} from "flowbite-svelte";
    import CAlert from "../components/CAlert.svelte";
</script>

<div>
    <CAlert></CAlert>
    <nav>
        <div class="c-container py-8">
            <h1 style="font-family: Comfortaa; font-weight: bolder; font-size: 30px;">Cali Coffee <span style="font-family: 'Noto Color Emoji';">☕🌱🪴</span></h1>
        </div>
    </nav>
</div>
<slot></slot>


