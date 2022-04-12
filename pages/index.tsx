import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { fetchCompanies } from "../lib/search";
import { SearchResponse } from "./api/search";
import { SearchInput } from "../components/search-input";
import { SearchResults } from "../components/search-results";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [results, setResults] = useState<SearchResponse | undefined>();

  const fetchResults = async (term: string) => {
    const results = await fetchCompanies({ term });
    setResults(results);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coconut React Interview Test</title>
        <meta name="description" content="Coconut React Interview Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SearchInput onSubmit={fetchResults} />
        <SearchResults results={results} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
