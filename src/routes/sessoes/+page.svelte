<script>
	import { Button } from 'flowbite-svelte';
	import { user, userLogout } from '../../lib/firebaseConn';
	import { goto } from '$app/navigation';
	import CardRoom from '../../components/CardsRoom.svelte';
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
			<Heading>Sessões ativas</Heading>
		</div>
		<div class="p-8 " id="container-cards">
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
		<Button on:click={() => userLogout()}>Sair</Button>
	{:else}
		<h1>autenticando usuario</h1>
		<Button on:click={() => goto('/')}>Voltar para tela de login</Button>
	{/if}
</div>

<style>
	#container-cards {
	  display: flex;
	  justify-content: space-evenly;
	  flex-wrap: wrap;
	}
  </style>
