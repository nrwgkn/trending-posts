import React from "react";
import { IResponseData } from "../api";

interface IProps {
  results: IResponseData["data"];
  error: string;
}

const SearchResults: React.FC<IProps> = ({ results, error }) => {
  return (
    <div className="searchResults">
      {results.length > 0 ? (
        <>
          {results.map(
            (result, index) =>
              result.media &&
              result.media.length > 0 && (
                <div className="searchResults__item" key={`tweet_${index}`}>
                  <p>{result.text}</p>
                  <div className="searchResults__image">
                    {result.media.map((item, index) => (
                      <img src={item} alt="tweet" key={`image_${index}`} />
                    ))}
                  </div>
                </div>
              )
          )}
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export { SearchResults };
