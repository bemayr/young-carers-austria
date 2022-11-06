import React, { useEffect, useState } from "react";
import { useField, useFormFields } from "payload/components/forms";

import "./References.Extensions.scss"

export const AddressField: React.FC = () => {
  const { value: address } = useField<string>({ path: "address" });
  const { setValue: setOGTitle } = useField<string>({
    path: "opengraph.title",
  });
  const { setValue: setOGDescription } = useField<string>({
    path: "opengraph.description",
  });
  const { setValue: setOGImageUrl } = useField<string>({
    path: "opengraph.imageUrl",
  });

  useEffect(() => {
    fetch(`/opengraph/parse?url=${address}`)
      .then((response) => response.json())
      .then(({ title, description, imageUrl }) => {
        setOGTitle(title);
        setOGDescription(description);
        setOGImageUrl(imageUrl);
      })
      .catch(() => {
        setOGTitle(undefined);
        setOGDescription(undefined);
        setOGImageUrl(undefined);
      });
  }, [address]);

  return null;

  // return (
  //   <div>
  //     {JSON.stringify({ address })}
  //     {/* <input onChange={e => setValue(e.target.value)} value={value?.path} /> */}
  //   </div>
  // );
};

type OpenGraphDefaultActionProps = {
  ogProperty: string;
  property: string;
  hint: string;
};

export const OpengraphDescription: React.FC<OpenGraphDefaultActionProps> = ({
  ogProperty,
  property,
  hint = "",
}) => {
  const { value } = useField<string>({ path: `opengraph.${ogProperty}` });
  const { setValue } = useField<string>({ path: property });

  const useOpenGraphValue = (event: React.MouseEvent) => {
    event.preventDefault();
    setValue(value);
  };

  return (
    <div>
      {" "}
      <span>{hint}</span>{" "}
      <button onClick={useOpenGraphValue}>Von Link übernehmen</button>{" "}
    </div>
  );
};

async function getPredefinedPreviewImageUrls() {
  const response = await fetch(
    `https://www.young-carers-austria.at/api/previewImages.json`
  );
  const data = await response.json();
  return data;
}

type Props = { path: string };

export const PreviewImageUrlField: React.FC<Props> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const { value: ogImageUrl } = useField<string>({
    path: "opengraph.imageUrl",
  });
  const [predefinedPreviewImageUrls, setPredefinedPreviewImageUrls] = useState(
    []
  );

  useEffect(() => {
    getPredefinedPreviewImageUrls().then(setPredefinedPreviewImageUrls);
  }, []);

  return (
    <div className="field-type radio" style={{marginBottom: "2rem"}}>
      <label htmlFor="field-previewImageUrl" className="field-label">
        Vorschaubild<span className="required">*</span>
      </label>
      <div className="imagePreview-radio">
      {ogImageUrl === undefined ? (
        <p>Dieser Link bietet leider kein Vorschaubild, bitte wählen Sie eines der folgenden aus.</p>
      ) : (
        <div>
          <input
            type="radio"
            name="titleImage"
            id={`titleImage(${ogImageUrl})`}
            value={ogImageUrl}
            onChange={(event) => setValue(event.target.value)}
            checked={value === ogImageUrl}
          />
          <label htmlFor={`titleImage(${ogImageUrl})`}>
            <img
              src={ogImageUrl}
              alt="Preview Image"
            ></img>
          </label>
        </div>
      )}
      <div className="imagePreview-predefined">
      {predefinedPreviewImageUrls.map((url) => (
        <div key={url}>
          <input
            type="radio"
            name="titleImage"
            id={`titleImage(${url})`}
            value={url}
            onChange={(event) => setValue(event.target.value)}
            checked={value === url}
          />
          <label htmlFor={`titleImage(${url})`}>
            <img
              src={url}
              alt="Preview Image"
            ></img>
          </label>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};
