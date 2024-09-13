import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField/TextField";

const Home = () => {
  return (
    <div className="w-100 h-full flex justify-center items-center gap-6 flex-col">
      <TextField placeholder={"Código do Usuário"} className="w-384" />
      <div className="flex justify-center items-center gap-4">
        <Button>Visualizar Medições</Button>
        <Button variant="success">Capturar Medição</Button>
      </div>
    </div>
  );
};

export default Home;
