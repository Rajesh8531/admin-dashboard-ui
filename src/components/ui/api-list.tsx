import React from 'react'
import ApiAlert from './api-alert'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../helpers/connection';

interface APIlistProps {
    entityName : string;
    entityId : string;
}

const APIList:React.FC<APIlistProps> = ({entityId,entityName}) => {
    const {storeId} = useParams()

    const url = BASE_URL + `store/${storeId}/${entityName}`
  return (
    <div className='space-y-4'>
        <ApiAlert
        title='GET'
        variant='public'
        url = {url}
        />
        <ApiAlert
        title='GET'
        variant='public'
        url = {url+`/{${entityId}}`}
        />
        <ApiAlert
        title='POST'
        variant='admin'
        url = {url}
        />
        <ApiAlert
        title='PATCH'
        variant='admin'
        url = {url+`/{${entityId}}`}
        />
        <ApiAlert
        title='DELETE'
        variant='admin'
        url = {url+`/{${entityId}}`}
        />
    </div>
  )
}

export default APIList