<script>
	import { Button } from 'flowbite-svelte';
	import { user, userLogout } from '../../lib/firebaseConn';
	import { goto } from '$app/navigation';

</script>

<div>
	{#if $user}
		{JSON.stringify($user)}
		<Button on:click={() => userLogout()}>Sair</Button>
	{:else}
		<h1>ACESSO NEGADO</h1>
        <Button on:click={() => goto('/')}>Voltar para tela de login</Button>
	{/if}
</div>

<style>
</style>
