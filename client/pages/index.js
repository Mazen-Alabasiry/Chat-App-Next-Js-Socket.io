import styles from '../styles/Home.module.css'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRouter } from "next/router"
import { useGlobalContext } from '../context'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const socket = io.connect('http://localhost:3001')

export default function Home() {
  let { setSocket, setRoomId, setName, roomId, name } = useGlobalContext();
  const router = useRouter();

  const StartRoom = (event) => {
    event.preventDefault();
    if (roomId !== '' && name !== '') {
      socket.emit('join_room', roomId)
      setSocket(socket);
      router.push('/chat')
    }
  }

  const theme = createTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <div className={`${styles.App} `} >
      <div className='container'>
        <h3> Chat App</h3>
        <form noValidate autoComplete="off" onKeyPress={(event) => {
          event.key === "Enter" && StartRoom(event);
        }} >
          <ThemeProvider theme={theme}>
            <TextField required color='primary' size='medium' id="standard-basic" variant="outlined"
              label="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />

          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField required color='primary' size='medium' id="standard-basic" variant="outlined"
              label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary"
              onClick={StartRoom}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            >
              Start Chat
            </Button>
          </ThemeProvider>
        </form>
      </div>

    </div>
  )
}
