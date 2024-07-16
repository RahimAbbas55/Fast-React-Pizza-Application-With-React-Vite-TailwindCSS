import {  useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const err = useRouteError()
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{ err.data || err.message}</p>
      <LinkButton to='-1'>
        Go back!
      </LinkButton>
    </div>
  );
}

export default Error;
