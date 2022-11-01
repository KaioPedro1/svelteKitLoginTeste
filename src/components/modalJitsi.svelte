<script>
    import { Modal } from "flowbite-svelte";
    import {db} from "../lib/firebaseConn";
    import { doc, collection, getDocs } from "firebase/firestore";
    export let popupModalJitsi;
    export let sessao_id;
    let parentNode;
    let api;

    let nomeSala;

    const abc = async () => {
        const domain = "meet.jit.si";
        let snapshot = await getDocs(
            collection(doc(collection(db, "rooms"), String(sessao_id)), "jitsi")
        );
        nomeSala = snapshot?.docs[0]?.id;
        if (nomeSala) {
            const options = {
                roomName: nomeSala,
                width: "100%",
                height: "700px",
                parentNode: parentNode,
                userInfo: {
                    displayName: "usuarioID",
                },
            };
            // @ts-ignore
            api = new JitsiMeetExternalAPI(domain, options);
        } else {
            console.log("nenhuma sala criada");
        }
    };
</script>

<svelte:head>
    <script src="https://meet.jit.si/external_api.js" on:load={abc}></script>
</svelte:head>

<Modal bind:open={popupModalJitsi} size="xl" autoclose={false}>
    <div class="meet flex p-1" bind:this={parentNode} id="meet" />
</Modal>

<style>
</style>
