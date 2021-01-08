import React from 'react';
import { Container, Card, Form, Table, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'react';


const Tarefas = () => {
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('');
    const [tarefa, setTarefa] = useState([]);
    

    useEffect(() => {

        listarTarefas();

    }, [])

    const listarTarefas = () => {
        fetch('http://localhost:65242/api/tarefa/', {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
            .then(response => response.json())
            .then(data => {
                setTarefa(data.data);
                console.log("eu sou o req" + data.data);
            })
        }

    console.log(tarefa);

    const salvar = (event) => {
        event.preventDefault();

        const tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoria: categoria,
            dataEntrega : dataEntrega,
            status : status
        }

        const method = (id === 0 ? 'POST' : 'PUT');
        const urlRequest = (id === 0 ? 'http://localhost:5000/api/tarefa/' : 'https://localhost:5000/api/tarefa/' + id)

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(tarefa),
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir'),
                'content-type' : 'application/json'
                 
            }
        })

        .then(response => response.json())
        .then(dados => {
            alert('Tarefa salva');

            listarTarefas();

            limparCampos();
        })
    }
    
    const editar = (event) => {
        event.preventDefault();
        
        fetch('https://localhost:5000/api/tarefa/' + event.target.value, {
            method : "Get",
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setId(data.id);
            setTitulo(data.titulo);
            setDescricao(data.descricao);
            setCategoria(data.categoria);
            setDataEntrega(moment(data.dataEntrega.substring(0,10)));
            setStatus(data.status);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const excluir = () => {
        if(confirm("Deseja realmente excluir a tarefa?")){
            fetch('https://localhost:5000/api/tarefa/') + event.target.value,{
            method : 'Delete',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        }
    }
}

    .then(() => {
        alert('Tarefa excluida');

        listarTarefas();
    }



    const limparCampos = () => {
        setId(0);
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setDataEntrega('');
        setStatus('');
    }
    
    return (
        <div>
            <Container>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.Form)} placeholder="Informe o titulo" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.Form)} placeholder="Informe a descrição" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.Form)} placeholder="Informe a categoria" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Data de entrega</Form.Label>
                                <Form.Control type="date" value={dataEntrega} onChange={event => setDataEntrega(event.target.value)} placeholder="Informe a data de entrega" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={status} onChange={event => setStatus(event.target.value)} aria-label="Status" />
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
                            tarefa.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.titulo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.dataEntrega}</td>
                                        <td>{item.status ? 'Feito' : 'Para fazer'}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} onClick = {event => editar(event)}>Editar</Button>
                                            <Button variant="danger"  value={item.id} onClick = {event => editar(event)}>Excluir</Button>
                                            <Button variant="primary" value={item.id}>Alterar status</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Tarefas;