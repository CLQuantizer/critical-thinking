<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {supa} from "$lib/client/supa";
    import {z} from "zod";
    import {pop} from "$lib/store";
    import {onMount} from "svelte";
    import {FE_SESSION, setCookie} from "$lib/client/FeUtils";
    import {goto} from "$app/navigation";
    import {ORIGIN} from "$lib/client/common";

    let email: string;
    let otp: number;
    let isEmailSent = false;
    const REDIRECT_URL = ORIGIN+"/auth/success";
    $: otp = otp > 999999 ? parseInt(otp.toString().slice(0, 6)) : otp;

    $: isEmailValid = z.string().email().safeParse(email).success;

    const handleLogin = async () => {
        if (isEmailSent) {
            pop("Email already sent", "Error");
            return;
        }
        pop("Sending email", "Info");
        isEmailSent = true;
        const res = z.string().email().safeParse(email);
        if (!res.success) {
            pop("Invalid email", "Error");
            isEmailSent = false;
            return;
        }
        const {error} = await supa.auth.signInWithOtp({email,
            options: {
                emailRedirectTo: REDIRECT_URL,
            }});
        console.log("Redirect URL", REDIRECT_URL);
        if (error) {
            console.error("Error sending email", error);
            pop("Error sending email", "Error");
            isEmailSent = false;
            return;
        }
        pop("Email sent to: " + email);

    }

    let googleAuthInitialized = false;

    onMount(() => {
        console.log("Mounting Google script");
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log("Google script loaded");
            initializeGoogleAuth();
        };
        document.body.appendChild(script);
    });

    const handleOTPVerification = async () => {
        if (!isEmailSent) {
            pop("Please enter your email first", "Error");
            return;
        }
        pop("Verifying OTP", "Info");

        const { data, error } = await supa.auth.verifyOtp({ email, token: otp.toString(), type: 'email'})
        if (error) {
            console.error("Error verifying OTP", error);
            pop("Error verifying OTP", "Error");
            return;
        }
        setCookie(FE_SESSION, JSON.stringify(data?.session));
        pop("OTP verified");
        await goto("/private/collections");
    }

    function initializeGoogleAuth() {
        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_AUTH_ID,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
            googleAuthInitialized = true;
        } else {
            console.error('Google Identity Services not loaded');
        }
    }

    const handleCredentialResponse = async (response: any) => {
        const idToken = response.credential;
        console.log("Encoded JWT ID token: " + idToken);
        const {data, error} = await supa.auth.signInWithIdToken({
            provider: 'google',
            token: idToken
        })
        if (error) {
            console.error("Error signing in with Google", error);
            return;
        }
        setCookie(FE_SESSION, JSON.stringify(data?.session));
        await goto("/private/collections");
        // Here you would send the token to your server or use it to authenticate with your backend
    }

    function signInWithGoogle() {
        if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
            console.error('Google Identity Services not loaded yet');
            return;
        }
        if (googleAuthInitialized) {
            google.accounts.id.prompt();
        } else {
            console.error('Google Identity Services not initialized');
            initializeGoogleAuth(); // Try to initialize again
        }
    }
</script>

<div class="flex flex-col gap-3 rounded">
    <input bind:value={email} class="hidden" name="email" type="email" />
    {#if !isEmailSent}
        <div class="text-sm text-primary/80">Type in your email to sign-up or login with a one-time password (OTP)</div>
        <Input class="text-base bg-background" type="email" placeholder="email" bind:value={email} />
        <Button class={`${isEmailValid ? '' : 'text-gray-500'}`}
                on:click={async () => await handleLogin()}>Login</Button>
        <div class="text-center">or</div>
        <Button class="flex gap-4" on:click={() => signInWithGoogle()}>
            <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
            Log in with Google
        </Button>
    {:else}
        <div class="text-sm text-primary/80">Please enter the one time password sent to your email</div>
        <Input class="text-base bg-background" type="number" placeholder="Enter 6 digits OTP" bind:value={otp} />
        {#if otp}
            <div class="text-right text-xs">{otp.toString().length}/6</div>
        {/if}
        <Button on:click={async () => await handleOTPVerification()}>Verify and Login</Button>
    {/if}
</div>
