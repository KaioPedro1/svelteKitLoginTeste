<script>
    import {
        Card,
        Button,
        Label,
        Input,
        Checkbox,
        Spinner,
    } from "flowbite-svelte";
    import { loginEmailSenha, passwordRecover } from "../../lib/firebaseConn";
    import BtnsLogins from "./btnsLogins.svelte";
    import { loadingLogin, isFormLogin } from "../../lib/store";
    let emailForm;
    let senhaForm;
</script>

<Card size="xl">
    <form
        class="flex flex-col space-y-6"
        action="/"
        on:submit|preventDefault={() => {
            $loadingLogin = true;
            loginEmailSenha(emailForm, senhaForm).then(() => {
                $loadingLogin = false;
            });
        }}
    >
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            Sign in to our platform
        </h3>
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
        <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <button
            on:click={()=>{
                //passwordRecover(emailForm)
            }}
                class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >Lost password?</button
            >
        </div>
        <Button type="submit" class="w-full">
            {#if $loadingLogin}
                <Spinner class="mr-3" size="4" color="white" />
                Loading ...
            {:else}
                Login
            {/if}
        </Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Não possui cadastro? <a
                on:click={()=>$isFormLogin=!$isFormLogin}
                href="/"
                class="text-blue-700 hover:underline dark:text-blue-500"
                >Crie uma conta.</a
            >
        </div>
        <BtnsLogins />
    </form>
</Card>
