<script>
    import {
        Card,
        Button,
        Label,
        Input,
        Spinner,
    } from "flowbite-svelte";
    import { createUserEmailSenha } from "../../lib/firebaseConn";
    import BtnsLogins from "./btnsLogins.svelte";
    import { loadingLogin, isFormLogin } from "../../lib/store";
    let emailForm;
    let usernameForm;
    let senhaForm;
</script>

<Card size="xl">
    <form
        class="flex flex-col space-y-6"
        action="/"
        on:submit|preventDefault={() => {
           createUserEmailSenha(emailForm,senhaForm, usernameForm).then((res)=>console.log(res));
        }}
    >
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            Cadastre-se na nossa plataforma
        </h3>
        <Label class="space-y-2">
            <span>Nome do usuário</span>
            <Input
                type="text"
                name="username"
                placeholder="clebinhoBaladeiro"
                required
                bind:value={usernameForm}
            />
        </Label>
        <Label class="space-y-2">
            <span>Email</span>
            <Input
                type="email"
                name="email"
                placeholder="name@company.com"
                required
                bind:value={emailForm}
            />
        </Label>
        <Label class="space-y-2">
            <span>Your password</span>
            <Input
                type="password"
                name="password"
                placeholder="•••••"
                required
                bind:value={senhaForm}
            />
        </Label>

        <Button type="submit" class="w-full">
            {#if $loadingLogin}
                <Spinner class="mr-3" size="4" color="white" />
                Loading ...
            {:else}
                Registre-se
            {/if}
        </Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
           <a
                on:click={()=>$isFormLogin=!$isFormLogin}
                href="/"
                class="text-blue-700 hover:underline dark:text-blue-500"
                >Voltar</a
            >
        </div>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 text-center">
            OU
        </h3>
        <BtnsLogins />
    </form>
</Card>
