import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
  HeaderRight,
} from "./_components/header";

const Home = () => {
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg bg-white p-8">
    <Header>
      <HeaderLeft>
        <HeaderSubtitle>Visão geral</HeaderSubtitle>
        <HeaderTitle>Dashboard</HeaderTitle>
      </HeaderLeft>
     
    </Header>
    </div>
  );
};

export default Home;
