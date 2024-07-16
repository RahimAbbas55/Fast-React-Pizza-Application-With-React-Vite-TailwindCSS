import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateName } from '../user/userSlice'
import Button from '../../UI/Button'
function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if( !username ) return
    dispatch( updateName(username) )
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='md-4 text-sm text-stone-600 md:text-base'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-72 input mb-8'
      />

      {username !== '' && (
        <div>
          <Button type='primary'>Start Ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;