// SPA => useEffect dentro da function do Componente => // import { useEffect } from "react";
//SSR => getServerSideProps. OBS: Carrega e executa toda vez que a página é acessada.
//SSG => getStaticProps, precisa do parametro revalidate com o tempo para ser gerado. Só é executada em prod.
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../util/convertDurationToTimeString";
interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes: Episode[] = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
