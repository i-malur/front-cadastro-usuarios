import { Link } from "react-router-dom"
import { useRef } from "react"
import api from '../../services/api'
import Header from '../Header/header'

function Cadastro() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            alert('Sucesso!')
        } catch (err) {
            alert('Erro ao cadastrar!')
        }

    }

    return (
        <div>
            <Header />
            <div className="bg-[#191970] max-w-[600px] mx-auto mt-10 p-8 rounded-lg shadow-[0_10px_25px_rgba(255,255,255,0.15)]">
                <h2 className="text-[40px] font-bold mb-6 text-center text-[#ffffff] font-roboto">Cadastro</h2>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input ref={nameRef} placeholder="Nome" type="text" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none" />
                    <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none" />
                    <input ref={passwordRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none" />
                    <button className="w-full bg-white py-2 px-4 rounded-md hover:bg-sky-200">Cadastrar-se</button>
                </form>

                <Link to="/login" className="text-white hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
            </div>
        </div>
    )
}

export default Cadastro;