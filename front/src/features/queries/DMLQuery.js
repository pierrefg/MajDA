import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import LoadingOverlay from 'react-loading-overlay';
import toast from 'react-hot-toast';

import { useDmlQueryMutation } from '../../app/services/api';

const DMLQuery = () => {
    const [queryContent, setQueryContent] = useState('');
    const [dmlQuery, {data, isLoading, isSuccess, isError}] = useDmlQueryMutation({ fixedCacheKey: "queryResult" });

    const handleSubmit = e => {
        e.preventDefault();
        if(queryContent==='')
            toast.error('Votre requête semble vide, faites un effort !');
        else
            dmlQuery(queryContent.trim());
    } 

    useEffect(() => {       
        if (isSuccess)
            toast.success('Requête effectuée avec succès.');
        if (isError)
            toast.error('Oups ! Une erreur a eu lieu lors de l\'exécution de la requête...');

    }, [isSuccess, isError]);

    return (
        <LoadingOverlay
            active={isLoading}
            spinner
        >
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    as="textarea" 
                    className="query-textarea"
                    placeholder="SELECT * FROM..."
                    value={queryContent}
                    onChange={e => setQueryContent(e.target.value)}
                    isInvalid={isError}
                    isValid={isSuccess}
                />
                <Button variant="primary" type="submit" id="ddl-submit-button" className='submit-button' disabled={isLoading}>
                    Submit
                </Button>
            </Form>
        </LoadingOverlay>
    )
}

export default DMLQuery;