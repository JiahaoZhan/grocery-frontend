import { AuthForm } from "../partials"
import { useAppDispatch } from "../redux";
import { useNavigate } from "react-router";
import { register } from "../redux";

export const RegisterForm:React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        dispatch(register({
            email: values.email,
            password: values.password,
            phone: values.phone
        }))
        .then((res)=> {
            navigate("/login");
        })
    }

    const formProps = {
        title: "Join us",
        type: "register",
        onSubmit,
    }

    return <AuthForm {...formProps}/>
}