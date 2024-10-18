import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import { useState } from 'react';

{/* <div id="wallet_container"></div> */}



export default function Product() {

  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('APP_USR-5ba67a6f-01d5-496b-b027-47e29a394849', {
    // En que idioma se hace el boton de pago
    locale: "es-CO"

  });

  const createPreference = async () => { 
    try {
      const response = await axios.post("http://localhost:8080/create-preference", {
        name: "Zapato",
        quantity: 1,
        unitPrice: 10000,
      }); 
      
      const dataPreference = response.data;
      console.log(response)
      return dataPreference;
    }
    catch(err) {
      console.error(err);
    }
  }
  
  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  }
  


  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
        <img
          className="object-cover"
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="product image"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">$449</span>
            <span className="text-sm text-slate-900 line-through">$699</span>
          </p>
          <div className="flex items-center">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
          </div>
        </div>
        <a onClick={handleBuy}
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Comprar Ahora
        </a>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }}/> }
        {/* preference: los datos que se envian al servidor */} 
        
      </div>
    </div>
  );
}
