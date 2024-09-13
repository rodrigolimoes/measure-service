import { Table } from "@/components/Table";

const Home = () => {
  return (
    <div>
      {" "}
      <Table
        columns={[
          { id: "1", label: "Nome" },
          { id: "2", label: "Sobrenome" },
        ]}
        items={{
          "1": (data) => data.name,
          "2": (data) => data.lastname,
        }}
        data={[
          {
            name: "Rodrigo",
            lastname: "Limões",
          },
        ]}
      />
    </div>
  );
};

export default Home;
