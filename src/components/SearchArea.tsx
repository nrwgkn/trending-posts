import React, { useState } from "react";

const modes = [
  { label: "Faves", value: "faves" },
  { label: "Retweets", value: "retweets" },
];

const initialData = {
  word: "",
  mode: "faves",
  isImage: true,
  minImpression: "1000",
};

const SearchArea: React.FC = () => {
  const [filtering, setFiltering] = useState(initialData);
  const [isShowSetting, setIsShowSetting] = useState(false);

  const onChangeFiltering = (key: string, value: string | boolean) => {
    setFiltering({ ...filtering, [key]: value });
  };

  const onClickSearchButton = () => {
    if (!filtering.word) return;
    console.log({ filtering });
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
