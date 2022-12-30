import { useState } from "react";
import { SearchArea } from "../src/components/SearchArea";
import { SearchResults } from "../src/components/SearchResults";
import { twitterAPI } from "../src/api";

export interface IFiltering {
  word: string;
  // mode: string;
  // isImage: boolean;
  minImpression: string;
}

const initialFilter = {
  word: "",
  // mode: "faves",
  // isImage: true,
  minImpression: "1000",
};

function App() {
  const [filtering, setFiltering] = useState<IFiltering>(initialFilter);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const onChangeFiltering = (key: string, value: string | boolean) => {
    setFiltering({ ...filtering, [key]: value });
  };

  const onClickSearchButton = () => {
    if (!filtering.word) return;
    twitterAPI(filtering.word, filtering.minImpression)
      .then((res: any) => {
        setResults(res.data);
      })
      .catch(() => {
        setError(
          "取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。"
        );
      });
  };

  return (
    <div className="App">
      <SearchArea
        filtering={filtering}
        onChangeFiltering={onChangeFiltering}
        onClickSearchButton={onClickSearchButton}
      />
      <SearchResults results={results} error={error} />
    </div>
  );
}

export default App;
