import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import api from '../../services/api'
import Header from '../Header/header'


function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const emailDigitado = emailRef.current.value
            const response = await api.post('/login', {
                email: emailDigitado,
                password: passwordRef.current.value
            })

            const token = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('userEmail', emailDigitado) 

            navigate('/listar-usuarios')

        } catch (err) {
            alert('Senha ou e-mail incorretos!')
            console.error(err)
        }
    }

    return (
        <div>
            <Header />
            <div className="bg-[#191970] max-w-[600px] mx-auto mt-10 p-8 rounded-lg shadow-[0_10px_25px_rgba(255,255,255,0.15)]">
                <h2 className="text-[40px] font-bold mb-6 text-center text-[#ffffff] font-roboto">Login</h2>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none" />
                    <input ref={passwordRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none" />
                    <button className="w-full bg-white py-2 px-4 rounded-md hover:bg-sky-200">Login</button>
                </form>

                <Link to="/" className="text-white hover:underline mt-4 block text-center">Não tem uma conta? Cadastre-se</Link>
            </div>
        </div>
    )
}

export default Login;