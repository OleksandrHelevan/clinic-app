import {useForm, Form, FormProvider} from "react-hook-form";
import TextInput from "../../components/TextInput/TextInput.tsx";
import type {LoginRequest} from "../../domains/users/types.ts";
import Button from "../../components/Button/Button.tsx";
import {useLogin} from "../../domains/users/useLogin/useLogin.ts";

export default function Login() {
    const methods = useForm<LoginRequest>();
    const {isPending} = useLogin();
    const onSubmit = async ({data}: { data: LoginRequest }) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <Form control={methods.control} onSubmit={onSubmit}>
                <TextInput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="doctor@avyro.com"
                    rules={{
                        required: "Email is required",
                        pattern: {value: /^\S+@\S+$/i, message: 'Wrong email'},
                    }}
                />
                <TextInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    rules={{
                        required: "Password required",
                        minLength: {value: 6, message: 'Min 6 characters'},
                    }}
                />
                <Button variant="primary" type="submit" fullWidth disabled={isPending}>
                    {isPending ? 'Loading...' : 'Log In'}
                </Button>
            </Form>
        </FormProvider>
    );
}