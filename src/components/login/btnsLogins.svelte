<script>
    import { Button } from "flowbite-svelte";
    import GoogleLogo from "../../assets/googleLogo.svelte";
    import GithubLogo from "../../assets/githubLogo.svelte";
    import FacebookLogo from "../../assets/facebookLogo.svelte";
    import TwitterLogo from "../../assets/twitterLogo.svelte";
    import {loginGoogle} from "../../lib/firebaseConn"

</script>

<div class="button-container">
    <Button class="!p-2" pill={true} color="alternative" on:click={()=>loginGoogle()}><GoogleLogo /></Button>
    <Button class="!p-2" pill={true} color="alternative"><GithubLogo /></Button>
    <Button class="!p-2" pill={true} color="alternative"
        ><FacebookLogo /></Button
    >
    <Button class="!p-2" pill={true} color="alternative"><TwitterLogo /></Button
    >
</div>

<style>
    .button-container{
        display: flex;
        justify-content: center;
    }
</style>