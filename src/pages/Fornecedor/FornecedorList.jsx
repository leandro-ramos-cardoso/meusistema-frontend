import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FornecedorList = () => {

    const apiUrl = import.meta.env.VITE_API_URL
    const [fornecedores, setFornecedores] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)

    useEffect(() => {
        axios.get(`${apiUrl}/fornecedores`)
        .then(response => setFornecedores(response.data))
        .catch(error => console.error("Erro ao carregar fornecedores: ", error))
    }, [])

    const fecharModal = () => {
        setModalAberto(false)
        setFornecedorSelecionado(null)
    }

    const abrirModal = (fornecedor) => {
        setFornecedorSelecionado(fornecedor)
        setModalAberto(true)
    }

    const removerFornecedor = () => {
        axios.delete(`${apiUrl}/fornecedores/${fornecedorSelecionado.id}`)
        .then(() => {
            setFornecedores(prev => prev.filter(f => f.id !== fornecedorSelecionado.id))
            fecharModal()
        })
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4 d-flex align-items-center">
                Lista de Fornecedores
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Visualize, edite ou exclua fornecedores</Tooltip>}
                >
                    <span className="ms-2" style={{cursor: "pointer"}}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <div className="mb-3">
                <Button as={Link} to="/cadastrar-fornecedor" variant="primary"> 
                    <FaPlus className="me-2" /> Adicionar Fornecedor
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        fornecedores.map(fornecedor => (
                            <tr key={fornecedor.id}>
                                <td>{fornecedor.nome}</td>
                                <td>{fornecedor.cnpj}</td>
                                <td>{fornecedor.tipoFornecedor}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                    >
                                    <FaEdit className="me-1" /> Editar
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => abrirModal(fornecedor)}
                                    >
                                    <FaTrash className="me-1" /> Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={modalAberto} onHide={fecharModal} centered>
                <Modal.Header>
                    <Modal.Title>
                        <FaExclamationTriangle className="text-danger me-2" />
                        Confirmar exclusão
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Tem certeza que deseja excluir o fornecedor:{" "}<strong>{fornecedorSelecionado?.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>

                    <Button variant="danger" onClick={removerFornecedor}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default FornecedorList