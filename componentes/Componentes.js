// componentes/Componentes.js
const Contador = () => {
    const[numero,numeroStatus] = React.useState(0);

    const clikBoton = () =>{
        numeroStatus(numero +1);
    }
    const clikBotonM = () =>{
        numeroStatus(numero - 1);
    }

    return (
      <div>
            {/* se usa className en ves de solo class xq mas adelante puede dentrar en conflictos con 
            otros elemntos de nuestr archivo js  */}
        <h1 className={numero < 0 ? "menor": "mayor"}>  {numero}</h1>
        <hr />
        <button  onClick = {clikBoton}>subir</button>
        <button onClick = {clikBotonM}>bajar</button>
      </div>
    );
  };
  