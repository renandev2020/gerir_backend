import React from 'react';
import { Container, Card, Form, Table, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

const Tarefas = () => {
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('');
    const [Tarefa, setTarefas] = useState([]);

    useEffect(() => {

        listarTarefas();

    }, [])

    const listarTarefas = () => {
        fetch('http://localhost:65242/api/tarefa/',{
            method : 'Get',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
            .then(response => response.json())
            .then(data => {
                setTarefas(data.data); 
                console.log(data.data);
            })
        }
        

    return (
        <div>
            <Container>

                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.Form)} placeholder="Informe o titulo" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.Form)} placeholder="Informe a Descrição" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.Form)} placeholder="Informe a Categoria" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Data de entrega</Form.Label>
                                <Form.Control type="text" value={dataEntrega} onChange={event => setDataEntrega(event.target.value)} placeholder="Informe a data de entrega" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={status} onChange={event => setStatus(event.target.value)} aria-label="Marque para concordar com os Termos" />
                                </InputGroup.Prepend>
                            </Form.Group>
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data de entrega</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Tarefa.map((item, index) => {
                                <tr>
                                    <td>{item.titulo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.dataEntrega}</td>
                                    <td>{item.Status ? 'Feito' : 'Para fazer'}</td>
                                    <td>
                                        <Button variant="warning" value={item.id}>Editar</Button>
                                        <Button variant="danger"  value={item.id}>Excluir</Button>
                                        <Button variant="primary" value={item.id}>Alterar status</Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Container>
)
        </div>
    )
}

export default Tarefas;