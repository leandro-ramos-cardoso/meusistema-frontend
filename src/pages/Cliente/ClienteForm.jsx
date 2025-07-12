import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Button, Form, OverlayTrigger, Tooltip, Row, Col, Modal } from 'react-bootstrap'
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa'

const ClienteForm = () => {

    const [modalAberto, setModalAberto] = useState(false)

    const navigate = useNavigate()

    // Estou verificando se existe o id na url
    const { id } = useParams()

    const apiUrl = import.meta.env.VITE_API_URL

    const [cliente, setCliente] = useState({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "Brasil"
        }
    })

    const handleEndereco = (campo, valor) => {
        setCliente((prev) => ({
            ...prev,
            endereco: {...prev.endereco, [campo]: valor}
        }))
    }

    const handleCepChange = (e) => {
        // Tem que estar pronto para mudar tambem o endereco completo
        handleEndereco("cep", e.target.value)
    }

    useEffect(() => {
        const cep = cliente.endereco.cep.replace(/\D/g, "");
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                handleEndereco("logradouro", response.data.logradouro)
                handleEndereco("bairro", response.data.bairro)
                handleEndereco("cidade", response.data.localidade)
                handleEndereco("estado", response.data.estado)
            })
            .catch(error => console.error("Houve um errro ao buscar o endereço no viacep: ", error))
        }
    }, [cliente.endereco.cep])

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(error => console.error("Houve um erro ao carregar o cliente: ", error))
        }
    }, [id])


    const handleSubmit = (e) => {
        e.preventDefault()

        const request = id
        ? axios.put(`${apiUrl}/clientes/${id}`, cliente)
        : axios.post(`${apiUrl}/clientes`, cliente)

        request.then(() => setModalAberto(true))
        .catch(error => console.error("Erro ao cadastrar/editar cliente: ", error))
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4 d-flex align-items-center">
                { id ? 'Editar Cliente' : 'Adicionar Cliente'}
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Preencha os dados do cliente</Tooltip>}
                >
                    <span className="ms-2" style={{cursor: "pointer"}}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text" 
                        required
                        value={cliente.nome}
                        onChange={(e => setCliente({ ...cliente, nome: e.target.value}))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        type="text" 
                        required
                        value={cliente.cpf}
                        onChange={(e => setCliente({ ...cliente, cpf: e.target.value}))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email" 
                        required
                        value={cliente.email}
                        onChange={(e => setCliente({ ...cliente, email: e.target.value}))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        type="text" 
                        required
                        value={cliente.telefone}
                        onChange={(e => setCliente({ ...cliente, telefone: e.target.value}))}
                    />
                </Form.Group>

                {/* Campos de endereco */}
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: 58000-000"
                                value={cliente.endereco.cep}
                                onChange={handleCepChange}
                                autoComplete="off"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.logradouro}
                                onChange={e => handleEndereco("logradouro", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.numero}
                                onChange={e => handleEndereco("numero", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.complemento}
                                onChange={e => handleEndereco("complemento", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.bairro}
                                onChange={e => handleEndereco("bairro", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.cidade}
                                onChange={e => handleEndereco("cidade", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.estado}
                                onChange={e => handleEndereco("estado", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pais</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.endereco.pais}
                                onChange={e => handleEndereco("pais", e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-4" variant="success" type="submit">
                    Salvar
                </Button>
            </Form>

            {/* Modal de sucesso */}

            <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-clientes') }}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaCheckCircle className="text-success me-2" /> Sucesso
                    </Modal.Title>
                </Modal.Header>

                    <Modal.Body>
                        Cliente cadastrado com sucesso!
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={() => navigate( '/listar-clientes' )}>
                            Fechar
                        </Button>
                    </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ClienteForm