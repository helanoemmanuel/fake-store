"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Home() {

  const [listaDeProdutos, setListaDeProdutos] = useState([])

  const router = useRouter()

  async function requisitarProdutos(){
    await fetch('https://fakestoreapi.com/products')
       .then(async res=> {

         const resposta = await res.json()

         setListaDeProdutos(resposta)

            return resposta
       })
       .then(json=>console.log(json))

  }


  function navigateToProduto(id){
    router.push(`/produto/${id}`)
  }

  useEffect(() => {
    requisitarProdutos()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {listaDeProdutos.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            <div className="text-2xl font-bold mt-5">Carregando...</div>
            </div>
        ) : (
            <div className="flex flex-wrap flex-row max-w-screen gap-4 justify-center">
              {listaDeProdutos.map((prod, idx) => {
                return (<div onClick={() => navigateToProduto(prod.id)} key={idx} style={{width: 200}} className="bg-white p-5 justify-evenly items-center flex flex-col border rounded border-gray-50 space-y-5">
                  <div className="flex">
                    <img src={prod.image} alt={prod.title} className="w-32 h-32" />
                  </div>
                  <div className="flex">{prod.title.length > 15 ? prod.title.slice(0, 15) + '...' : prod.title}</div>
                  <div className="font-bold text-2xl">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(prod.price)}</div>
                </div>)
              })}
            </div>
      )}
    </main>
  )
}
