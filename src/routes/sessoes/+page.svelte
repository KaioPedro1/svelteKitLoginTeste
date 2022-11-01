<script>
	import { Button } from 'flowbite-svelte';
	import { user, userLogout} from '../../lib/firebaseConn';
	import { goto } from '$app/navigation';
	import CardRoom from '../../components/sessao/CardsRoom.svelte';
	import { Spinner, Heading } from 'flowbite-svelte';
	const SESSOESURL = 'https://anime-nema-v1.herokuapp.com/sessoes';
	const getSessoes = async () => {
		const response = await fetch(SESSOESURL);
		const obj = await response.json();
		return obj;
	};
</script>

<div>
	{#if $user}
		<div class="titulo_sessoes text-center">
			<Heading>Sessões ativas</Heading><Button on:click={() => userLogout()}>Logout</Button>
			{"Bem vindo  " + JSON.stringify($user.displayName)}
		</div>
		<div class="p-8 grid grid-cols-5 gap-3" id="container-cards">
			{#await getSessoes()}
				<Spinner />
			{:then obj}
				{#each obj as sessao (sessao.id)}
					<CardRoom anime={sessao.anime} auditorio={sessao.auditorio} {sessao} />
				{:else}
					<h1>Nenhuma sessão disponivel.</h1>
				{/each}
			{:catch error}
				<h1>Algo deu errado...</h1>
			{/await}
		</div>
	{:else}
		<h1>acesso negado</h1>
		<Button on:click={() => goto('/')}>Voltar para tela de login</Button>
	{/if}
</div>

<style>
</style>
