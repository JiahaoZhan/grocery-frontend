import { AuthForm } from "../partials"
import { useAppDispatch } from "../redux";
import { useNavigate } from "react-router";
import { login } from "../redux";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        dispatch(login({
            email: values.email,
            password: values.password,
        }))
        .then((res)=> {
            navigate("/dashboard");
        })
    }

    const formProps = {
        title: "Welcome back",
        type: "login",
        onSubmit,
    }

    return <AuthForm {...formProps}/>
}