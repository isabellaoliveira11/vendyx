import { useEffect, useMemo, useState } from 'react';
import {
  PlusCircle,
  PencilSimple,
  User,
  Envelope,
  Phone,
  House,
} from 'phosphor-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../config/api';
import type { Client } from '../types/client';

interface ClientFormProps {
  editingClient: Client | null;
  onClientAction: () => void;
  onCancelEdit: () => void;
}

function ClientForm({ editingClient, onClientAction, onCancelEdit }: ClientFormProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Normaliza email só para validação/exibição
  const normalizedEmail = useMemo(() => clientEmail.trim().toLowerCase(), [clientEmail]);

  useEffect(() => {
    if (editingClient) {
      setClientName(editingClient.name ?? '');
      setClientEmail(editingClient.email ?? '');
      setClientPhone(editingClient.phone ?? '');
      setClientAddress(editingClient.address ?? '');
      setNameError(null);
      setEmailError(null);
    } else {
      resetForm();
    }
  }, [editingClient]);

  function resetForm() {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientAddress('');
    setNameError(null);
    setEmailError(null);
  }

  function validateForm() {
    let ok = true;

    if (!clientName.trim()) {
      setNameError('Nome do cliente é obrigatório.');
      ok = false;
    } else {
      setNameError(null);
    }

    if (!normalizedEmail) {
      setEmailError('Email é obrigatório.');
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setEmailError('Por favor, insira um email válido.');
      ok = false;
    } else {
      setEmailError(null);
    }

    return ok;
  }

  async function handleSubmit() {
    if (isLoading) return; // evita duplo clique
    if (!validateForm()) {
      toast.error('Preencha os campos obrigatórios corretamente.');
      return;
    }

    setIsLoading(true);

    const payload = {
      name: clientName.trim(),
      email: normalizedEmail,
      phone: clientPhone.trim(),
      address: clientAddress.trim(),
    };

    try {
      if (editingClient) {
        await toast.promise(
          axios.put(`${API_URL}/clients/${editingClient.id}`, payload),
          {
            loading: 'Salvando alterações...',
            success: 'Cliente atualizado com sucesso!',
            error: 'Erro ao atualizar cliente.',
          }
        );
      } else {
        await toast.promise(
          axios.post(`${API_URL}/clients`, payload),
          {
            loading: 'Adicionando cliente...',
            success: 'Cliente adicionado com sucesso!',
            error: 'Erro ao adicionar cliente.',
          }
        );
      }
      onClientAction();
      onCancelEdit();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      toast.error('Erro ao salvar cliente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        {editingClient ? <PencilSimple size={20} weight="bold" /> : <PlusCircle size={20} weight="bold" />}
        {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
      </h3>

      <div className="flex flex-col gap-4">
        {/* Nome */}
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do cliente
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <User size={18} aria-hidden />
            </span>
            <input
              id="clientName"
              type="text"
              placeholder="Nome completo"
              autoComplete="name"
              className={`pl-10 border rounded-md p-2 w-full ${nameError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors`}
              value={clientName}
              onChange={(e) => { setClientName(e.target.value); setNameError(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Envelope size={18} aria-hidden />
            </span>
            <input
              id="clientEmail"
              type="email"
              placeholder="exemplo@email.com"
              autoComplete="email"
              inputMode="email"
              className={`pl-10 border rounded-md p-2 w-full ${emailError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors`}
              value={clientEmail}
              onChange={(e) => { setClientEmail(e.target.value); setEmailError(null); }}
              onBlur={() => setClientEmail((v) => v.trim())}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        {/* Telefone (opcional) */}
        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Phone size={18} aria-hidden />
            </span>
            <input
              id="clientPhone"
              type="tel"
              placeholder="(11) 99999-9999"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              className="pl-10 border rounded-md p-2 w-full border-gray-300 focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        {/* Endereço (opcional) */}
        <div>
          <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Endereço <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <House size={18} aria-hidden />
            </span>
            <input
              id="clientAddress"
              type="text"
              placeholder="Rua, Número, Bairro"
              autoComplete="street-address"
              className="pl-10 border rounded-md p-2 w-full border-gray-300 focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        {/* Botões */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : editingClient ? (
            <>
              <PencilSimple size={20} weight="bold" /> Salvar Alterações
            </>
          ) : (
            <>
              <PlusCircle size={20} weight="bold" /> Adicionar Cliente
            </>
          )}
        </button>

        {editingClient && (
          <button
            onClick={onCancelEdit}
            disabled={isLoading}
            className="mt-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60"
          >
            Cancelar Edição
          </button>
        )}
      </div>
    </>
  );
}

export default ClientForm;
