import React, { useState } from "react";
import axios from "axios";

const modes = [
  { label: "Faves", value: "faves" },
  { label: "Retweets", value: "retweets" },
];

interface IData {
  text: string;
  source: string;
  media?: {
    url?: string;
  };
}

interface IResponseData {
  data: IData;
  max_id: number;
}

const initialData = {
  word: "",
  mode: "faves",
  isImage: true,
  minImpression: "1000",
};

const twitterAPI = (screen_name: string, max_id?: string) => {
  let endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/fav?name=${screen_name}&maxid=${max_id}`;
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const SearchArea: React.FC = () => {
  const [filtering, setFiltering] = useState(initialData);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<IResponseData[]>([]);

  const onChangeFiltering = (key: string, value: string | boolean) => {
    setFiltering({ ...filtering, [key]: value });
  };

  const onClickSearchButton = () => {
    if (!filtering.word) return;
    twitterAPI(filtering.word)
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
    <div className="searchArea">
      {/* Title */}
      <h1>Trending Posts</h1>
      {/* Input Form */}
      <div className="searchArea__form container">
        <input
          className="searchArea__input"
          type="text"
          value={filtering.word}
          onChange={(e) => onChangeFiltering("word", e.target.value)}
        />
        <button className="searchArea__button" onClick={onClickSearchButton}>
          Get
        </button>
      </div>
      {/* Setting */}
      <div
        className="searchArea__setting container"
        onClick={() => setIsShowSetting(!isShowSetting)}
      >
        Setting
      </div>
      {/* Detail */}
      {isShowSetting && (
        <div className="searchArea__details container">
          <dl>
            <dt>mode:</dt>
            <dd>
              {modes.map((mode, index) => {
                return (
                  <label
                    htmlFor={mode.value}
                    className={`searchArea__radio${
                      mode.value === filtering.mode ? " isChecked" : ""
                    }`}
                    key={`mode_${index}`}
                  >
                    {mode.label}
                    <input
                      type="radio"
                      name="modes"
                      id={mode.value}
                      value={mode.value}
                      onChange={(e) =>
                        onChangeFiltering("mode", e.target.value)
                      }
                      checked={mode.value === filtering.mode}
                    />
                  </label>
                );
              })}
            </dd>
          </dl>
          <dl>
            <dt>value:</dt>
            <dd>
              <div className="searchArea__text">
                more than
                <input
                  type="text"
                  value={filtering.minImpression}
                  onChange={(e) =>
                    onChangeFiltering("minImpression", e.target.value)
                  }
                />
              </div>
            </dd>
          </dl>
          <dl>
            <dt>image:</dt>
            <dd>
              <label
                htmlFor="isImage"
                className={`searchArea__checkbox${
                  filtering.isImage ? " isChecked" : ""
                }`}
              >
                include image
                <input
                  type="checkbox"
                  id="isImage"
                  onChange={(e) =>
                    onChangeFiltering("isImage", e.target.checked)
                  }
                  checked={filtering.isImage}
                />
              </label>
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export { SearchArea };
