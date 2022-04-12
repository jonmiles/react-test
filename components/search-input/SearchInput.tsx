import { useState } from "react";

import { Button } from "../button";

import styles from "./SearchInput.module.css";

export interface SearchInputProps {
  onSubmit: (term: string) => void;
}

export function SearchInput({ onSubmit = () => undefined }: SearchInputProps) {
  const [term, setTerm] = useState("");

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter company name to search ..."
        onChange={(e) => {
          setTerm(e.currentTarget.value);
        }}
      />
      <Button disabled={!term} onClick={() => onSubmit(term)}>
        Search
      </Button>
    </div>
  );
}
