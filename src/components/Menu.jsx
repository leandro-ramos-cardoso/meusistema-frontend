import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    MeuSistema
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="menu-principal" />

                <Navbar.Collapse id="menu-principal">

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/listar-produtos">Produtos</Nav.Link>
                        <Nav.Link as={Link} to="/listar-clientes">Clientes</Nav.Link>
                        <Nav.Link as={Link} to="/listar-fornecedores">Fornecedores</Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown
                            title={
                                <span>
                                    <FaUserCircle className="me-2" />
                                    Leandro
                                </span>
                            }
                        >
                            <NavDropdown.Item>
                                Meu perfil
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item>
                                <FaSignOutAlt className="me-2" />
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu