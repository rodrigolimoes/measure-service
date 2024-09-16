import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <div className="w-100 h-full flex justify-center items-center gap-6 flex-col">
      <TextField
        value={value}
        onChange={({ target }) => {
          setValue(target?.value);
        }}
        placeholder={"Código do Usuário"}
        className="w-384"
      />
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={() => {
            navigate(`${value}/measures`);
          }}
        >
          Visualizar Medições
        </Button>
        <Button variant="success" onClick={() => {
            navigate(`${value}/measures/new`);
          }}>Capturar Medição</Button>
      </div>
    </div>
  );
};

export default Home;
