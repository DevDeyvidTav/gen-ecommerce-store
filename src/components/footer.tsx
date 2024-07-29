import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-white text-black border-t-[0.5px] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Sobre Nós</h2>
            <p className="text-gray-700">Lojão Tudo 18 oferece a melhor experiência de compras online com produtos de alta qualidade e excelente atendimento ao cliente.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Links Rápidos</h2>
            <ul>
              <li><a href="#" className="text-gray-700 hover:text-black">Início</a></li>
              <li><a href="#" className="text-gray-700 hover:text-black">Produtos</a></li>
              <li><a href="#" className="text-gray-700 hover:text-black">Promoções</a></li>
              <li><a href="#" className="text-gray-700 hover:text-black">Contato</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Contato</h2>
            <p className="text-gray-700">Email: contato@lojaotudo18.com.br</p>
            <p className="text-gray-700">Telefone: (11) 1234-5678</p>
            <p className="text-gray-700">Endereço: Rua Exemplo, 123, São Paulo, SP</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Siga-nos</h2>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-700 hover:text-black"><FaFacebookF /></a></li>
              <li><a href="#" className="text-gray-700 hover:text-black"><FaInstagram /></a></li>
              <li><a href="#" className="text-gray-700 hover:text-black"><FaTwitter /></a></li>
              <li><a href="#" className="text-gray-700 hover:text-black"><FaWhatsapp /></a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-700">
          &copy; 2024 Lojão Tudo 18. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

