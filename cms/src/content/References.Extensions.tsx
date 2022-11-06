import React, { useEffect } from 'react'
import { useField, useFormFields } from 'payload/components/forms'

export const AddressField: React.FC = () => {
  const address = useFormFields(([fields]) => fields.address.value);
  const setOpengraphData = useFormFields(([_, dispatch]) => dispatch);
  const { setValue: setOGTitle } = useField<string>({ path: "opengraph.title" })
  const { setValue: setOGDescription } = useField<string>({ path: "opengraph.description" })
  const { setValue: setOGImageUrl } = useField<string>({ path: "opengraph.imageUrl" })
  const { setValue } = useField<string>({ path: "title" })

  useEffect(() => {
    setOGTitle(`Title: ${address}`)
    setOGDescription(`Description: ${address}`)
    setOGImageUrl(`Image: ${address}`)
    // console.log({state: "changed", address})
    // setOpengraphData({ 
    //     type: 'UPDATE',
    //     path: "opengraph.title",
    //     value: address
    //  })
    //  setValue(address)
    // setOpengraphData({ 
    //     type: 'UPDATE',
    //     path: "opengraph",
    //     value: {
    //         title: "some title",
    //         desciption: "some description",
    //         image: "some img url"
    //     }
    //  })
  }, [address]);

  return <div>
    {JSON.stringify({address})}
    {/* <input onChange={e => setValue(e.target.value)} value={value?.path} /> */}
    </div>
}

type OpenGraphDefaultActionProps = { ogProperty: string, property: string, hint: string }

export const OpengraphDescription: React.FC<OpenGraphDefaultActionProps> = ({ogProperty, property, hint = ""}) => {
    const { value } = useField<string>({ path: `opengraph.${ogProperty}` })
    const { setValue } = useField<string>({ path: property })

    const useOpenGraphValue = (event: React.MouseEvent) =>{
        event.preventDefault();
        setValue(value);
    }
  
    return <div> <span>{hint}</span> <button onClick={useOpenGraphValue}>Von Link übernehmen</button> </div>
  }

