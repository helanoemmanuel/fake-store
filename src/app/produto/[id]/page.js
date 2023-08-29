"use client"
import {useEffect, useState} from "react";

export default function Produto({params: {id}}){

  const [infoProduto, setInfoProduto] = useState()

  async function requisitaInformacoesProduto(){
    await fetch('https://fakestoreapi.com/products/' + id)
       .then(async res=> {

         const resposta = await res.json()

         setInfoProduto(resposta)

         return resposta
       })
       .then(json=>console.log(json))

  }

  useEffect(() => {
    requisitaInformacoesProduto()
  }, [])

  return <div className="min-h-screen flex justify-center min-w-screen p-10">
    <img src={infoProduto?.image} alt={infoProduto?.title} className="w-64 h-64 object-cover rounded-md" />
  </div>
}
