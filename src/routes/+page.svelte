<script>
	import FormLogin from '../components/login/formLogin.svelte';
	import FormCadastro from '../components/login/formCadastro.svelte';
	import AnimeBg from '../assets/animeBg.svelte';
	import { fly } from 'svelte/transition';
	import {isFormLogin } from '../lib/store';
</script>

<div class="container-app grid grid-cols-10">
	<div class="col-span-6">
		<AnimeBg />
	</div>
	{#if $isFormLogin}
		<div
			class="col-span-4"
			out:fly={{ x: 200, duration: 100 }}
			in:fly={{ y: 200, duration: 1000 }}
			on:outroend={() => {
				console.log('saiu div 1');
			}}
		>
			<FormLogin />
		</div>
	{:else}
		<div
			class="col-span-4"
			in:fly={{ y: 200, duration: 1000 }}
			out:fly={{ x: 200, duration: 100 }}
			on:outroend={() => {
				console.log('saiu div 2');
			}}
		>
		<FormCadastro/>
		</div>
	{/if}
</div>

<style>
</style>
