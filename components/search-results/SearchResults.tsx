import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import dayjs from "dayjs";

import { SearchResponse } from "../../pages/api/search";

import styles from "./SearchResults.module.css";

export interface SearchResultsProps {
  results?: SearchResponse;
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className={styles.container}>
      {results?.items?.length ? (
        <>
          <div className={styles.header}>
            {`${results.total} Results Found`}
          </div>
          <div className={styles.results}>
            {results?.items?.map(({ name, number, date }) => (
              <div key={number} className={styles.item}>
                <div>{name}</div>
                <div>{`Created on: ${dayjs(date).format("Do MMM YYYY")}`}</div>
                <div>
                  <b>{`Company Number: `}</b>
                  {number}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.noResults}>{`No matches found`}</div>
      )}
    </div>
  );
}
