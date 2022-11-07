import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo';

const get = (url: string, params: unknown = {}): Promise<Response> => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return fetch(`${url}${query}`);
};

/**
 * A custom UI component for the category to display count of posts and add links
 * @constructor
 */
export const SourceReferenceField: React.FC = () => {
  // access the id of a saved document from payload
  const { id } = useDocumentInfo();

  // getters and setters for component state variables
  const [isLoading, setIsLoading] = useState(true);
  const [referenceCount, setReferenceCount] = useState(null);
  const [error, setError] = useState(false);

  // useEffect adds a hook so that when the id is set the function is called
  useEffect(() => {
    if (id) {
      const queryRelations = async () => {
        const request = await get('/api/references', {
          where: {
            // the 'in' operator is used when relations can be more than one
            source: { equals: id },
            // to add more query constraints use 'or', 'and' operator objects
          },
          depth: 0,
          limit: 0,
        });
        const result = await request.json();

        if (result?.docs) {
          setReferenceCount(result?.totalDocs);
        }

        if (result.status >= 400) {
          setError(true);
        }

        setIsLoading(false);
      };

      // async functions are defined and called to avoid `await` in useEffect functions
      const ignoreResult = queryRelations();
    }
  }, [id]);


  if (!id) {
    return null;
  }

  if (error) {
    return (<span>There was a problem fetching data</span>);
  }

  return (
    <div>
      {isLoading ? (
          <p>
            loading...
          </p>
      ) : (
        <p>
            {/* collection index filters use url params to allow linking to queries */}
          <a href={`/admin/collections/references?where[or][0][and][0][source][equals]=${id}`} >
            {referenceCount}
            {' '}
            Referenzen
          </a>
        </p>
      )}

    </div>
  );
};

const baseClass = 'custom-cell';

export const SourceReferenceCell: React.FC<{ rowData: { id: string } }> = ({ rowData: { id } }) => {
  const [referenceCount, setReferenceCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const queryRelations = async () => {
        const request = await get('/api/references', {
          where: {
            source: { equals: id },
          },
          depth: 0,
          limit: 0,
        });
        const result = await request.json();

        if (result?.docs) {
          setReferenceCount(result?.totalDocs);
        }
      };

      // async functions are defined and called to avoid `await` in useEffect functions
      const _ = queryRelations();
    }
  }, [id]);

  return (
    <span>
      { referenceCount === 0 ? "Keine" : referenceCount }
    </span>
  );
};

