import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Header from '../Header/header'

function ListarUsuarios() {
    const [allUsers, setAllUsers] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    function handleVoltarLogin() {
        navigate('/login')
    }

    useEffect(() => {
        const emailLogado = localStorage.getItem('userEmail')
        if (emailLogado === 'adminapp@gmail.com') {
            setIsAdmin(true)
        }

        async function loadData() {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('/listar-usuarios', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                setAllUsers(response.data.user)
            } catch (err) {
                console.error("Erro ao carregar usuários:", err)
            }
        }
        loadData()
    }, [])

    async function deleteUser(id) {
        try {
            const token = localStorage.getItem('token')
            await api.delete(`/usuarios/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            alert('Usuário deletado com sucesso!')
            setAllUsers(allUsers.filter(user => user.id !== id))

        } catch (err) {
            alert('Erro ao deletar usuário!')
            console.error(err)
        }
    }

    return (
        <div>
            <Header />
            <div className="max-w-2xl mx-auto mt-10 bg-[#191970] p-8 border border-gray-300 rounded-md">
                <h2 className='mb-6 text-[40px] text-center font-bold font-[roboto] text-[#ffffff]'>
                    {isAdmin ? 'Painel Admin - Usuários' : 'Listar Usuários'}
                </h2>

                <ul className="flex flex-col gap-3 mb-6">
                    {allUsers && allUsers.length > 0 && allUsers
                        // filtro para ocultar o user admin quando o user normal estiver logado
                        .filter(user => {
                            const emailLogado = localStorage.getItem('userEmail');
                            if (emailLogado === 'adminapp@gmail.com') return true; // Admin vê tudo (inclusive ele mesmo)
                            return user.email !== 'adminapp@gmail.com'; // Usuário comum esconde o admin da lista
                        })

                        ?.map(user => (
                            <li key={user.id} className='bg-white text-[#000000] p-4 rounded-md flex justify-between items-center'>
                                <div>
                                    <p className="font-bold">ID: {user.id}</p>
                                    <p className="font-bold">Nome: {user.name}</p>
                                    <p className="font-bold">Email: {user.email}</p>
                                </div>

                                {isAdmin && (
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors cursor-pointer text-sm"
                                    >
                                        Deletar
                                    </button>
                                )}
                            </li>
                        ))}
                </ul>

                <button onClick={handleVoltarLogin} className="w-full bg-white py-2 px-4 rounded-md hover:bg-sky-200 font-bold cursor-pointer">
                    Retornar ao login
                </button>
            </div>
        </div>
    )
}

export default ListarUsuarios