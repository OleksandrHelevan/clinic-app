import {Link} from "react-router-dom";
import type {SignUpRequest} from "../../domains/users/types.ts";
import Form from "../../components/Form/Form.tsx";
import Input from "../../components/TextInput/TextInput.tsx";
import Button from "../../components/Button/Button.tsx";
import './SignUpPage.css';

export default function SignUpPage() {

    const onSubmit = (data: SignUpRequest) => {
        console.log("Registration data:", data);
    };
    return (
        <div className="wrapper">
            <Form<SignUpRequest>
                onSubmit={onSubmit}
                title="Створити аккаунт"
                subtitle="Приєднуйтесь до медичної платформи Avyro"
            >
                {({register, formState: {errors}}) => (
                    <>
                        <Input
                            name="email"
                            label="Електронна пошта"
                            type="email"
                            placeholder="doctor@avyro.com"
                            rules={{
                                required: "Введіть email",
                                pattern: {value: /^\S+@\S+$/i, message: "Некоректний формат"}
                            }}
                        />

                        <Input
                            name="password"
                            label="Пароль"
                            type="password"
                            placeholder="••••••••"
                            rules={{
                                required: "Вигадайте пароль",
                                minLength: {value: 6, message: "Мінімум 6 символів"}
                            }}
                        />
                        <div className="form-field">
                            <label className="form-label">Ви реєструєтесь як:</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        value="PATIENT"
                                        {...register("role", {required: "Оберіть роль"})}
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Пацієнт</span>
                                </label>

                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        value="DOCTOR"
                                        {...register("role", {required: "Оберіть роль"})}
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Лікар</span>
                                </label>
                            </div>
                            {errors.role && <span className="form-error">{errors.role.message as string}</span>}
                        </div>

                        <div className="form-footer">
                            <Button variant="primary" type="submit" className="w-full">
                                Зареєструватись
                            </Button>

                            <div className="login-flow">
                                <p>Вже маєте аккаунт?</p>
                                <Link
                                    className="form-link"
                                    to={"/login"}
                                >
                                    Увійти
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}