import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import type {LoginRequest} from "../../domains/users/types.ts";
import {useLogin} from "../../domains/users/useLogin/useLogin.ts";
import './LoginPage.css'
import TextInput from "../../components/TextInput/TextInput.tsx";
import {Link} from "react-router-dom";
import {Logo} from "../../assets/Logo.tsx";
import {SIGNUP_PATH} from "../../constants/paths.ts";

export default function LoginPage() {
    const {mutate, isPending} = useLogin();

    const onSubmit = (data: LoginRequest) => {
        mutate(data);
    };

    return (
        <div className="wrapper">
            <Form<LoginRequest>
                onSubmit={onSubmit}
                title="Login to Avyro"
                subtitle="Authorize to Avyro"
                logo={<Logo/>}
            >
                {() => (
                    <>
                        <TextInput
                            name="email"
                            label="Електронна пошта"
                            type="email"
                            placeholder="doctor@avyro.com"
                            rules={{
                                required: "Enteer email",
                                pattern: {value: /^\S+@\S+$/i, message: "Wrong email"}
                            }}
                        />

                        <TextInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            rules={{required: "Enter password", minLength: {value: 6, message: "Min. 6 characters"}}}
                        />
                        <div className="form-footer">
                            <Button variant="primary" type="submit" className="w-full" disabled={isPending}>
                                Login
                            </Button>
                            <div className={"sign-up-flow"}>
                                <p>Don't have account?</p>
                                <Link to={SIGNUP_PATH}>Sign Up</Link>
                            </div>
                        </div>

                    </>
                )}
            </Form>
        </div>
    );
}