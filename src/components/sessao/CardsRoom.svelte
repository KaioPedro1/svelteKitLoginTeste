<script>
	import { Card, Avatar, Button } from 'flowbite-svelte';
	import Svelte from '../../assets/pessoaSVG.svelte';
	import ModalCardDetalhe from './modalCardDetalhe/BtnModal.svelte';
	import ModalJitsi from './modalJitsi.svelte';
	export let anime;
	export let auditorio;
	export let sessao;
	$: popupModalDetalhes = false;
	$: popupModalJitsi = false;

	const getRandInt = (max) => {
		return Math.floor(Math.random() * max);
	};
</script>

<Card padding="sm" style={'margin-left:5px; margin-top:5px'}>
	<div class="flex justify-center">
		<h2 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
			{anime.nome}
		</h2>
	</div>

	<div class="flex flex-col items-center pb-4">
		<Avatar size="xl" src={anime.cover_img_url} rounded />

		<span class="text-md text-gray-500 dark:text-gray-400">{auditorio.nome}</span><Svelte />
		<h6 class="text-md text-gray-500 dark:text-gray-400">
			{getRandInt(auditorio.capacidade - 1) + '/' + auditorio.capacidade}
		</h6>
		<h6 class="text-sm">{'Final: ' + sessao.horario.split('T')[1]}</h6>
		<div class="flex mt-4 space-x-3 lg:mt-6">
			<Button on:click={() => (popupModalJitsi = true)}>Entrar</Button>
			{#if popupModalJitsi}
				<ModalJitsi sessao_id={sessao.id} bind:popupModalJitsi />
			{/if}
			<Button color="light" class="dark:text-white" on:click={() => (popupModalDetalhes = true)}
				>Detalhes</Button
			>{#if popupModalDetalhes}
				<ModalCardDetalhe {anime} {sessao} {auditorio} bind:popupModalDetalhes />
			{/if}
		</div>
	</div>
</Card>
