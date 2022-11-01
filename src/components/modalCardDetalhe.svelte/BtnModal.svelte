<script>
    import { Modal, Tabs, TabItem,Card} from "flowbite-svelte";
    import ListaUsuarios from "./listaUsuarios.svelte";
    import AnimeModalSvg from "../../assets/animeModalSVG.svelte";
    import AuditorioModalSvg from "../../assets/auditorioModalSVG.svelte";
    import SessaoModalSvg from "../../assets/sessaoModalSVG.svelte";
    export let anime;
    export let sessao;
    export let auditorio;
    export let popupModalDetalhes;
    console.log('rendere detlahes')
</script>

<Modal bind:open={popupModalDetalhes} size="md" autoclose={false}>
    <Tabs >
        <TabItem open>
            <div slot="title" class="flex items-center gap-2">
                <AnimeModalSvg/>
                Anime
            </div>
            <Card img="{anime.cover_img_url}"  horizontal>
                <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{anime.nome}</h5>
                <hr class="mb-2">
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                 {@html anime.descricao_en}
                </p>
              </Card>
        </TabItem>
        <TabItem>
            <div slot="title" class="flex items-center gap-2">
                <AuditorioModalSvg/>
                Auditório
            </div>
            <p class="text-gray-500 dark:text-gray-400">
                <Card style={"max-width: none"}>
                    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{auditorio.nome}</h5>
                    <hr class="mb-2">
                    <p class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left">
                        <b>Capacidade do auditório: </b>{auditorio.capacidade}
                    </p>
                    <hr class="mb-2">
                    <p class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left">
                        <b>Auditório id: </b>{auditorio.id}
                    </p>
                    <hr class="mb-2">
                  </Card>
            </p>
        </TabItem>
        <TabItem>
            <div slot="title" class="flex items-center gap-2">
                <SessaoModalSvg/>
                Sessão
            </div>
            <Card style={"max-width: none"}>
                <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{"Sessão: " + sessao.id}</h5>
                <hr class="mb-2">
                <p class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left">
                    <b>Horário de inicio: </b>{sessao.horario.split('T')[1]}
                </p>
                <hr class="mb-2">
                <p class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left">
                    <b>Horário final: </b>{sessao.horario.split('T')[1]}
                </p>
                <hr class="mb-2">

                <hr class="mb-2">
                <p class=" mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-left">
                    <ListaUsuarios sessao_id={sessao.id}/>
                </p>
                
              </Card>
        </TabItem>
    </Tabs>
</Modal>
