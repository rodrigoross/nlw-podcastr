// SPA => useEffect dentro da function do Componente => // import { useEffect } from "react";
//SSR => getServerSideProps. OBS: Carrega e executa toda vez que a página é acessada.
//SSG => getStaticProps, precisa do parametro revalidate com o tempo para ser gerado. Só é executada em prod.
import { GetStaticProps } from "next";
interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
}

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  console.log(props.episodes);

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
