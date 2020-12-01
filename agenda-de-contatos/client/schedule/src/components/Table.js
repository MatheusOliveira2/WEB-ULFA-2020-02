import React, { useState, useEffect } from 'react';
import scheduleService from '../services/scheduleService';
import axios from 'axios';

export default function Table() {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [buttonType, setButtonType] = useState('cadastrar');

  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState({
    uf: '',
    localidade: '',
    bairro: '',
    logradouro: '55',
  });

  const [cep, setCep] = useState(0);

  const [updateIndex, setUpdateIndex] = useState(-1);

  const handleDeleteButton = async (index) => {
    try {
      await scheduleService.delete(index);
      setAccounts(accounts.filter((account) => account.id !== index));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getAll() {
      const data = await scheduleService.getAll();
      if (!data.logradouro) setDisabled(false);
      setAccounts(data);
    }
    getAll();
  }, []);

  const handleUpdateButton = async () => {
    try {
      await scheduleService.update(updateIndex, number);
      alert('Atualizado!');
      setName('');
      setNumber(0);
      setButtonType('cadastrar');
    } catch (err) {
      alert('Erro ao atualizar');
    }
  };

  const handleCepConfirmed = async () => {
    try {
      const data = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.data.erro === true) {
        throw 'Cep não encontrado';
      }
      setAddress(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleEditButton = (account) => {
    setButtonType('atualizar');
    setName(account.name);
    setNumber(account.number);
    setUpdateIndex(account.id);
  };

  const handleRegisterButton = async () => {
    console.log(address);
    const data = await scheduleService.add({ name, number, ...address });
    setAccounts([data, ...accounts]);
  };

  let button = (
    <div>
      <a
        className="waves-effect waves-light btn green"
        onClick={handleRegisterButton}
      >
        Cadastrar
      </a>
    </div>
  );

  if (buttonType === 'atualizar') {
    button = (
      <div>
        <a
          className="waves-effect waves-light btn blue"
          onClick={handleUpdateButton}
        >
          Atualizar
        </a>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col s12 valign-wrapper">
          <div className="input-field col s3">
            <label htmlFor="name">Nome</label>
            <br></br>
            <input
              value={name}
              type="text"
              className="validate"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="number">Número</label>
            <br></br>
            <input
              value={number}
              type="number"
              className="validate"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="col s2 valign-wrapper">{button}</div>
        </div>
        <div className="col s12">
          <div className="input-field col s2">
            <label htmlFor="number">CEP</label>
            <br></br>
            <input
              value={cep}
              type="number"
              className="validate"
              onChange={(e) => setCep(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? handleCepConfirmed() : '')}
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="estado">Estado</label>
            <br></br>
            <input
              value={address.uf}
              type="text"
              disabled
              className="validate"
              onChange={(e) => setAddress({ ...address, uf: e.target.value })}
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="cidade">Cidade</label>
            <br></br>
            <input
              value={address.localidade}
              type="text"
              disabled
              className="validate"
              onChange={(e) =>
                setAddress({ ...address, localidade: e.target.value })
              }
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="bairro">Bairro</label>
            <br></br>
            <input
              value={address.bairro}
              type="text"
              className="validate"
              disabled={disabled}
              onChange={(e) =>
                setAddress({ ...address, bairro: e.target.value })
              }
            />
          </div>
          <div className="input-field col s2">
            <label htmlFor="logradouro">Logradouro</label>
            <br></br>
            <input
              value={address.logradouro}
              type="text"
              disabled={disabled}
              className="validate"
              onInput={(e) =>
                setAddress({ ...address, logradouro: e.target.value })
              }
            />
          </div>
        </div>
        <div className="input-field col s3 offset-s4">
          <label htmlFor="name">Buscar Contato</label>
          <br></br>
          <input
            id="search"
            type="text"
            className="validate"
            onInput={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Logradouro</th>
            <th className="center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account, index) => {
            if (search === '' || account.name.toString().includes(search)) {
              return (
                <tr key={index}>
                  <td>{account.name}</td>
                  <td>{account.number}</td>
                  <td>{account.uf}</td>
                  <td>{account.city}</td>
                  <td>{account.neighborhood}</td>
                  <td>{account.street}</td>
                  <td className="center">
                    <a
                      className="waves-effect waves-light btn red"
                      onClick={() => handleDeleteButton(account.id)}
                    >
                      Excluir
                    </a>
                    <a
                      className="waves-effect waves-light btn blue"
                      onClick={() => handleEditButton(account, index)}
                      style={{ marginLeft: 15 + 'px' }}
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              );
            } else {
              return '';
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
