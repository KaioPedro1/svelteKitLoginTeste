<script>
    // @ts-nocheck
    import {db} from "../../../lib/firebaseConn";
    import { onSnapshot, doc, collection } from "firebase/firestore";
    import UsuarioSvg from "../../../assets/usuarioSVG.svelte";
    import HostSvg from "../../../assets/hostSVG.svelte";
    import {
        Button,
        Badge,
        Spinner,
        AccordionItem,
        Accordion,
    } from "flowbite-svelte";
    export let sessao_id;
    $: roomsUsers = null;
    $: roomHost = null;
    onSnapshot(
        collection(doc(collection(db, "rooms"), String(sessao_id)), "users"),
        (snapshot) => {
            roomsUsers = snapshot;
        }
    );
    onSnapshot(
        collection(doc(collection(db, "rooms"), String(sessao_id)), "host"),
        (snapshot) => {
            roomHost = snapshot;
        }
    );
</script>

<Accordion>
    <AccordionItem>
        <span slot="header"><b>Lista de usuarios cadastrados</b></span>
        <p
            class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left"
        >
            {#if roomHost}
                {#each roomHost?.docs as host}
                    <Button
                        outline
                        gradient
                        color="greenToBlue"
                        pill={true}
                        class="relative m-1"
                    >
                        <HostSvg />
                        {#if host.data().online}
                            <Badge rounded index color="!green" />
                        {:else}
                            <Badge rounded index color="!red" />
                        {/if}
                        {host.data().nome}
                    </Button>
                {:else}
                    <h1>Nenhum host cadastrado</h1>
                {/each}
            {/if}
            {#if roomsUsers}
                {#each roomsUsers?.docs as usuarios}
                    <Button
                        color="alternative"
                        pill={true}
                        class="relative m-1"
                    >
                        {#if usuarios.data().online}
                            <UsuarioSvg />
                            <Badge rounded index color="!green" />
                        {:else}
                            <UsuarioSvg />
                            <Badge rounded index color="!red" />
                        {/if}
                        {usuarios.id}</Button
                    >
                {:else}
                    <h1>Nenhum usuario cadastrado</h1>
                {/each}
            {:else}
                <Spinner />
            {/if}
        </p>
    </AccordionItem>
</Accordion>

<style>
</style>
