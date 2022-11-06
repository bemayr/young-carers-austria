import React, { useEffect, useState } from "react";
import { useField, useFormFields } from "payload/components/forms";

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
    setOGTitle(`Title: ${address}`);
    setOGDescription(`Description: ${address}`);
    setOGImageUrl(
      `https://www.young-carers-austria.at/assets/logo.4f0eb610.png`
    );
  }, [address]);

  return (
    <div>
      {JSON.stringify({ address })}
      {/* <input onChange={e => setValue(e.target.value)} value={value?.path} /> */}
    </div>
  );
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
  const { value, setValue } = useField<Props>({ path });
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
    <div className="field-type text">
      <label htmlFor="field-title" className="field-label">
        Titel<span className="required">*</span>
      </label>
      <input id="field-title" type="text" name="title" value="" />
      {ogImageUrl === undefined ? (
        <p>Dieser Link bietet leider kein Vorschaubild</p>
      ) : (
        <img src={ogImageUrl} alt="Preview Image"></img>
      )}
      <div>
        {predefinedPreviewImageUrls.map((url) => (
          <img src={url} alt="Preview Image" style={{ maxWidth: '300px', maxHeight: '300px' }}></img>
        ))}
      </div>
    </div>
  );
};
